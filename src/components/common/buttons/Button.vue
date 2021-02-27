<template>
  <button @click="$emit('event')"> 
    <font-awesome-icon :icon="icon" />
  </button>
</template>

<style lang="sass" scoped>
button
  padding: 1em
  display: flex
  align-items: center
  justify-content: center
  background: rgba(0, 0, 0, 0.1)
  border: 0
  border-radius: .3em
  cursor: pointer

  &:hover
    background: rgba(0, 0, 0, 0.2)

  &:last-child
    margin-left: 1em

  svg
    font-size: 1.5em
    color: rgba(0, 0, 0, .75)
</style>

<script>
export default {
  name: 'Button',
  
  props: ['icon']
}
</script>