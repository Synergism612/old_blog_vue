import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    //sessionStorage中存储的是序列化后的，我们需要转换回对象
    userInfo: JSON.parse(localStorage.getItem("userInfo"))
  },
  mutations: {
    //基本的方法
    SET_TOKEN: (state, token) => {
      state.token = token
      //将token存储到浏览器本地，localStorage可以长久的存储
      localStorage.setItem("token", token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      //将userInfo存储到浏览器本地，sessionStorage存储时间短，关闭浏览器就会消失
      //这俩不一样长的话会出问题，有token没用户信息
      //store不支持存储对象，所以我们需要将其序列化
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    //删除信息
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userInfo = {}
      localStorage.setItem("token", '')
      localStorage.setItem("userInfo", JSON.stringify(''))
    }
  },
  getters: {
    //get方法，也可以不写
    getUser: state => {
      return state.userInfo
    }
  },
  actions: {},
  modules: {}
})