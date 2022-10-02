import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import BookcaseView from "../views/BookcaseView.vue";
import ClassifyView from "../views/ClassifyView.vue";
import PersonalView from "../views/PersonalView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:'recommend',
    children: [
      { path: '/recommend',name:'recommend',component:()=>import("../views/home/RecommendView.vue") },
      { path: '/update',name:'update',component:()=>import("../views/home/UpdateView.vue") },
      { path: '/rank',name:'rank',component:()=>import("../views/home/RankView.vue") },
      { path: '/search',name:'search',component:()=>import("../views/home/SearchView.vue") },
    ]
  },
  {
    path: '/bookcase',
    name: 'bookcase',
    component: BookcaseView
  },
  {
    path: '/classify',
    name: 'classify',
    component: ClassifyView
  },
  {
    path: '/personal',
    name: 'personal',
    component: PersonalView
  },
  // {
  //   path:'/search',
  //   name:'search',
  //   component:SearchView
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
