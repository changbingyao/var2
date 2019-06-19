import * as TYPES from '../types'
// import message from 'element-ui/lib/message'
// import service from '../../service/index'
import Axios from 'axios'
import Qs from 'qs'
Axios.defaults.baseURL = '/api';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const user = localStorage.getItem('user');
const permission = localStorage.getItem('permission');

const state = {
  fetching: false,
  data: {
    uid: localStorage.getItem('uid') || null,
    user: user ? JSON.parse(user) : null,
    token: localStorage.getItem('token') || '',
    permission: permission && permission !=='undefined' ? JSON.parse(permission) : []
  },
  reset_password: false
};


const mutations = {
  // 登录
  [TYPES.USER_LOGIN] (state, action) {
    state.fetching = true;
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
  },
  [TYPES.USER_LOGIN_SUCCESS] (state, action) {
    state.fetching = false;
    state.data.uid = action.data.uid;
    state.data.token = action.data.token;
    // localStorage.setItem('uid', action.data.uid);
    // localStorage.setItem('token', action.data.token);
  },
  [TYPES.USER_LOGIN_FAILURE] (state) {
    localStorage.removeItem('loginIn');
    state.fetching = false;
  },

  // 获取个人资料
  [TYPES.GET_USER_INFO] (state) {
    localStorage.setItem('loginIn', 'true');
    state.fetching = true;
  },
  [TYPES.GET_USER_INFO_SUCCESS] (state, action) {
    state.fetching = false;
    state.data.user = action;
    localStorage.setItem('user', JSON.stringify(action));
  },
  [TYPES.GET_USER_INFO_FAILURE] (state) {
    state.fetching = false;
  },

  // 获取用户权限
  [TYPES.GET_USER_PERMISSION] (state) {
    state.fetching = true;
  },
  [TYPES.GET_USER_PERMISSION_SUCCESS] (state, action) {
    state.fetching = false;
    state.data.permission = action;
    localStorage.setItem('permission', JSON.stringify(action));
  },
  [TYPES.GET_USER_PERMISSION_FAILURE] (state) {
    state.fetching = false;
  },

  // 退出
  [TYPES.USER_LOGOUT] (state) {
    this.state.app.activePages = [];
    this.state.app.alivePage = [];
    this.state.app.lang = '';
    this.state.app.preTag = '';
    this.state.app.nextTag = '';
    this.state.app.platTheme.headerBg = '';
    this.state.app.platTheme.sideBg = '';
    this.state.app.platTheme.panelBg = '';
    this.state.app.platTheme.sideColor = '';
    this.state.app.platTheme.sideActColor = '';
    this.state.app.platTheme.headerColor = '';
    this.state.app.platTheme.panelColor = '';
    state.data.uid = null;
    state.data.token = null;
    state.data.token = null;
    state.data.permission = null;
    localStorage.removeItem('uid');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('permission');
  },
};

const actions = {

  // 登录
  [TYPES.USER_LOGIN] ({commit, dispatch}, auth = {}) {
    commit(TYPES.USER_LOGIN);
    return Axios.post('/login', Qs.stringify(auth))
      .then(response => {
        commit(TYPES.USER_LOGIN_SUCCESS);
      })
      .catch(err => {
        commit(TYPES.USER_LOGIN_FAILURE, err)
      })
  }
};

export default {
  state,
  actions,
  mutations
}
