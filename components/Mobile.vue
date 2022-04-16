<template lang="pug">
#mobile
  template(v-for='i in 55')
    img(:src='"~/static/images/mobile/" + i + ".jpg"')
  .title
    div Papeles Continuos
  .link
    p No hay nada que ver aquí <br> mejor ve a tu laptop
    a(href="") @v.jimenezaraujo
</template>
<script>

export default {
  mounted() {
    // set random widths for each image
    let images = document.querySelectorAll('#mobile img')
    for (let i = 0; i < images.length; i++) {
      images[i].style.width = Math.floor(40 + Math.random() * 60) + '%'
    }
  },  
}
</script>

<style lang="sass" scoped>
#mobile
  width: 100%
  height: 100%
  background-color: #FFFEE8
  overflow: scroll
  position: relative

  img
    max-width: 80%
    display: block
    margin: 0 auto

  .title
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    text-align: center
    font-size: 8vw
    pointer-events: none

  .link
    position: absolute
    bottom: 7vw
    left: 50%
    transform: translateX(-50%)
    font-size: 3.9vw
    text-align: center
    pointer-events: none

    p
      margin: 0

    a
      pointer-events: auto
      color: #000
</style>