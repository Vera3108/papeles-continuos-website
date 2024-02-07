<template lang="pug">
#mobile
  mobile-header
  mobile-book-item-list
  .space
  mobile-tag-list
  mobile-footer
</template>
<script>
export default {}
</script>

<style lang="sass" scoped>
#mobile
  display: grid
  grid-template-rows: 50px 40vh auto 40vh 40px
  height: 100vh
  width: 100%
  overflow: hidden
</style>
