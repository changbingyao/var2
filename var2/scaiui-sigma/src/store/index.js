import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// modules
import app from './modules/app'
import login from './modules/login'

// 暴露Store
export default new Vuex.Store({
	// 模块
  modules: {
    app,
    login
  },
  strict: process.env.NODE_ENV !== 'production'
})
