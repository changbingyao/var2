import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
import Views from '~views/system'
import systemRouter from './system'

export default new Router({
  mode: 'history',
  routes: [
    {
      // path: '/home/:username',
    path: '/',
    name: 'login',
    component: Views.Login,
  },{
    path: '/system',
    name: 'system',
    component: Views.Home,
    props: true,
    redirect: '/system/user',
    children: systemRouter
  }]
})
