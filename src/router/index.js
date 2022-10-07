import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import BookcaseView from "../views/BookcaseView.vue";
import ClassifyView from "../views/ClassifyView.vue";
import PersonalView from "../views/PersonalView.vue";
import MangaInfoView from "../views/MangaInfoView.vue";
import ReadView from "../views/ReadView.vue";
import SearchResultView from "../views/SearchResultView.vue";
import OnlyRankView from "../views/OnlyRankView.vue";
import OnlyUpdateView from "../views/OnlyUpdateView.vue";
import OnlyClassifyView from "../views/OnlyClassifyView.vue";

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
    component:MangaInfoView,
    props:true
  },
  {
    path:'/read',
    name:'read',
    component:ReadView,
    props:true
  },
  {
    path:'/searchR',
    name:'searchR',
    component:SearchResultView,
    props:true
  },
  {
    path:'/onlyrank',
    name:'onlyrank',
    component:OnlyRankView
  },
  {
    path:'/onlyupdate',
    name:'onlyupdate',
    component:OnlyUpdateView
  },
  {
    path:'/onlyclassify',
    name:'onlyclassify',
    component:OnlyClassifyView
  }

]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
