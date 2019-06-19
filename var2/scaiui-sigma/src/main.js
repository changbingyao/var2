import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './locale'
import store from './store'
import Cookies from 'js-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css';
import './assets/scss/index.scss'
import './assets/iconfont/iconfont.css'
import service from "./service"
import directive from './directive/index'
import * as filters from './filters/index'
import sView from './components/sview'
// import eView from './components/eview'
import tableUtil from './utils/table'

Vue.use(ElementUI);
Vue.use(sView);

Vue.config.productionTip = false;

Vue.prototype.$service = service;
Vue.prototype._compSize = 'large';
Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
Vue.prototype.$defaultPageSizes = [5, 10, 20, 30, 40];
Vue.prototype.$pageSize = 10;
Vue.prototype.$TableUtil = tableUtil;
Vue.prototype._lg = 6;
Vue.prototype._md = 8;
Vue.prototype._sm = 12;
Vue.prototype._xs = 24;
Vue.prototype._lg = 12;
Vue.prototype._md = 12;
Vue.prototype._sm = 12;
Vue.prototype._xs = 24;

// 判断是否为空
Vue.prototype.isEmpty = function(val) {
  if (val == '' || val == null || val == undefined) {
    return true;
  } else {
    return false;
  }
};

// Vue.use(eView, {
//   size: Cookies.get('size') || 'large',
//   i18n: (key, value) => i18n.t(key, value)
// });

Object.keys(directive).forEach(key => {
  Vue.directive(key, directive[key])
});

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Object.keys(filters.default).forEach(key => {
  Vue.filter(key, filters.default[key])
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({name: from.name}) : next('/');
  } else {
    const needAuth = to.matched.some(m => !m.meta.notNeedAuth);
    const isLogin = localStorage.getItem('loginIn');
    if (!needAuth || (needAuth && isLogin)) {
      next();
      return false;
    }
    next({path: '/login'});
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
});
