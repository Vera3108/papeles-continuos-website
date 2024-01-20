<template lang="pug">
#mobile
  mobile-header
  mobile-book-item-list
  .space
  mobile-tag-list
  #at @vjimenezaraujo
</template>
<script>
export default {}
</script>

<style lang="sass" scoped>
#mobile
  display: grid
  grid-template-rows: 50px 40vh auto 40vh 40px
  // display: flex
  // flex-direction: column
  height: 100vh
  width: 100%
  // background-color: #FFFEE8
  overflow: hidden

  #at
    height: 30px
    padding-top: 10px
    position: absolute
    bottom: 10px
    left: 10px
</style>
