import Vue from "vue";
import Router from "vue-router";
import store from "./store"
Vue.use(Router);

const rejectAuthUser = (to, from, next) => {
  if(store.state.isLogin === true){
    //이미 로그인 된 유저이기에 막아야 함.
    alert("이미 로그인을 하였습니다.")
    next("/")
  } else{
    next()
  }
}
const onlyAuthUser = (to, from, next) => {
  if(store.state.isLogin === false){
    //이미 로그인 안 된 유저이기에 막아야 함.
    alert("로그인이 필요한 기능입니다.")
    next("/")
  } else{
    next()
  }
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: rejectAuthUser,
      component: () => import(/* webpackChunkName: "home" */ "./views/Login.vue")
    },
    {
      path: "/mypage",
      name: "mypage",
      beforeEnter: onlyAuthUser,
      component: () => import(/* webpackChunkName: "home" */ "./views/Mypage.vue")
    }
  ]
});
