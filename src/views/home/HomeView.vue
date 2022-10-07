<template>
  <div class="home">
    <header>
      <div class="nav-bar">
        <router-link class="nav-item" tag="div" to="/home/recommend"
          >推荐</router-link
        >
        <router-link class="nav-item" tag="div" to="/home/update">更新</router-link>
        <router-link class="nav-item" tag="div" to="/home/rank">排行</router-link>
      </div>
      <router-link class="search-box" tag="div" to="/home/search">
        <i class="wd-icon-search"></i>
        <span>搜书名、作者、主角，一搜即有</span>
      </router-link>
    </header>

    <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
.home {
  background-color: #F3F4F6;
  padding-top: 100px;
  height: calc( 100vh - 155px);
  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
  }
  .nav-bar {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
    font-size: 12px;
    .nav-item {
      float: left;
      padding: 5px 15px;
      line-height: 30px;
      text-align: center;
    }
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
  .search-box {
    display: flex;
    align-items: center;
    width: 90%;
    height: 30px;
    background-color: #E4E5E7;
    border-radius: 20px;
    line-height: 30px;
    padding-left: 10px;
    margin: 0 auto;
    i {
      font-size: 14px;
    }
    span {
      margin-left: 10px;
      font-size: 12px;
      color: #666;
    }
  }
}
.nav-item.router-link-exact-active {
  position: relative;
  font-size: 16px;
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 22px;
    background-color: #00adf1;
    height: 4px;
    border-radius: 2px;
  }
}
</style>
