<template>
  <div id="app">
    <div class="footer">
      <router-link tag="div" to="/home">
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
<script>
export default {
  created() {
    if (window.location.pathname == "/index.html" || window.location.pathname == "/moyuComic/") {
      this.$router.push({ path: "/home" });
    }
    this.getAllDate();
  },

  methods: {
    getAllDate() {
      if (localStorage.getItem("allComic") === null) {
        this.$axios
          .get("https://www.kanman.com/api/getComicList")
          .then(({ data }) => {
            let allComic = data.data;

            localStorage.setItem("allComic", JSON.stringify(allComic));
          });
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  padding-bottom: 50px;
}
.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-around;
  z-index: 100;
  background-color: #f3f4f6;
  border-top: 1px solid #ccc;
  div {
    padding: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    div {
      img {
        width: 25px;
      }
    }
  }
  .router-link-active,
  .router-link-exact-active {
    color: #00adf1;
    font-weight: bold;
  }
}
</style>
