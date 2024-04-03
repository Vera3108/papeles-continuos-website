<template lang="pug">
#header
  .inner
    p Papeles Continuos
    p.right(@click="gotoHome") ✌
</template>

<script>
export default {
  methods: {
    gotoHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="sass" scoped>
#header
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 50px
  border-bottom: 1px solid #ccc
  background-color: white
  font-size: 22px

  .inner
    width: 100%
    color: black
    padding-left: 25px
    position: relative
    width: 100%

    .right
      position: absolute
      top: 0
      right: 0
      padding-right: 25px
</style>
