import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/all.css'
import './assets/css/blogs.css'
import './assets/css/frame.css'
import './assets/css/calendar.css'
import './assets/css/comment.css'
import './assets/css/search.css'

//引入animate.css
import animate from 'animate.css'
//引入axios配置
import './axios'
//引入Element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入axios
import axios from 'axios'
//引入粒子效果
import VueParticles from 'vue-particles'
// 引入md编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//引入moment
import Moment from 'moment'
//引入图标库
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon,FontAwesomeLayers,FontAwesomeLayersText} from '@fortawesome/vue-fontawesome'
//全局启用图标库
library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

//引入less
import less from 'less'
Vue.use(less)

//全局启用moment
Vue.prototype.moment = Moment
//启用md编辑器
Vue.use(mavonEditor)
//全局调用粒子效果
Vue.use(VueParticles)
//全局启用Element
Vue.use(Element)
//全局启用axios
Vue.prototype.axios = axios
// Vue.prototype.axios = axios
//全局启用animate
Vue.use(animate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')