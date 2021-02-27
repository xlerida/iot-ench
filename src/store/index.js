import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import network from './modules/network'
import dashboard from './modules/dashboard'

export default new Vuex.Store({
  modules: {
    network,
    dashboard
  }
})
