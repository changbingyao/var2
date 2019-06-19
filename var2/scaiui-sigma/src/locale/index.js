import Vue from 'vue';
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnUS from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhCN from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementZhTW from 'element-ui/lib/locale/lang/zh-TW'// element-ui lang
import iviewZhCN from 'iview/src/locale/lang/zh-CN';
import iviewEnUS from 'iview/src/locale/lang/en-US';
import iviewZhTW from 'iview/src/locale/lang/zh-TW';
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'
import zhTW from './lang/zh-TW'
// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.lang || localLang || 'zh-CN';

Vue.use(VueI18n);

const messages = {
  "en-US": {
    ...enUS,
    ...elementEnUS,
    ...iviewEnUS
  },
  "zh-CN": {
    ...zhCN,
    ...elementZhCN,
    ...iviewZhCN
  },
  "zh-TW": {
    ...zhTW,
    ...elementZhTW,
    ...iviewZhTW
  }
};

const i18n = new VueI18n({
  locale: Cookies.get('language') || window.navigator.language || 'zh-CN',
  messages
});

export default i18n
