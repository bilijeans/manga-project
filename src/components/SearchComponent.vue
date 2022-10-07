<template>
  <div class="search-container">
    <header>
      <i @click="back()" class="back wd-icon-thin-arrow-left"></i>
      <div class="search-box">
        <i class="wd-icon-search"></i>
        <input
          v-model="str"
          class="searchText"
          type="text"
          placeholder="搜书名、作者、主角，一搜即有"
          @keydown.enter="searchConfirm"
        />
      </div>
      <span class="searchConfirm" @click="searchConfirm">搜索</span>
    </header>
    <main>
      <div class="searchList" v-if="str !== ''">
        <div
          v-for="item in searchResult.data"
          :key="item.comic_id"
          :id="item.comic_id"
          @click="turnToComic(item.comic_id, item.comic_author)"
        >
          {{ item.comic_name }}
        </div>
      </div>
      <div class="hot-search">
        <div class="hot-search-head">
          <h4>热门搜索</h4>
        </div>
        <div class="hot-search-content">
          <ul>
            <li
              v-for="(item, index) in hotSearch.data"
              :key="item.comic_id"
              @click="turnToComic(item.comic_id, item.comic_author)"
            >
              <span class="hotNum">{{ index + 1 }}</span>
              <span class="hotName" :id="item.comic_id">{{
                item.comic_name
              }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="history">
        <div class="history-head">
          <h4>搜索历史</h4>
          <span @click="clearHistory">清除历史</span>
        </div>
        <div class="history-content">
          <div
            class="historyContentList"
            v-for="val in hisArr"
            :key="val.value"
            @click="searchHistory"
          >
            {{ val.value }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import { debounce } from "lodash-es";
export default {
  data() {
    return {
      str: "",
      searchResult: {},
      hotSearch: {},
      hisArr: [],
    };
  },
  created() {
    this.getSearch = debounce(this.getSearch, 1000);
    this.getHotSearch = debounce(this.getHotSearch, 1000);
    this.hisArr = JSON.parse(localStorage.getItem("history")) || [];
  },
  mounted() {
    this.getHotSearch();
    this.getSearch();
  },

  computed: {
    url() {
      return `https://www.kanman.com/api/getsortlist/?search_key=${this.str}`;
    },
  },

  watch: {
    url() {
      this.getSearch();
    },
  },

  methods: {
    getSearch() {
      this.$axios
        .get(`https://www.kanman.com/api/getsortlist/?search_key=${this.str}`)
        .then(({ data }) => {
          this.searchResult = { ...data };

          console.log("搜索结果==>", this.searchResult);
        });
    },
    searchConfirm() {
      this.getSearch();

      this.hisArr = [...this.hisArr, { value: this.str }];

      localStorage.setItem("history", JSON.stringify(this.hisArr));
      this.$router.push({
        path: "/searchR",
        query: {
          keyword: this.str,
        },
      });
      this.str = "";
    },
    getHotSearch() {
      this.$axios
        .get(`https://www.kanman.com/api/gettopsearch`)
        .then(({ data }) => {
          data.data.pop();

          this.hotSearch = { ...data };
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

    clearHistory() {
      this.hisArr = [];
      let hisArr = [];
      localStorage.setItem("history", JSON.stringify(hisArr));
    },

    searchHistory(e) {
      this.str = e.target.textContent;
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss">
.search-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f3f4f6;
  z-index: 999;
  header {
    width: 100%;
    height: 50px;
    background-color: rgb(0, 166, 255);
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
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

  main {
    position: relative;
    .searchList {
      background: #fff;
      width: 100%;
      height: 94vh;
      position: absolute;
      top: 0%;
      left: 0%;

      div {
        height: 40px;
        width: 100%;
        font-size: 18px;
        line-height: 40px;
        padding-left: 20px;
      }
    }

    .hot-search {
      background-color: #f3f4f6;
      height: 300px;
      .hot-search-head {
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding: 5px 10px;
      }

      .hot-search-content {
        ul {
          height: 250px;
          display: flex;
          justify-content: space-around;
          // align-items: ;
          flex-wrap: wrap;
          margin-top: 20px;
          li {
            width: 45%;
            height: 30px;
            overflow: hidden;
            font-size: 14px;
            .hotNum {
              display: inline-block;
              margin-left: 30px;
            }

            .hotName {
              margin-left: 15px;
              color: #666;
              white-space: nowrap;
            }

            &:nth-child(1) .hotNum {
              color: rgb(200, 0, 0);
            }

            &:nth-child(2) .hotNum {
              color: rgb(255, 51, 0);
            }

            &:nth-child(3) .hotNum {
              color: rgb(255, 102, 0);
            }
          }
        }
      }
    }

    .history {
      background-color: #f3f4f6;
      // height: 60vh;
      box-shadow: 0px 1px 20px 0px #fff;
      .history-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 5vh;
        width: 100%;

        h4 {
          margin-left: 20px;
        }

        span {
          margin-right: 20px;
          font-size: 12px;
          color: #999;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      .history-content {
        display: flex;
        margin-top: 10px;
        justify-content: flex-start;
        flex-wrap: wrap;

        .historyContentList {
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          margin: 5px 20px;
          text-decoration: underline;
          color: #999;
        }
      }
    }
  }
}
</style>