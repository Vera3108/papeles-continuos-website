<template lang="pug">
#book-item-list-desktop
  .book-item-list-container(@wheel.prevent='onBookListWheel')
    ul.book-list-inner
      li(v-for='book in this.$store.state.books', :key='book.id')
        desktop-book-item(
          :author='book.author',
          :date='book.date',
          :id='book.id',
          :isSelected='book.id == selectedBook'
        )
  .book-item-list-scrollbar-outter
  .book-item-list-scrollbar-inner(@mousedown='startDragging')
</template>

<script>
export default {
  mounted() {
    document.querySelector('.book-item-list-container').scrollTop = 0
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
    selectedBook() {
      return this.$store.state.selectedBook
    },
  },

  data() {
    return {
      isDragging: false,
      startY: 0,
      startScrollTop: 0,
      draggedBook: null,
    }
  },

  methods: {
    onUpdate() {
      const scrollBarOutter = document.querySelector('.book-item-list-scrollbar-outter')
      const scrollBarInner = document.querySelector('.book-item-list-scrollbar-inner')
      const bookListInner = document.querySelector('.book-list-inner')

      if (bookListInner.offsetHeight > 180) {
        scrollBarOutter.style.display = 'block'
        scrollBarInner.style.display = 'block'
        scrollBarInner.style.height = `${(180 / bookListInner.offsetHeight) * 100}%`
      } else {
        scrollBarOutter.style.display = 'none'
        scrollBarInner.style.display = 'none'
      }

      requestAnimationFrame(this.onUpdate)
    },

    startDragging(e) {
      this.isDragging = true
      this.startY = e.clientY
      this.startScrollTop = document.querySelector('.book-item-list-container').scrollTop
    },

    stopDragging() {
      this.isDragging = false
    },

    onDrag(e) {
      if (!this.isDragging) return

      const bookListOutter = document.querySelector('.book-item-list-container')
      const bookListInner = document.querySelector('.book-list-inner')
      const scrollbarOutter = document.querySelector('.book-item-list-scrollbar-outter')
      const scrollbarInner = document.querySelector('.book-item-list-scrollbar-inner')

      const deltaY = e.clientY - this.startY
      const scrollbarRatio = (scrollbarOutter.offsetHeight - scrollbarInner.offsetHeight) / (bookListInner.offsetHeight - bookListOutter.offsetHeight)
      
      const newScrollTop = this.startScrollTop + (deltaY / scrollbarRatio)
      bookListOutter.scrollTop = newScrollTop

      this.updateScrollbarPosition()
    },

    updateScrollbarPosition() {
      const bookListOutter = document.querySelector('.book-item-list-container')
      const bookListInner = document.querySelector('.book-list-inner')
      const scrollbarInner = document.querySelector('.book-item-list-scrollbar-inner')
      const scrollbarOutter = document.querySelector('.book-item-list-scrollbar-outter')

      const percentage = bookListOutter.scrollTop / (bookListInner.offsetHeight - bookListOutter.offsetHeight)
      const scrollBarInnerHeight = scrollbarInner.offsetHeight
      const scrollbarOutterHeight = scrollbarOutter.offsetHeight

      const pos = 10 + percentage * (scrollbarOutterHeight - scrollBarInnerHeight)
      scrollbarInner.style.top = pos + 'px'
    },

    onBookListWheel(e) {
      const bookListOutter = document.querySelector('.book-item-list-container')
      const bookListInner = document.querySelector('.book-list-inner')
      const outterSize = bookListOutter.offsetHeight
      const innerSize = bookListInner.offsetHeight

      // Determinar la dirección del scroll
      const scrollDirection = e.deltaY > 0 ? 1 : -1
      
      // Scroll content con un valor fijo
      const scrollAmount = 3 * scrollDirection
      bookListOutter.scrollTop += scrollAmount

      // Asegurarse de que el scroll no exceda los límites
      bookListOutter.scrollTop = Math.max(0, Math.min(bookListOutter.scrollTop, innerSize - outterSize))

      this.updateScrollbarPosition()
    },

    updateScrollbarPosition() {
      const bookListOutter = document.querySelector('.book-item-list-container')
      const bookListInner = document.querySelector('.book-list-inner')
      const scrollbarInner = document.querySelector('.book-item-list-scrollbar-inner')
      const scrollbarOutter = document.querySelector('.book-item-list-scrollbar-outter')

      const percentage = bookListOutter.scrollTop / (bookListInner.offsetHeight - bookListOutter.offsetHeight)
      const scrollBarInnerHeight = scrollbarInner.offsetHeight
      const scrollbarOutterHeight = scrollbarOutter.offsetHeight

      const maxTop = scrollbarOutterHeight - scrollBarInnerHeight
      const pos = Math.max(10, Math.min(10 + percentage * maxTop, maxTop + 10))
      scrollbarInner.style.top = pos + 'px'
    },
  },
}
</script>

<style lang="sass">
#book-item-list-desktop
  position: relative

  .book-item-list-container
    width: 280px
    max-height: 180px
    overflow-y: hidden
    margin: 0
    padding: 0
    padding-left: 35px
    position: relative

    ul
      margin: 0
      padding: 0
      list-style-type: none

  .book-item-list-scrollbar-outter
    position: absolute
    top: 10px
    left: 0
    width: 5px
    height: 180px
    border: 1px solid #898A7D

  .book-item-list-scrollbar-inner
    position: absolute
    top: 10px
    left: 0
    width: 5px
    height: 80px
    border: 1px solid #898A7D
    background: #FFFF84
    cursor: pointer
</style>
