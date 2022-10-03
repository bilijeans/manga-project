<template>
  <div class="home">
    <header>
      <div class="nav-bar">
        <router-link class="nav-item" tag="div" to="/recommend"
          >推荐</router-link
        >
        <router-link class="nav-item" tag="div" to="/update">更新</router-link>
        <router-link class="nav-item" tag="div" to="/rank">排行</router-link>
      </div>
      <router-link class="search-box" tag="div" to="/search">
        <i class="wd-icon-search"></i>
        <span>搜书名、作者、主角，一搜即有</span>
      </router-link>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  // name: 'home',
  // components: {
  // }
};
</script>
<style lang="scss" scoped>
.home {
  header {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid black;
  }
  .nav-bar {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
    .nav-item {
      float: left;
      width: 50px;
      height: 30px;
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
    width: 90%;
    height: 30px;
    background-color: rgba(204, 204, 204, 0.5);
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
  font-size: 20px;
  // border-bottom: 2px solid blue;
  &::after{
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 20px;
    background-color: skyblue;
    height: 2px;
    border-radius: 2px;
  }
}
</style>
