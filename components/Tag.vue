<template lang="pug">
.tag
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

<style lang="sass">
.tag
  font-size: 14px
  display: inline-block
  width: 120px
  margin-right: 20px
  margin-bottom: 5px

  .name
    display: inline-block
    background: #FFFF84
    border: 1px solid #898A7D
    padding: 2px 4px
    cursor: pointer

  .selected
    background: #ccd6ed

  .amount
    display: inline-block
    float: right
</style>