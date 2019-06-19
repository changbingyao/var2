import Vue from 'vue'
import Router from 'vue-router'
import TestCustomise from '@/views/test/TestCustomise'

import View from '@/views'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: View.Home,
      redirect: "/drag",
      children: [{
        path: '/drag',
        name: 'main.drag',
        component: View.DragBlock
      },{
        path: '/join',
        name: 'main.join',
        component: View.DragJoin
      },{
        path: '/tree',
        name: 'main.tree',
        component: View.DragTree
      },{
        path: '/size',
        name: 'main.dragSize',
        component: View.DragSize
      },{
        path: '/select',
        name: 'main.select',
        component: View.Select
      },{
        path: '/i18n',
        name: 'main.i18n',
        component: View.I18n
      },{
        path: '/folder',
        name: 'main.folder',
        component: View.Folder
      }]
    }
  ]
})
