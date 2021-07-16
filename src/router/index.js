import Vue from 'vue'
import VueRouter from 'vue-router'

// Vue.use(VueRouter)
if (!window.VueRouter) Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    redirect: {
      name: 'Index'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: resolve => require(['../views/User/Login.vue'], resolve)
  },
  {
    path: '/register',
    name: 'Register',
    component: resolve => require(['../views/User/Register.vue'], resolve)
  },
  {
    path: '/user/index',
    name: 'Index',
    component: resolve => require(['../views/User/Index/Index.vue'], resolve)
  },
  {
    path: '/user/category',
    name: 'Category',
    component: resolve => require(['../views/User/Category/Category.vue'], resolve)
  },
  {
    path: '/user/article/:id',
    name: 'Article',
    component: resolve => require(['../views/User/Article/Article.vue'], resolve)
  },
  {
    path: '/user/archives',
    name: 'Archives',
    component: resolve => require(['../views/User/Archives/Archives.vue'], resolve)
  },
  {
    path: '/user/resource',
    name: 'Resource',
    component: resolve => require(['../views/User/Resource/Resource.vue'], resolve)
  },
  {
    path: '/user/timeline',
    name: 'Timeline',
    component: resolve => require(['../views/User/Timeline/Timeline.vue'], resolve)
  },
  {
    path: '/user/about',
    name: 'About',
    component: resolve => require(['../views/User/About/About.vue'], resolve)
  },
  {
    path: '/user',
    name: 'User',
    component: resolve => require(['../views/User/User/User.vue'], resolve)
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

router.afterEach((to, from, next) => {
  //每次跳转回到网页顶部
  window.scrollTo(0, 0);
  next;
});
export default router