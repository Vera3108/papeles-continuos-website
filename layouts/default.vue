<template lang="pug">
router-view
</template>

<script>
export default {}
</script>

<style lang="sass">
@font-face
  font-family: 'Aktiv Grotesk Bold'
  src: url('~assets/fonts/AktivGroteskCdTrial-Black.eot')
  src: url('~assets/fonts/AktivGroteskCdTrial-Black.eot?#iefix') format('embedded-opentype'), url('~assets/fonts/AktivGroteskCdTrial-Black.woff2') format('woff2'), url('~assets/fonts/AktivGroteskCdTrial-Black.woff') format('woff'), url('~assets/fonts/AktivGroteskCdTrial-Black.ttf') format('truetype'), url('~assets/fonts/AktivGroteskCdTrial-Black.svg#AktivGroteskCdTrial-Black') format('svg')
  font-weight: bold
  font-style: normal
  font-display: swap

@font-face
  font-family: 'Aktiv Grotesk'
  src: url('~assets/fonts/AktivGroteskCdTrial-Regular.eot')
  src: url('~assets/fonts/AktivGroteskCdTrial-Regular.eot?#iefix') format('embedded-opentype'), url('~assets/fonts/AktivGroteskCdTrial-Regular.woff2') format('woff2'), url('~assets/fonts/AktivGroteskCdTrial-Regular.woff') format('woff'), url('~assets/fonts/AktivGroteskCdTrial-Regular.ttf') format('truetype'), url('~assets/fonts/AktivGroteskCdTrial-Regular.svg#AktivGroteskCdTrial-Regular') format('svg')
  font-weight: normal
  font-style: normal
  font-display: swap

@font-face
  font-family: 'Myriad Pro'
  src: url('~assets/fonts/MyriadPro-Regular.eot')
  src: url('~assets/fonts/MyriadPro-Regular.eot?#iefix') format('embedded-opentype'), url('~assets/fonts/MyriadPro-Regular.woff2') format('woff2'), url('~assets/fonts/MyriadPro-Regular.woff') format('woff'), url('~assets/fonts/MyriadPro-Regular.ttf') format('truetype'), url('~assets/fonts/MyriadPro-Regular.svg#MyriadPro-Regular') format('svg')
  font-weight: normal
  font-style: normal
  font-display: swap

*
  box-sizing: border-box
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none

body
  margin: 0 !important
  font-family: 'Aktiv Grotesk Bold'
  background-color: #FFFEE8

body,
html
  height: 100%
  overflow: hidden

#__nuxt,
#__layout
  height: 100%
</style>
