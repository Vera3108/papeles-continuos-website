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
  .book-item-list-scrollbar-inner
</template>

<script>
export default {
  mounted() {
    document.querySelector('.book-item-list-container').scrollTop = 0
    requestAnimationFrame(this.onUpdate)
  },

  computed: {
    selectedBook() {
      return this.$store.state.selectedBook
    },
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

    onBookListWheel(e) {
      let bookListOutter = document.querySelector('.book-item-list-container')
      let bookListInner = document.querySelector('.book-list-inner')
      let outterSize = bookListOutter.offsetHeight
      let innerSize = bookListInner.offsetHeight

      // scroll content
      bookListOutter.scrollTop += e.deltaY / 10

      // update scrollbar
      let percentage = bookListOutter.scrollTop / (innerSize - outterSize)
      let scrollbarInner = document.querySelector('.book-item-list-scrollbar-inner')
      let scrollbarOutter = document.querySelector('.book-item-list-scrollbar-outter')
      let scrollBarInnerHeight = scrollbarInner.offsetHeight
      let scrollbarOutterHeight = scrollbarOutter.offsetHeight

      let pos = 10 + percentage * (scrollbarOutterHeight - scrollBarInnerHeight)
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
</style>
