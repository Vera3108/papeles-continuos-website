<template lang="pug">
.book-item-desktop(v-show='hasTagsSelected')
  .thumbnail(@click='onBookClick(id)')
    .img-container(:style='{ "background-image": "url(" + thumbnail + ")" }')
  .author(:class='{ "author-selected": isSelected }', @click='onBookClick(id)') {{ author }}
  .date(@click='onBookClick(id)') {{ date }}
  a.download(:href="getBook(id)", :download="getName(id)")
    img(src='~/assets/images/download.svg')
</template>
<script>
export default {
  props: ['author', 'date', 'isSelected', 'id', 'thumbnail'],

  computed: {
    hasTagsSelected() {
      if (this.$store.state.selectedTags.length == 0) {
        return true
      }

      let bookTags = this.$store.state.books.find((book) => book.id == this.id).tags.split('\n')
      for (let tag of bookTags) {
        if (this.$store.state.selectedTags.includes(tag)) {
          return true
        }
      }
      return false
    },
  },
  methods: {
    onBookClick(id) {
      this.$store.commit('setSelectedBook', id)
      this.$router.push('/book')
    },

    getBook(id) {
      return this.$store.state.books.find((book) => book.id == id).url
    },

    getName(id) {
      return this.$store.state.books.find((book) => book.id == id).author
    },
  },
}
</script>

<style lang="sass" scoped>
.book-item-desktop
  width: 100%
  height: 90px
  display: grid
  grid-template-rows: 1fr 1fr
  grid-template-columns: 70px 1fr 70px
  gap: 0
  font-size: 1.4rem
  border-bottom: 1px solid rgba(0, 0, 0, 0.2)

  .thumbnail
    grid-row-start: 1
    grid-column-start: 1
    grid-row-end: 3
    grid-column-end: 1
    padding: 10px

    .img-container
      width: 100%
      height: 100%
      background-size: cover
      background-repeat: no-repeat
      background-position: center
  .author
    color: black
    padding-top: 10px
    grid-row-start: 1
    grid-column-start: 2
    grid-row-end: 2
    grid-column-end: 3

  .date
    font-family: 'Aktiv Grotesk'
    color: black
    grid-row-start: 2
    grid-column-start: 2
    grid-row-end: 3
    grid-column-end: 3

  .download
    grid-row-start: 1
    grid-column-start: 3
    grid-row-end: 3
    grid-column-end: 3

    img
      width: 100%
      height: 100%
</style>
