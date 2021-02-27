const dashboard = {
  namespaced: true,
  
  state: {
    chart: {
      view: 'Chart',
      filter: 'Average',
      filters: ['Average', 'Max', 'Min']
    }
  },

  mutations: {
    filter(state, filter) {
      state.chart.filter = filter
    },

    view(state, view) {
      state.chart.view = view
    }
  },

  getters: {
    view(state) {
      return state.chart.view
    },

    filter(state) {
      return state.chart.filter
    },
    
    filters(state) {
      return state.chart.filters
    }
  }
}

export default dashboard