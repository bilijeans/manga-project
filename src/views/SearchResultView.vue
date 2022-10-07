<template>
  <div>
    <div class="search-head">
      <i @click="back()" class="back wd-icon-thin-arrow-left"></i>
      <div class="search-box">
        <div class="searchIco">
          <svg
            t="1664782037558"
            class="icon"
            viewBox="0 0 1040 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1401"
            width="20"
            height="20"
          >
            <path
              d="M176.439478 676.824953c-139.585105-133.763516-139.585105-351.411535 0-485.179145 67.62826-64.84589 157.511383-100.492762 253.15572-100.492762 95.567589 0 185.449689 35.647895 253.078972 100.492762 139.585105 133.76761 139.585105 351.415628 0 485.179145-67.62826 64.777329-157.511383 100.484575-253.15572 100.484575C333.950861 777.309528 244.067738 741.602282 176.439478 676.824953L176.439478 676.824953 176.439478 676.824953zM1024.212848 955.665659 756.059552 698.643887c142.644791-161.752987 136.315642-403.047566-22.757307-555.514049-83.911108-80.436984-193.845916-120.617102-303.707047-120.617102-109.937878 0-219.880873 40.180118-303.779701 120.617102-167.754678 160.728658-167.754678 421.408749 0 582.215178 83.898829 80.364329 193.8408 120.613008 303.702953 120.613008 98.632391 0 196.124819-34.149774 275.908934-98.794074l268.225951 257.017678L1024.212848 955.665659 1024.212848 955.665659zM1024.212848 955.665659"
              p-id="1402"
            ></path>
          </svg>
        </div>
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
    <manga-list :mangaListData="searchResultData"></manga-list>
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
    console.log((this.searchKey = this.$route.query.keyword));
    this.hisArr = JSON.parse(localStorage.getItem("history")) || [];
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getSearchResultData() {
      this.$axios.get(this.searchURL).then(({ data }) => {
        console.log(data.data);
        this.searchResultData.list = data.data;
        this.searchResultData.totalnum = data.data.length;
        console.log(this.searchResultData);
      });
    },
    searchConfirm() {
      this.$axios.get(this.newSearchURL).then(({ data }) => {
        console.log(data.data);
        this.searchResultData.list = data.data;
        this.searchResultData.totalnum = data.data.length;
        console.log(this.searchResultData);
      });
      this.hisArr = [...this.hisArr, { value: this.keyword }];

      localStorage.setItem("history", JSON.stringify(this.hisArr));
      this.keyword = "";
    },
    searchThink() {
      this.$axios.get(this.newSearchURL).then(({ data }) => {
        console.log(data.data);
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
.search-head {
  width: 100vw;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  background-color: rgb(0, 166, 255);
  display: flex;
  .back {
    color: white;
  }
  .search-box {
    width: 70vw;
    height: 80%;
    background-color: #fff;
    margin: 5px 20px 0 20px;
    border-radius: 10px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .searchIco {
      width: 30px;
      height: 30px;
      background-color: #fff;
      line-height: 35px;
      text-align: center;
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
</style>