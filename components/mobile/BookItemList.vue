<template lang="pug">
ul.book-list-inner#book-item-list-mobile
  li(v-for='book in this.$store.state.books', :key='book.id')
    mobile-book-item(
      :author='book.author',
      :date='book.date',
      :id='book.id',
      :isSelected='book.id == selectedBook',
      :thumbnail='book.thumbnail'
    )
</template>

<script>
export default {
  mounted() {},

  computed: {
    selectedBook() {
      return this.$store.state.selectedBook
    },
  },
}
</script>

<style lang="sass">
ul#book-item-list-mobile
  width: 100%
  // max-height: 40vh
  overflow-y: scroll
  overflow-x: hidden
  position: relative
  margin: 0
  padding: 0
  list-style-type: none
</style>
