import router from './router'
import store from './store'
//引入axios
import axios from 'axios'
//引入Element-ui
import Element from 'element-ui'
//请求时附带session
axios.defaults.withCredentials = true
//请求前缀
// 本地
axios.defaults.baseURL = "http://localhost:8088"
//服务器端
// axios.defaults.baseURL = "http://123.60.219.31:8088"

//后置拦截
axios.interceptors.response.use(response => {
    let res = response.data
    if (response.config.url == '/login') {
      return response
    }
    if (response.config.url.concat('admin')) {
      if (res.code === 200) {
        // console.log(response);
        return response.data
      } else {
        Element.Notification.error({
          title: "错误",
          message: "您没有权限",
          offset: 100
        })
        //阻止继续进行
        return Promise.reject(response.data.msg)
      }
    }
    //如果res的code不为200说明出现异常了，我们需要对异常进行处理
    if (res.code === 200) {
      // console.log(response);
      return response.data
    } else {
      Element.Notification.error({
        title: "错误",
        message: response.data.msg,
        offset: 100
      })
      //阻止继续进行
      return Promise.reject(response.data.msg)
      //以上并不能拦截账户名错误的异常
    }
  },
  error => {
    if (error.response.status === 401) {
      //删除存储的信息
      store.commit('REMOVE_INFO')
      router.push("/login")
    }
    if (error.response.data) {
      error.message = error.response.data.msg
    }
    //添加弹窗并设置过期时间单位毫秒
    Element.Notification.error({
      title: "错误",
      message: error.message,
      offset: 100
    })
    //阻止继续进行
    return Promise.reject(error)
  }
);