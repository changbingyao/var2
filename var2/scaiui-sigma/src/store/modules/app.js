/*
*
* 全局
*
*/
import '../../utils/index'
import * as TYPES from '../types'
// import message from 'element-ui/lib/message'

const state = {
  lang: 'zh-CN',
  preTag: '',
  nextTag: '',
  activePages: [],
  alivePage: [],
  platTheme: {
    headerBg: '#20252c',
    sideBg: '#20252c',
    panelBg: '#fff',
    sideColor: '#fff',
    sideActColor: 'yellow',
    headerColor: 'yellow',
    panelColor: '#000'
  }
};

const getters = {};

const mutations = {
  [TYPES.CHANGE_LANGUEGE](state, action) {
    state.lang = action
  },
  [TYPES.ADD_ACTIVEPAGE](state, action) {
    state.activePages.uniqObject(action);
    state.alivePage.uniqItem(action.name);
  },
  [TYPES.REMOVE_ACTIVEPAGE](state, action) {
    state.activePages.splice(Number(action), 1);
    state.alivePage.splice(Number(action), 1)
  },
  [TYPES.DELETE_CURRENT_ACTIVEPAGE](state, action) {
    if (state.activePages.length != 0) {
      var index = '';
      for(var i=0; i < state.activePages.length; i++) {
        if (state.activePages[i].name == action) {
          if (i - 1 != -1) {
            state.preTag = state.activePages[i-1].name;
          } else {
            state.preTag = '';
          }
          if (i + 1 < state.activePages.length) {
            state.nextTag = state.activePages[i+1].name;
          } else {
            state.nextTag = '';
          }
          index = i;
        }
      }
    }
    state.activePages.splice(index, 1);
    state.alivePage.splice(state.alivePage.indexOf(action), 1);
  },
  [TYPES.DELETE_OTHERS_ACTIVEPAGE](state, action) {
    state.activePages = [];
    state.alivePage = [];
    state.activePages.push(action);
    state.alivePage.push(action.name);
  },
  [TYPES.NEW_THEME_APPLY](state, action) {
    state.platTheme = action;
  },
};

const actions = {};

export default {
  state,
  getters,
  actions,
  mutations
}
