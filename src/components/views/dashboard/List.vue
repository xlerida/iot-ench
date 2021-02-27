<template>
<div>
  <ul>
    <li>
      <h2>Hour</h2>
      <h2>Temperature</h2>
      <h2>Humidity</h2>
    </li>
  </ul>
  <ul>
    <li v-for="item in $store.getters['network/data']" :key="item.item">
      <p> {{ item[0] }} </p>
      <p> {{ item[1].temperature }} </p>
      <p> {{ item[1].humidity }} </p>
    </li>
  </ul>
</div>
</template>

<style lang="sass" scoped>
ul, li
  width: 100%

li
  display: flex
  justify-content: space-between
</style>

<script>
export default {
  name: 'List',

  computed: {
    data() {
      return this.$store.getters['network/data']
    }
  },

  watch: {
    data() {
      this.data.data = this.$store.getters['network/data']
    }
  }
}
</script>