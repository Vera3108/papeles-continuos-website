<template lang="pug">
.tag
  .content
    .name(@click='onTagClick()', :class='{ selected: isSelected }') {{ name.charAt(0).toUpperCase() + name.slice(1) }}
    .amount ({{ amount }})
</template>

<script>
export default {
  props: ['name', 'amount'],

  computed: {
    isSelected() {
      return this.$store.state.selectedTags.includes(this.name)
    },
  },

  methods: {
    onTagClick() {
      if (this.$store.state.selectedTags.includes(this.name)) {
        let index = this.$store.state.selectedTags.indexOf(this.name)
        this.$store.commit('removeTag', index)
      } else {
        this.$store.commit('addTag', this.name)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.tag
  font-size: 20px
  display: flex
  justify-content: space-between
  align-items: center
  width: 80%
  max-width: 250px
  margin-right: 60px
  margin-bottom: 5px

  .content
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%

  .name, .amount
    display: inline-flex
    align-items: center

  .name
    background: #FFFF84
    border: 1px solid #898A7D
    padding: 2px 4px
    cursor: pointer
    transition: all 0.15s ease-in-out

  .selected
    background: #b7abff
    transition: all 0.15s ease-in-out

  .amount
    display: inline-block
    float: right
</style>
