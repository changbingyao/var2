import axios from 'axios'
import message from 'element-ui/lib/message'
import i18n from "../locale";

const service = axios.create({
  baseURL: '/api',
  headers: {'Content-Type': 'application/json; charset=UTF-8'}
});

// 拦截器
service.interceptors.request.use(config => {
  let path = window.location.href.replace(window.location.origin, "").replace("/#", "")
  config.headers = Object.assign({client_page: path,locale:i18n.locale||"zh_CN"}, config.headers);
  return config
}, error => {
  return Promise.reject(error)
});




service.interceptors.response.use(response => {
  return response
}, error => {
  const response = error.response;
  const status = response.status;
  if (Object.is(status, 601)) {
    message.error(response.data.msg || '抱歉，权限不足，请重新登录！');
    //跳入登陆页面
    if (!Object.is(window.location.pathname, '/login')) {
      window.location = '/'
    }
  } else if (Object.is(status, 602)) {
    message.error(response.data.msg || '抱歉，您已超时，请重新登录！');
    //跳入登陆页面
    if (!Object.is(window.location.pathname, '/login')) {
      window.location = '/'
    }
  } else if (Object.is(status, 603)) {
    message.error(response.data.msg || '抱歉，您已在其他浏览器登录！');
    //跳入登陆页面
    if (!Object.is(window.location.pathname, '/login')) {
      window.location = '/'
    }
  } else if (Object.is(status, 605)) {
    message.error(response.data.msg || '您的角色发生变更，请重新登录！');
    //跳入登陆页面
    if (!Object.is(window.location.pathname, '/login')) {
      window.location = '/'
    }
  } else if (Object.is(status, 606)) {
    message.error(response.data.msg || '抱歉，您已被强制退出！');
    //跳入登陆页面
    if (!Object.is(window.location.pathname, '/login')) {
      window.location = '/'
    }
  } else if (Object.is(status, 500)) {
    message.error('网络错误，请稍后再试！')
  } else if (Object.is(status, 404)) {
    message.error(response.data.message || '未找到对应数据！');
  } else {
    message.error(response.data.message || '未知错误！');
  }
  return Promise.reject(error)
});

export default service
