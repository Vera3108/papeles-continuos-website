<template lang="pug">
#desktop
  #header
    .inner Papeles Continuos
  #container
    #menu
      desktop-book-item-list
    #content
      desktop-book-list
      desktop-tag-list
  
  #at @vjimenezaraujo
  #download(@click='onDownloadClick()')
  #undo(@click='onUndoClick()')
</template>

<script>
export default {
  methods: {
    onDownloadClick() {
      this.$nuxt.$emit('download')
    },

    onUndoClick() {
      this.$nuxt.$emit('undo')
    },
  },
}
</script>

<style lang="sass">
#desktop
  width: 100%
  height: 100%

  #header
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 35px
    border-bottom: 1px solid #ccc
    background-color: white

    .inner
      width: 100%
      color: black
      padding-left: 25px

  #container
    width: 100%
    height: calc(100% - 35px)
    position: relative
    display: flex
    flex-direction: row

    #menu
      height: 100%
      position: relative
      padding-top: 35px
      padding-left: 20px
      flex: 0 0 350px

    #content
      width: 100%
      height: 100%
      padding: 40px 100px 65px 0

  #at
    position: absolute
    left: 50px
    bottom: 30px
    font-size: 14px
    color: black

  #veil
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #FFFEE8
    mix-blend-mode: multiply
    z-index: 1
    pointer-events: none

  #download
    position: absolute
    right: 35px
    bottom: 59px
    width: 50px
    height: 50px
    z-index: 2
    background-image: url(../assets/images/download.svg)
    background-repeat: no-repeat
    background-position: center
    background-size: contain
    cursor: pointer

  #undo
    position: absolute
    right: 38px
    bottom: 112px
    width: 42px
    height: 40px
    z-index: 2
    background-image: url(../assets/images/undo.svg)
    background-repeat: no-repeat
    background-position: center
    background-size: contain
    cursor: pointer
</style>
