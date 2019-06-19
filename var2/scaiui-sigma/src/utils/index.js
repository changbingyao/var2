import Vue from "vue";
import {langTran} from './lang'
import {analysisTier} from './object'

import './extend'


const  GlobalFun = {
  langTran,
  analysisTier
};

Object.keys(GlobalFun).forEach(key => {
  Vue.prototype[key] = GlobalFun[key]
});





