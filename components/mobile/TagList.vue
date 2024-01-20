<template lang="pug">
#tag-list
  .title Por temas
  .tag-list-container
    template(v-for='tag in tags')
      mobile-tag(:name='tag.name', :amount='tag.amount', v-show='tag.amount > 0')
</template>

<script>
export default {
  mounted() {
    // document.querySelector('.tag-list-outter').scrollTop = 0
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
}
</script>

<style lang="sass">
#tag-list
  position: relative
  // position: absolute
  // bottom: 0
  left: 10px
  height: 45vh
  width: 100%

  .title
    margin-bottom: 10px

  .tag-list-container
    height: 80%
    overflow: hidden
    overflow-y: scroll
    .title
      font-size: 20px
</style>
