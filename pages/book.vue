<template lang="pug">
#book
  mobile-header
  //- iframe.book(:src="book[0].url" type="application/pdf")
  //- p.book {{ "https://papelescontinuos.info" + book[0].url }}
  iframe.book(:src="'https://docs.google.com/viewer?url=https://papelescontinuos.info' + book[0].url + '&embedded=true'" frameborder="0")
  //- iframe.book(:src="'https://papelescontinuos.info' + book[0].url" frameborder="0")
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
    height: calc(100% - 50px)
</style>
