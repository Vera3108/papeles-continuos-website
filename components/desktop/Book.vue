<template lang="pug">
.book-desktop(:id='"book-" + book.id')
  .container(:id='"page-container-" + book.id')
</template>

<script>
import p5 from 'p5'
import { Point, Line } from '../../static/lib/geometry'
import pdfjsLib from 'pdfjs-dist/build/pdf'
import { PDFDocument } from 'pdf-lib'
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

export default {
  props: ['book'],

  data() {
    return {
      pdf: null,
      lines: [],
      pageOrder: [],
    }
  },

  async mounted() {
    await this.getPdf()
    this.createCanvases()

    this.$nuxt.$on('download', async () => {
      if (this.book.id == this.$store.state.selectedBook) {
        await this.download()
      }
    })

    this.$nuxt.$on('undo', async () => {
      if (this.book.id == this.$store.state.selectedBook) {
        this.undo()
      }
    })
  },

  methods: {
    undo() {
      if (this.book.id == this.$store.state.selectedBook && this.pageOrder.length > 0) {
        let pageIndex = this.pageOrder.pop()
        this.lines[pageIndex].pop()
      }
    },

    async download() {
      const existingPdfBytes = await fetch(this.book.url).then((res) => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(existingPdfBytes)

      for (let i = 0; i < pdfDoc.getPages().length; i++) {
        const page = pdfDoc.getPages()[i]
        const { width, height } = page.getSize()
        this.lines[i].forEach((line) => {
          line.points.forEach((p1, index) => {
            if (index < line.points.length - 1) {
              let p2 = line.points[index + 1]
              let c = this.hexToRgb(line.color)
              this.drawLine(page, p1, p2, width, height, c)
            }
          })
        })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'download.pdf'
      link.click()
    },

    drawLine(page, p1, p2, width, height, color) {
      // Ajuste de coordenadas considerando la rotación de la página en el PDF.
      // En pantalla (pdf.js + p5) se ve con la rotación aplicada y origen arriba-izquierda,
      // pero al dibujar con pdf-lib el origen es abajo-izquierda y la rotación de página
      // no se aplica a las coordenadas de dibujo, por lo que debemos compensarla.

      // Rotación efectiva de la página (múltiplos de 90)
      // Normalizamos rotación a 0,90,180,270 en rango [0,360)
      const angle = page.getRotation().angle || 0
      const rotation = ((angle % 360) + 360) % 360

      // Usar CropBox para coincidir con lo que renderiza pdf.js (puede diferir del MediaBox)
      const crop = page.getCropBox ? page.getCropBox() : { x: 0, y: 0, width, height }

      // Tamaño del contenido sin rotación (CropBox)
      const unrotatedW = crop.width
      const unrotatedH = crop.height

      // Tamaño visible con rotación aplicada
      const visibleW = rotation === 90 || rotation === 270 ? unrotatedH : unrotatedW
      const visibleH = rotation === 90 || rotation === 270 ? unrotatedW : unrotatedH

      // Coordenadas en el sistema rotado (origen abajo-izquierda del render rotado)
      const xr1 = p1[0] * visibleW
      const yr1 = visibleH - p1[1] * visibleH
      const xr2 = p2[0] * visibleW
      const yr2 = visibleH - p2[1] * visibleH

      // Transformar a sistema no rotado (origen abajo-izquierda sin rotación)
      const toUnrotated = (xr, yr) => {
        switch (rotation) {
          case 90:
            // Fórmula que mantuvo la rotación correcta anteriormente
            return { x: unrotatedW - yr, y: xr }
          case 180:
            return { x: unrotatedW - xr, y: unrotatedH - yr }
          case 270:
            return { x: yr, y: unrotatedH - xr }
          default:
            return { x: xr, y: yr }
        }
      }

      // Sumar offset del CropBox para posicionar en coords de página
      const p1uRel = toUnrotated(xr1, yr1)
      const p2uRel = toUnrotated(xr2, yr2)
      const p1u = { x: p1uRel.x + crop.x, y: p1uRel.y + crop.y }
      const p2u = { x: p2uRel.x + crop.x, y: p2uRel.y + crop.y }

      page.drawLine({
        start: p1u,
        end: p2u,
        color: color,
      })
    },

    hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            type: 'RGB',
            red: parseInt(result[1], 16) / 255,
            green: parseInt(result[2], 16) / 255,
            blue: parseInt(result[3], 16) / 255,
          }
        : null
    },

    createCanvases() {
      for (let i = 0; i < this.pdf.numPages; i++) {
        new p5((p) => {
          this.lines[i] = []
          let colors = ['#ff72b2', '#ff7200', '#2c72b2', '#ff0000']
          let currentLine = new Line(colors[0])
          let currentColor = 0
          let isDrawing = false

          p.setup = () => {
            let parent = document.querySelector('#page-container-' + this.book.id + '-' + i)
            let w = parent.getBoundingClientRect().width
            let h = parent.getBoundingClientRect().height
            p.createCanvas(w, h).parent(parent)
          }

          p.draw = () => {
            let book = document.querySelector('#book-' + this.book.id)
            if (book.style.display == 'none') return

            let page = document.querySelector('#page-container-' + this.book.id + '-' + i)
            if (p.isElementOutViewport(page)) return

            p.resize()

            if (isDrawing) {
              currentLine.addPoint(new Point(p.mouseX / p.width, p.mouseY / p.height))
            }

            currentLine.draw(p)
            this.lines[i].forEach((line) => line.draw(p))
          }

          p.startLine = () => {
            isDrawing = true
          }
          p.endLine = () => {
            if (currentLine.points.length > 0) {
              this.lines[i].push(currentLine)
              this.pageOrder.push(i)
              currentColor = (currentColor + 1) % colors.length
              currentLine = new Line(colors[currentColor])
              isDrawing = false
            }
          }

          let pageContainer = document.querySelector('#page-container-' + this.book.id + '-' + i)

          pageContainer.addEventListener('mousedown', (e) => {
            if (e.button == 0) p.startLine()
          })
          pageContainer.addEventListener('mouseup', (e) => {
            if (e.button == 0) p.endLine()
          })
          pageContainer.addEventListener('mouseout', () => {
            if (isDrawing) p.endLine()
          })

          p.isElementOutViewport = (el) => {
            var rect = el.getBoundingClientRect()
            return rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight
          }

          p.resize = () => {
            let parent = document.querySelector('#page-container-' + this.book.id + '-' + i)
            let w = parent.getBoundingClientRect().width
            let h = parent.getBoundingClientRect().height
            p.resizeCanvas(w, h, false)
          }
        })
      }
    },

    async getPdf() {
      this.pdf = await pdfjsLib.getDocument(this.book.url).promise
      let numPages = this.pdf.numPages
      for (let i = 1; i <= numPages; i++) {
        await this.renderPage(i)
      }
    },

    async renderPage(pageNumber) {
      let container = document.createElement('div')
      container.id = 'page-container-' + this.book.id + '-' + (pageNumber - 1)
      container.className = 'page-container'

      let canvasPdf = document.createElement('canvas')
      canvasPdf.id = `page-${this.book.id}-${pageNumber - 1}`
      canvasPdf.classList.add('page')
      container.appendChild(canvasPdf)

      document.querySelector('#page-container-' + this.book.id).appendChild(container)

      this.page = await this.pdf.getPage(pageNumber)
      let scale = this.page.getViewport(1).width / canvasPdf.width
      const viewport = this.page.getViewport(scale)
      const context = canvasPdf.getContext('2d')
      canvasPdf.height = viewport.height
      canvasPdf.width = viewport.width
      const renderContext = { canvasContext: context, viewport: viewport }
      await this.page.render(renderContext)
    },
  },
}
</script>

<style lang="sass">
.book-desktop
  display: block
  .container
    overflow: auto
    position: relative
    display: block

  .page-container
    margin: 20px 0
    position: relative

    &:first-child
      margin-top: 0

    &:last-child
      margin-bottom: 0

    .page
      width: 100%
      // border: 1px solid rgba(0, 0, 0, 0.05)

    .p5Canvas
      width: 100%
      height: 100%
      position: absolute
      top: 0
      left: 0

    canvas
      box-sizing: border-box
      border: none
      display: block
</style>
