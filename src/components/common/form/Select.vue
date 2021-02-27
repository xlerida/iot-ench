<template>
  <select @change="$emit('event', $event)">
    <option v-for="item in items" :key="item"> {{ item }} </option>
  </select>
</template>

<style lang="sass" scoped>
  
</style>

<script>
export default {
  name: 'Select',
  props: ['items']
}
</script>