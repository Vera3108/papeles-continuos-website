<template lang="pug">
#tag-list
  .title Por temas
  .grid-container
    .scrollbar-outter(ref='scrollbarOutter')
      .scrollbar-inner(ref='scrollbarInner')
    .tag-list-container(ref='tagListContainer', @scroll="handleScroll")
      template(v-for='tag in tags')
        mobile-tag(:name='tag.name', :amount='tag.amount', v-show='tag.amount > 0')
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.adjustScrollbar()
    })
  },
  methods: {
    handleScroll() {
      this.adjustScrollbar()
    },
    adjustScrollbar() {
      let container = this.$refs.tagListContainer
      let contentHeight = container.scrollHeight
      let visibleHeight = container.clientHeight
      let scrollPercentage = container.scrollTop / (contentHeight - visibleHeight)
      let scrollbarHeight = this.$refs.scrollbarOutter.clientHeight
      let scrollbarInnerHeight = this.$refs.scrollbarInner.clientHeight - 5
      let maxScrollTop = scrollbarHeight - scrollbarInnerHeight
      this.$refs.scrollbarInner.style.top = `${maxScrollTop * scrollPercentage - 1}px`
    },
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
  display: grid
  grid-template-columns: 30px auto
  grid-template-rows: 30px 1fr

  .title
    grid-column: 1 / -1
    margin-left: 30px

  .grid-container
    grid-column: 1 / -1
    display: contents

  .scrollbar-outter
    overflow: hidden
    grid-row: 2 / 3
    position: relative
    background-color: #FFFEE8
    border: 1px solid black
    width: 10px
    margin-left: 10px

    .scrollbar-inner
      position: absolute
      left: -1px
      top: -1px
      background-color: #FFFF84
      width: 10px
      height: 50%
      border: 1px solid black

  .tag-list-container
    grid-row: 2 / 3
    overflow-y: scroll
    -ms-overflow-style: none
    scrollbar-width: none

    &::-webkit-scrollbar
      display: none
</style>
