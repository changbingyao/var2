/*
*
* 全局
*
*/
import * as TYPES from '../types'
import message from 'element-ui/lib/message'

const state = {
  lang: 'zh',
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

const getters = {}

const mutations = {
  [TYPES.CHANGE_LANGUEGE](state, action) {
    state.lang = action
  },
  [TYPES.ADD_ACTIVEPAGE](state, action) {
    state.activePages.uniqObject(action)
    state.alivePage.uniqItem(action.name)
  },
  [TYPES.REMOVE_ACTIVEPAGE](state, action) {
    state.activePages.splice(Number(action), 1)
    state.alivePage.splice(Number(action), 1)
  },
  [TYPES.NEW_THEME_APPLY](state, action) {
    state.platTheme = action
  },
}

const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
