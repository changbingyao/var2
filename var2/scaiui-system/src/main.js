import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import store from './store'
import sView from 'scaiui-core/src/components/sview'
import eView from 'scaiui-core/src/components/eview'
import Cookies from 'js-cookie'
import i18n from './locale'
import './utils/index'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/index.scss'
import service from 'scaiui-core/src/service/index'
import directive from 'scaiui-core/src/directive/index'
import * as filters from 'scaiui-core/src/filters/index'
import {Message, MessageBox} from "element-ui";
import 'iview/dist/styles/iview.css';
Vue.prototype.$service = service;
Vue.prototype.$Message = Message
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$Confirm = MessageBox.confirm;
Vue.prototype._compSize = 'large';
Vue.prototype._lg = 12;
Vue.prototype._md = 12;
Vue.prototype._sm = 12;
Vue.prototype._xs = 24;
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };


Vue.prototype.$defaultPageSizes = [5, 10, 20, 30, 40]
Vue.prototype.$pageSize = 10;
Vue.prototype.$successCode="000000"

Vue.use(eView, {
  size: Cookies.get('size') || 'large',
  i18n: (key, value) => i18n.t(key, value)
})

Object.keys(directive).forEach(key => {
  Vue.directive(key, directive[key])
})

Object.keys(filters.default).forEach(key => {
  Vue.filter(key, filters.default[key])
})

// 拦截器
service.interceptors.request.use(config => {
  config.headers = Object.assign({locale: i18n.locale}, config.headers);
  return config
}, error => {
  return Promise.reject(error)
})

Vue.use(sView);

Vue.locale = () => {
};

/* eslint-disable no-new */
const ScaiuiPortal = new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
