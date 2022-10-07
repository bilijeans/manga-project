<template>
  <div class="search-container">
    <header>
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
          v-model="str"
          class="searchText"
          type="text"
          placeholder="搜书名、作者、主角，一搜即有"
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
          @click="getId"
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
              @click="getId"
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
    this.getSearch = debounce(this.getSearch);
    this.getHotSearch = debounce(this.getHotSearch);
    this.hisArr = JSON.parse(localStorage.getItem("history")) || [];
  },
  mounted() {
    this.getHotSearch();
    this.getSearch();
  },

  computed: {
    url(){
      return `https://www.kanman.com/api/getsortlist/?search_key=${this.str}`
    }
  },

  watch : {
     url() {
      this.getSearch()
     }
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

    getId(e) {
      console.log("id ==>", e.target.id);
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
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 999;
  header {
    width: 100%;
    height: 50px;
    background-color: rgb(0, 166, 255);
    line-height: 50px;
    padding-left: 10px;
    display: flex;
    flex: 1;
    .back {
      font-size: 30px;
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

    .searchConfirm {
      color: #fff;
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
      height: 40vh;
      .hot-search-head {
        width: 100%;
        height: 5vh;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h4 {
          margin-left: 20px;
        }

        .change {
          margin-right: 20px;
          font-size: 12px;
          color: #999;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      .hot-search-content {
        ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          li {
            margin: 15px 0;
            width: 50vw;
            height: 30px;
            overflow: hidden;
            line-height: 30px;

            .hotNum {
              display: inline-block;
              margin-left: 30px;
            }

            .hotName {
              margin-left: 15px;
              color: #666;
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
      height: 60vh;
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