<template lang="pug">
#book
  mobile-header
  embed.book(:src="book[0].url")
</template>

<script>
export default {
  computed: {
    book() {
      return this.$store.state.books.filter((book) => {
        return book.id == this.$store.state.selectedBook
      })
    },
  },

  data() {
    return {}
  },
}
</script>

<style lang="sass">
#book
  width: 100%
  height: 100%

  .book
    width: 100%
    height: calc(100vh - 50px)
</style>
