<template>
  <h1> {{ text }} </h1>
</template>

<style lang="sass" scoped>
h1
  color: rgba(0, 0, 0, .7)
</style>

<script>
export default {
  name: 'Title',

  props: ['text']
}
</script>