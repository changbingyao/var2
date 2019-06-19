import Views from '../views/system'

const systemRouter = [{
  path: '/system/userRole',
  name: 'system.userRole',
  component: Views.UserRole,
  meta: {
    name: '用户角色'
  }
}, {
  path: '/system/authorize',
  name: 'system.authorize',
  component: Views.Authorize,
  meta: {
    name: '授权管理'
  }
}, {
  path: '/system/dictionary',
  name: 'system.dictionary',
  component: Views.Dictionary,
  meta: {
    name: '字典管理'
  }
}, {
  path: '/system/org',
  name: 'system.org',
  component: Views.Org,
  meta: {
    name: 'ins'
  }
}, {
  path: '/system/menu',
  name: 'system.menu',
  component: Views.Menu,
  meta: {
    name: 'menu'
  }
}, {
  path: '/system/user',
  name: 'system.user',
  component: Views.User,
  meta: {
    name: 'user',
  }
}, {
  path: '/system/role',
  name: 'system.role',
  component: Views.Role,
  meta: {
    name: 'role'
  }
}, {
  path: '/system/log',
  name: 'system.log',
  component: Views.Log,
  meta: {
    name: '操作日志'
  }
}];

export default systemRouter
