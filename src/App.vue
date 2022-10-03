<template>
  <div id="app">
    <div class="footer">
      <router-link tag="div" to="/">
        <div><img src="./assets/home.svg" /></div>
        <span>主页</span>
      </router-link>
      <router-link tag="div" to="/bookcase">
        <div><img style="color: blue" src="./assets/bookcase.svg" /></div>
        <span>书架</span>
      </router-link>
      <router-link tag="div" to="/classify">
        <div><img src="./assets/classify.svg" /></div>
        <span>分类</span>
      </router-link>
      <router-link tag="div" to="/personal">
        <div><img src="./assets/personal.svg" /></div>
        <span>个人</span>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  // flex: 1 0 auto;
  div {
    padding: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    // line-height: 50px;
    // background-color: #ccc;
    div {
      img {
        width: 25px;
        // padding: 0 0 3px 0;
      }
    }
  }
  .router-link-exact-active {
    color: #00adf1;
    font-weight: bold;
  }
}
</style>
