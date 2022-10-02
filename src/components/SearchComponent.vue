<template>
  <div class="search-container">
    <header>
      <router-link
        to="/"
        tag="i"
        class="back wd-icon-thin-arrow-left"
      ></router-link>
      <div class="search-box"></div>
    </header>
    <main>
      <div class="hot-search"></div>
      <div class="history"></div>
    </main>
  </div>
</template>
<style lang="scss">
.search-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 0, 0.241);
  header {
    width: 100%;
    height: 50px;
    background-color: rgb(0, 166, 255);
    line-height: 50px;
    padding-left: 10px;
    .back {
      font-size: 30px;
      color: white;
    }
  }
}
</style>