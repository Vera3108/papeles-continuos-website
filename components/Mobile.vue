<template lang="pug">
#mobile
  mobile-header
  mobile-book-item-list
  .space
  mobile-tag-list
  mobile-footer
</template>

<script>
export default {
  mounted() {
    this.adjustHeight()
    window.addEventListener('resize', this.adjustHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustHeight)
  },
  methods: {
    adjustHeight() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
  },
}
</script>

<style lang="sass" scoped>
#mobile
  display: grid
  grid-template-rows: 50px 40vh auto 40vh 40px
  height: calc(var(--vh, 1vh) * 100) // Usa la variable CSS --vh para el alto
  width: 100%
  overflow: hidden
</style>
