<script>
import { Line } from 'vue-chartjs'

let chartData = {
  labels: [],

  width: '720px',

  datasets: [
    {
      label: 'Temperature',
      backgroundColor: 'rgba(255, 128, 212, .5)',
      borderColor: 'rgba(255, 128, 212, 1)',
      borderWidth: '0',
      data: []
    },
    {
      label: 'Humidity',
      backgroundColor: 'rgba(128, 172, 255, .5)',
      borderColor: 'rgba(128, 172, 255, 1)',
      borderWidth: '0',
      data: []
    },
  ]
}

export default {
  name: 'Chart',

  extends: Line,

  props: ['width', 'height'],

  mounted() {
    this.$store.dispatch('network/loadData')
  },

  methods: {
    filterData(data) {

      chartData.labels = []
      chartData.datasets[0].data = []
      chartData.datasets[1].data = []

      data.forEach(d => {
        chartData.labels.push(d[0])
        chartData.datasets[0].data.push(d[1].temperature)
        chartData.datasets[1].data.push(d[1].humidity)
      })

      this.renderChart(chartData)
    }
  },

  computed: {
    data() {
      return this.$store.getters['network/data']
    }
  },

  watch: {
    data(data) {
      this.filterData(data)
    }
  },
}
</script>