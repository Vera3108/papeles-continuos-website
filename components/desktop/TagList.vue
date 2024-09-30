<template lang="pug">
#tag-list-desktop
  .tag-list-container
    .title Por temas
    .tag-list-outter(@wheel.prevent='onTagListWheel')
      .tag-list-inner
        template(v-for='tag in tags')
          desktop-tag(:name='tag.name', :amount='tag.amount', v-show='tag.amount > 0')
  .tag-list-scrollbar-outter
  .tag-list-scrollbar-inner(@mousedown='startDragging')
</template>

<script>
export default {
  mounted() {
    document.querySelector('.tag-list-outter').scrollTop = 0
    requestAnimationFrame(this.onUpdate)
    // Agregar event listeners globales
    document.addEventListener('mousemove', this.onDrag)
    document.addEventListener('mouseup', this.stopDragging)
  },

  beforeDestroy() {
    // Remover event listeners globales
    document.removeEventListener('mousemove', this.onDrag)
    document.removeEventListener('mouseup', this.stopDragging)
  },

  computed: {
    tags() {
      let tagsInfo = this.$store.state.tags
      let books = this.$store.state.books

      let tags = []
      for (let i = 0; i < tagsInfo.length; i++) {
        let tag = {}
        tag.name = tagsInfo[i]
        tag.amount = books.filter((book) => book.tags.split('\n').includes(tag.name)).length
        tags.push(tag)
      }

      return tags
    },
  },

  data() {
    return {
      isDragging: false,
      startY: 0,
      startScrollTop: 0,
    }
  },

  methods: {
    onUpdate() {
      const scrollBarOutter = document.querySelector('.tag-list-scrollbar-outter')
      const scrollBarInner = document.querySelector('.tag-list-scrollbar-inner')
      const tagListInner = document.querySelector('.tag-list-inner')

      if (tagListInner.offsetHeight > 90) {
        scrollBarOutter.style.display = 'block'
        scrollBarInner.style.display = 'block'
        scrollBarInner.style.height = `${(90 / tagListInner.offsetHeight) * 100}%`
      } else {
        scrollBarOutter.style.display = 'none'
        scrollBarInner.style.display = 'none'
      }

      requestAnimationFrame(this.onUpdate)
    },

    startDragging(e) {
      this.isDragging = true
      this.startY = e.clientY
      this.startScrollTop = document.querySelector('.tag-list-outter').scrollTop
    },

    stopDragging() {
      this.isDragging = false
    },

    onDrag(e) {
      if (!this.isDragging) return

      const tagListOutter = document.querySelector('.tag-list-outter')
      const tagListInner = document.querySelector('.tag-list-inner')
      const scrollbarOutter = document.querySelector('.tag-list-scrollbar-outter')
      const scrollbarInner = document.querySelector('.tag-list-scrollbar-inner')

      const deltaY = e.clientY - this.startY
      const scrollbarRatio = (scrollbarOutter.offsetHeight - scrollbarInner.offsetHeight) / (tagListInner.offsetHeight - tagListOutter.offsetHeight)
      
      const newScrollTop = this.startScrollTop + (deltaY / scrollbarRatio)
      tagListOutter.scrollTop = newScrollTop

      this.updateScrollbarPosition()
    },

    updateScrollbarPosition() {
      const tagListOutter = document.querySelector('.tag-list-outter')
      const tagListInner = document.querySelector('.tag-list-inner')
      const scrollbarInner = document.querySelector('.tag-list-scrollbar-inner')
      const scrollbarOutter = document.querySelector('.tag-list-scrollbar-outter')

      const percentage = tagListOutter.scrollTop / (tagListInner.offsetHeight - tagListOutter.offsetHeight)
      const scrollBarInnerHeight = scrollbarInner.offsetHeight
      const scrollbarOutterHeight = scrollbarOutter.offsetHeight

      const maxTop = scrollbarOutterHeight - scrollBarInnerHeight
      const pos = Math.max(27, Math.min(27 + percentage * maxTop, maxTop + 27))
      scrollbarInner.style.top = pos + 'px'
    },

    onTagListWheel(e) {
      const tagListOutter = document.querySelector('.tag-list-outter')
      const tagListInner = document.querySelector('.tag-list-inner')
      const outterSize = tagListOutter.offsetHeight
      const innerSize = tagListInner.offsetHeight

      // Determinar la dirección del scroll
      const scrollDirection = e.deltaY > 0 ? 1 : -1
      
      // Scroll content con un valor fijo
      const scrollAmount = 3 * scrollDirection
      tagListOutter.scrollTop += scrollAmount

      // Asegurarse de que el scroll no exceda los límites
      tagListOutter.scrollTop = Math.max(0, Math.min(tagListOutter.scrollTop, innerSize - outterSize))

      this.updateScrollbarPosition()
    },
  },
}
</script>

<style lang="sass" scoped>
#tag-list-desktop
  position: absolute
  bottom: 80px
  left: 50px

  .tag-list-container
    max-height: 250px

    .title
      font-size: 14px
      margin-bottom: 9px

    .tag-list-outter
      width: 100%
      height: 100%
      height: 90px
      width: 300px
      overflow-y: hidden
      margin: 0
      padding: 0
      position: relative

  .tag-list-scrollbar-outter
    position: absolute
    top: 27px
    left: -30px
    width: 5px
    height: 90px
    border: 1px solid #898A7D

  .tag-list-scrollbar-inner
    position: absolute
    top: 27px
    left: -30px
    width: 5px
    height: 60px
    border: 1px solid #898A7D
    background: #FFFF84
    cursor: pointer
</style>
