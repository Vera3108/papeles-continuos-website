<template lang="pug">
#book-list
  template(v-for='book in books')
    book(:book='book', v-show='book.id == selectedBook')
</template>

<script>
export default {
  computed: {
    books() {
      return this.$store.state.books
    },

    selectedBook() {
      return this.$store.state.selectedBook
    },
  },
}
</script>

<style lang="sass">
#book-list
  margin: auto
  width: 100%
  height: 100%
  overflow: scroll
  position: relative
</style>