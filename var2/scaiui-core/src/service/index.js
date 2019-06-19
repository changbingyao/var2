// import Vue from 'vue'
import axios from 'axios'
import $Message from 'element-ui/lib/message'
import $MessageBox from "element-ui/lib/message-box";
import i18n from "../locale";
// import router from '../router'
// const $t = (key, value) => i18n.t(key, value)
const service = axios.create({
  baseURL: '/api',
  headers: {'Content-Type': 'application/json; charset=UTF-8'}
});

// 拦截器
service.interceptors.request.use(config => {
  config.headers = Object.assign({locale: i18n.locale}, config.headers);
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response
}, error => {
  i18n.locale = localStorage.getItem("locale") || i18n.locale;
  const response = error.response;
  const status = response.status;
  if (Object.is(status, 601)) {
    $MessageBox.alert(response.data.msg, '', {
      confirmButtonText: i18n.t('ok'),
      showCancelButton: false,
      showConfirmButton: true,
      type: 'warning'
    }).then(() => {
      if (!Object.is(window.location.pathname, '/login')) {
        window.location.replace('/')
      }
    }).catch(() => {
      if (!Object.is(window.location.pathname, '/login')) {
        window.location.replace('/')
      }
    });
    return false

    //跳入登陆页面
  } else if (Object.is(status, 602)) {
    $MessageBox.alert(response.data.msg, '', {
      confirmButtonText: i18n.t('ok'),
      showCancelButton: false,
      showConfirmButton: true,
      type: 'warning'
    }).then(() => {
      if (!Object.is(window.location.pathname, '/login')) {
        window.location.replace('/')
      }
      return false
    }).catch(() => {
      if (!Object.is(window.location.pathname, '/login')) {
        window.location.replace('/')
      }
      return false
    });
    return false
  } else if (Object.is(status, 603)) {
    $MessageBox.alert(response.data.msg, '', {
      confirmButtonText: '确定',
      showCancelButton: false,
      showConfirmButton: true,
      type: 'warning'
    }).then(() => {
      if (!Object.is(window.location.pathname, '/login')) {
        window.location.replace('/')
      }
    }).catch(() => {
      if (!Object.is(window.location.pathname, '/login')) {
        window.location.replace('/')
      }
    });
    return false
  } else if (Object.is(status, 605)) {
    $MessageBox.alert(response.data.msg, '', {
      confirmButtonText: '确定',
      showCancelButton: false,
      showConfirmButton: true,
      type: 'warning'
    }).then(() => {
      if (!Object.is(window.location.pathname, '/login')) {
        window.location.replace('/')
      }
    }).catch(() => {
      if (!Object.is(window.location.pathname, '/login')) {
        window.location.replace('/')
      }
    });
    return false
  } else if (Object.is(status, 606)) {
    $MessageBox.alert(response.data.msg, '', {
      confirmButtonText: '确定',
      showCancelButton: false,
      // showConfirmButton: false
      type: 'warning'
    }).then(() => {
      if (!Object.is(window.location.pathname, '/login')) {
        window.location.replace('/')
      }
    }).catch(() => {
      if (!Object.is(window.location.pathname, '/login')) {
        window.location.replace('/')
      }
    });
    return false
  } else if (Object.is(status, 500)) {
    $Message.error(response.data.msg)
    return false
  } else if (Object.is(status, 404)) {
    $Message.error(response.data.msg)
    return false
  } else {
    $Message.error(response.data.msg)
    return false
  }
  return false
  // return Promise.reject(error)
})
export default service
