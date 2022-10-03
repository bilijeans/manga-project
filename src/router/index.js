import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import BookcaseView from "../views/BookcaseView.vue";
import ClassifyView from "../views/ClassifyView.vue";
import PersonalView from "../views/PersonalView.vue";
import MangaInfoView from "../views/MangaInfoView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    redirect:'/home/recommend',
    children: [
      { path: '/home/recommend',name:'recommend',component:()=>import("../views/home/RecommendView.vue") },
      { path: '/home/update',name:'update',component:()=>import("../views/home/UpdateView.vue") },
      { path: '/home/rank',name:'rank',component:()=>import("../views/home/RankView.vue") },
      { path: '/home/search',name:'search',component:()=>import("../views/home/SearchView.vue") },
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
  {
    path:'/info',
    name:'info',
    component:MangaInfoView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
