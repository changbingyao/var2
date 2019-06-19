import Vue from 'vue'
import App from './App'
import router from './router'
import eView from './components/eview'
import { Message,MessageBox,Tooltip,Loading} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'assets/scss/index.scss'
import 'babel-polyfill'
import * as filters from './filters'
// import i18n from './locale'
import sView from './components/sview'
import Axios from "axios"
import qs from "qs"
import service from './service/index'
import Cookies from 'js-cookie'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.prototype.$service = service
Vue.prototype._compSize = 'large'
Vue.prototype._lg = 6
Vue.prototype._md = 8
Vue.prototype._sm = 12
Vue.prototype._xs = 24

Vue.use(eView, {
  size: Cookies.get('size') || 'large', // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
})

Vue.use(sView,{
  size: Cookies.get('size') || 'large', // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
})

Vue.locale = () => {
};

Vue.prototype.$Message = Message
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$Tooltip = Tooltip;
Vue.prototype.$Loading = Loading

Vue.prototype.$axios = Axios
Vue.config.productionTip = false
Axios.defaults.baseURL = '/api';

// 添加请求拦截器
Axios.interceptors.request.use(function(config) {
  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

/* eslint-disable no-new */
const ScaiCore = new Vue({
  el: '#app',
  router,
 // store: store,
 //  i18n,
  components: {App},
  template: '<App/>'
});

