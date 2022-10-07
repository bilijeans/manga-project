<template>
  <div class="search-result-container">
    <div class="search-head">
      <i @click="back()" class="back wd-icon-thin-arrow-left"></i>
      <div class="search-box">
        <i class="wd-icon-search"></i>
        <input
          v-model="keyword"
          class="searchText"
          type="text"
          placeholder="搜书名、作者、主角，一搜即有"
          @keydown.enter="searchConfirm"
        />
      </div>
      <span class="searchConfirm" @click="searchConfirm">搜索</span>
    </div>
    <div class="searchList" v-if="keyword !== ''">
      <div
        v-for="item in searchThinkData"
        :key="item.comic_id"
        :id="item.comic_id"
        @click="turnToComic(item.comic_id, item.comic_author)"
      >
        {{ item.comic_name }}
      </div>
    </div>
    <manga-list class="manga-list" :mangaListData="searchResultData"></manga-list>
  </div>
</template>
<script>
import MangaList from "@/components/mangaList.vue";

export default {
  data() {
    return {
      searchResult: [],
      keyword: "",
      searchKey: null,
      searchResultData: {
        list: [],
        totalnum: 0,
      },
      searchThinkData: [],
      hisArr: [],
    };
  },
  components: {
    MangaList,
  },
  computed: {
    searchURL() {
      return `https://www.kanman.com/api/getsortlist/?search_key=${this.searchKey}`;
    },
    newSearchURL() {
      return `https://www.kanman.com/api/getsortlist/?search_key=${this.keyword}`;
    },
  },
  watch: {
    searchURL() {
      if (!this.searchKey) {
        return false;
      }
      this.getSearchResultData();
    },
    newSearchURL() {
      if (!this.keyword) {
        return false;
      }
      this.searchThink();
    },
  },
  created() {
    this.searchKey = this.searchKey = this.$route.query.keyword;
    this.hisArr = JSON.parse(localStorage.getItem("history")) || [];
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getSearchResultData() {
      this.$axios.get(this.searchURL).then(({ data }) => {
        this.searchResultData.list = data.data;
        this.searchResultData.totalnum = data.data.length;
      });
    },
    searchConfirm() {
      this.$axios.get(this.newSearchURL).then(({ data }) => {
        this.searchResultData.list = data.data;
        this.searchResultData.totalnum = data.data.length;
      });
      this.hisArr = [...this.hisArr, { value: this.keyword }];

      localStorage.setItem("history", JSON.stringify(this.hisArr));
      this.keyword = "";
    },
    searchThink() {
      this.$axios.get(this.newSearchURL).then(({ data }) => {
        this.searchThinkData = data.data;
      });
    },
    turnToComic(num, str) {
      this.$router.push({
        path: "/info",
        query: {
          id: num,
          author: str,
        },
      });
    },
  },
};
</script>
<style lang="scss">
.search-result-container{
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 200;
  background-color: #fff;
}
.search-head {
  width: 100vw;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  background-color: rgb(0, 166, 255);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .back {
    margin-left: 10px;
    font-size: 20px;
    color: white;
  }
  .search-box {
    width: 60%;
    height: 30px;
    padding: 0 10px;
    background-color: #fff;
    border-radius: 10px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;

    i {
      color: #999;
    }

    .searchText {
      padding: 0;
      border: 0;
      outline: none;
      height: 100%;
      width: 90%;
      border-radius: 10px;
    }
  }

  .searchConfirm {
    color: #fff;
    margin-right: 20px;
  }
}
.searchList {
  //   background-color: #fff;
  background: #fff;
  width: 100%;
  //   height: 94vh;
  position: absolute;
  top: 50px;
  left: 0%;

  div {
    height: 40px;
    width: 100%;
    font-size: 18px;
    line-height: 40px;
    padding-left: 20px;
  }
}
.manga-list{
  height: calc( 100vh - 50px);
  overflow: auto;
  &::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
}
</style>