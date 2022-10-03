<template>
  <div id="app">
    <div class="footer">
      <router-link tag="div" to="/">主页</router-link>
      <router-link tag="div" to="/bookcase">书架</router-link>
      <router-link tag="div" to="/classify">分类</router-link>
      <router-link tag="div" to="/personal">个人</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  padding-bottom: 50px;
}
.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
  display: flex;
  flex: 1 0 auto;
  z-index: 999;
  background-color: #fff;
  div {
    flex: 1;
    text-align: center;
    line-height: 50px;
    border-top: 1px solid #ccc;
    // background-color: #ccc;
  }
  .router-link-exact-active {
    color: rgb(40, 92, 248);
    font-weight: bold;
  }
}
</style>
