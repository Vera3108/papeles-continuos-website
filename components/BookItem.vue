<template lang="pug">
.item(@click='onBookClick(id)', v-show='hasTagsSelected')
  .bullet
    img(src='~/assets/images/bullet.svg')
  .info
    .author(:class='{ "author-selected": isSelected }') {{ author }}
    .date {{ date }}
</template>
<script>
export default {
  props: ['author', 'date', 'isSelected', 'id'],

  computed: {
    hasTagsSelected() {
      let bookTags = this.$store.state.books.find(
        (book) => book.id == this.id
      ).tags.split('\n')

      if (this.$store.state.selectedTags.length == 0) {
        return true
      }

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
      document.querySelector('#book-list').scrollTop = 0
    },
  },
}
</script>

<style lang="sass" scoped>
.item
  display: flex
  padding-bottom: 12px

  .bullet
    width: 20px

    img
      width: 100%

  .info
    margin-left: 8px
    cursor: pointer

    .author
      font-weight: bold
      color: black
      transition: all 0.15s ease-in-out

    .author-selected
      color: #FFFF84
      transition: all 0.15s ease-in-out
      text-shadow: 0px 1px 0 #5B5B46, 0px -1px 0 #5B5B46, 1px 0px 0 #5B5B46, -1px 0px 0 #5B5B46, -1px 1px 0 #5B5B46, 1px 1px 0 #5B5B46, -1px -1px 0 #5B5B46, 1px -1px 0 #5B5B46

    .date
      font-family: 'Aktiv Grotesk'
      color: black
</style>
