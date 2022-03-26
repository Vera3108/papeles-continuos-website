<template lang="pug">
#mobile
  template(v-for='i in 55')
    img(:src='"~/static/images/mobile/" + i + ".jpg"')
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

  img
    max-width: 80%
    display: block
    margin: 0 auto
</style>