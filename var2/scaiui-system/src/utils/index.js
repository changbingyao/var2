import Vue from "vue";
import {langTran} from './lang'
import './extend'


const  GlobalFun = {
  langTran,
}

Object.keys(GlobalFun).forEach(key => {
  Vue.prototype[key] = GlobalFun[key]
});




