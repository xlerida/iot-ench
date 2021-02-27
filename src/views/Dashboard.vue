<template>
  <div class="dashboard">
    <Title text="Dashboard" />

    <div>
      <Button icon="chart-area" @event="handleView('Chart')" />
      <Button icon="list" @event="handleView('List')" />
    </div>

    <div>
      <Select @event="handleFilter" :items="this.$store.getters['dashboard/filters']" />
    </div>

    <div v-if="$store.getters['dashboard/view'] == 'Chart'">
      <Chart width='720px' height='320px' />
    </div>
    
    <div v-if="$store.getters['dashboard/view'] == 'List'">
      <List />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.dashboard
  height: 100vh
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

  > div
    margin-top: 1em
    margin-bottom: .5em
    display: flex
    justify-content: flex-start

  div
    width: 100%
    max-width: 720px
</style>

<script>
import Title from '@/components/common/text/Title.vue'
import Button from '@/components/common/buttons/Button.vue'
import Select from '@/components/common/form/Select.vue'
import Chart from '@/components/views/dashboard/Chart.vue'
import List from '@/components/views/dashboard/List.vue'

export default {
  name: 'Dashboard',

  components: {
    Title,
    Button,
    Select,
    Chart,
    List
  },

  methods: {
    handleFilter(event) {
      this.$store.commit('dashboard/filter', event.target.value)
      this.$store.dispatch('network/loadData')
    },

    handleView(view) {
      this.$store.commit('dashboard/view', view)
      this.$store.dispatch('network/loadData')
    }
  }
}
</script>
