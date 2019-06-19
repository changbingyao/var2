import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// modules
import app from './modules/app'

// 暴露Store
export default new Vuex.Store({
	// 模块
  modules: {
    app
  },
  strict: process.env.NODE_ENV !== 'production'
})
