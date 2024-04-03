<template lang="pug">
#tag-list-desktop
  .tag-list-container
    .title Por temas
    .tag-list-outter(@wheel.prevent='onTagListWheel')
      .tag-list-inner
        template(v-for='tag in tags')
          desktop-tag(:name='tag.name', :amount='tag.amount', v-show='tag.amount > 0')
  .tag-list-scrollbar-outter
  .tag-list-scrollbar-inner
</template>

<script>
export default {
  mounted() {
    document.querySelector('.tag-list-outter').scrollTop = 0
    requestAnimationFrame(this.onUpdate)
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

  methods: {
    onUpdate() {
      const scrollBarOutter = document.querySelector('.tag-list-scrollbar-outter')

      const scrollBarInner = document.querySelector('.tag-list-scrollbar-inner')

      const tagListInner = document.querySelector('.tag-list-inner')

      if (tagListInner.offsetHeight > 90) {
        scrollBarOutter.style.display = 'block'
        scrollBarInner.style.display = 'block'
        scrollBarInner.style.height = `${(90 / tagListInner.offsetHeight) * 100}%`
      } else {
        scrollBarOutter.style.display = 'none'
        scrollBarInner.style.display = 'none'
      }

      requestAnimationFrame(this.onUpdate)
    },

    onTagListWheel(e) {
      let tagListOutter = document.querySelector('.tag-list-outter')
      let tagListInner = document.querySelector('.tag-list-inner')
      let outterSize = tagListOutter.offsetHeight
      let innerSize = tagListInner.offsetHeight

      // scroll content
      tagListOutter.scrollTop += e.deltaY / 10

      // update scrollbar
      let percentage = tagListOutter.scrollTop / (innerSize - outterSize)
      let scrollbarInner = document.querySelector('.tag-list-scrollbar-inner')
      let scrollbarOutter = document.querySelector('.tag-list-scrollbar-outter')
      let scrollBarInnerHeight = scrollbarInner.offsetHeight
      let scrollbarOutterHeight = scrollbarOutter.offsetHeight

      let pos = 27 + percentage * (scrollbarOutterHeight - scrollBarInnerHeight)
      scrollbarInner.style.top = pos + 'px'
    },
  },
}
</script>

<style lang="sass" scoped>
#tag-list-desktop
  position: absolute
  bottom: 80px
  left: 50px

  .tag-list-container
    max-height: 250px

    .title
      font-size: 14px
      margin-bottom: 9px

    .tag-list-outter
      width: 100%
      height: 100%
      height: 90px
      width: 300px
      overflow-y: hidden
      margin: 0
      padding: 0
      position: relative

  .tag-list-scrollbar-outter
    position: absolute
    top: 27px
    left: -30px
    width: 5px
    height: 90px
    border: 1px solid #898A7D

  .tag-list-scrollbar-inner
    position: absolute
    top: 27px
    left: -30px
    width: 5px
    height: 60px
    border: 1px solid #898A7D
    background: #FFFF84
</style>
