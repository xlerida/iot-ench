const network = {
  namespaced: true,

  state: {
    data: []
  },

  mutations: {
    setData(state, data) {
      state.data = data
    }
  },

  actions: {
    loadData({ dispatch }) {
      fetch('https://ps8.pubnub.com/v2/subscribe/sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe/pubnub-sensor-network/0?tt=16119418483411811')
      .then(response => response.json())
      .then(data => dispatch('filterData', data))
    },

    filterData({ dispatch }, data) {

      // Get all timestamps

      let timestamps = []

      data.m.forEach(d => {
        timestamps.push(d.d.timestamp)
      })

      // Remove duplicates

      timestamps = [... new Set (timestamps)]

      // Create an object for each non duplicated timestamp,
      // consisting of two arrays, temperature and humidity

      let groups = []

      timestamps.forEach(ts => {
        const tsObj = {
          [ts]: {
            temperature: [],
            humidity: []
          }
        }

        groups.push(tsObj)
      })

      // Look in the json data and entries that matches each non duplicated timestamp

      timestamps.forEach(ts => {
        data.m.forEach(d => {
          if (d.d.timestamp == ts) {
            groups.forEach(group => {
              if (Object.entries(group)[0][0] == ts) {
                Object.entries(group)[0][1].temperature.push(parseInt(d.d.ambient_temperature))
                Object.entries(group)[0][1].humidity.push(parseInt(d.d.humidity))
              }
            })
          }
        })
      })

      // Transform the timestamps into hours, minutes and seconds

      let networkData = []

      groups.forEach(group => {
        Object.entries(group).forEach(entry => {
          entry[0] = new Date(entry[0] * 1000).toString().split(' ')[4]
          networkData.push(entry)
        })
      })

      dispatch('setData', networkData)
    },

    setData(context, data) {
      let average = (array) => array.reduce((a, b) => a + b) / array.length
      
      switch (context.rootGetters['dashboard/filter']) {
        case 'Average':
          data.forEach(d => {
            d[1].temperature = average(d[1].temperature).toFixed(1)
            d[1].humidity = average(d[1].humidity).toFixed(1)
          })
          break

        case 'Max':
          data.forEach(d => {
            d[1].temperature = Math.max(...d[1].temperature)
            d[1].humidity = Math.max(...d[1].humidity)
          })
          break

        case 'Min':
          data.forEach(d => {
            d[1].temperature = Math.min(...d[1].temperature)
            d[1].humidity = Math.min(...d[1].humidity)
          })
          break

        default:
          console.log('Error, no filter choosen')
          break
      }

      context.commit('setData', data)
    }
  },

  getters: {
    filter(state) {
      return state.filter
    },

    data(state) {
      return state.data
    },
  }
}

export default network