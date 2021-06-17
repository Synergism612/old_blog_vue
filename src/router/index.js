import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Category from '../views/Category.vue'
import Article from '../views/Article.vue'
import Archives from '../views/Archives.vue'
import Resoutce from '../views/Resource.vue'
import Timeline from '../views/Timeline.vue'
import About from '../views/About.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

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
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/user/category',
    name: 'Category',
    component: Category,
  },
  {
    path: '/user/article/:id',
    name: 'Article',
    component: Article,
  },
  {
    path: '/user/archives',
    name: 'Archives',
    component: Archives,
  },
  {
    path: '/user/resoutce',
    name: 'Resoutce',
    component: Resoutce,
  },
  {
    path: '/user/timeline',
    name: 'Timeline',
    component: Timeline,
  },
  {
    path: '/user/about',
    name: 'About',
    component: About,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/blog/',
  routes
})

router.afterEach((to, from, next) => {
  //每次跳转回到网页顶部
  window.scrollTo(0, 0);
  next;
});
export default router