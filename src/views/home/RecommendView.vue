<template>
  <div class="commend">
    <div class="con-ad">
      <div class="rank" @click="turnToOnlyRank">
        <img src="@/assets/cup.jpg" />
        <div class="rank-title">
          <span class="rank-title-h">排行榜</span>
          <span>海量精品漫画</span>
          <span>立即去看看</span>
        </div>
      </div>
      <div class="update" @click="turnToOnlyUpdate">
        <img src="https://image.yqmh.com/mh/108846.jpg" />
        <div class="update-title">
          <span class="rank-title-h">今日更新</span>
          <span>全网同步</span>
          <span>追漫快人一步</span>
        </div>
      </div>
    </div>
    <div class="manga-list">
      <div class="list-h">
        <span>全网都在看</span>
        <span class="more" @click="turnToClassify">更多 <i class="wd-icon-arrow-right"></i> </span>
      </div>
      <div class="list-items">
        <div
          class="items"
          v-for="n in listData"
          :key="n.comic_id"
          @click.stop="turnRoute(n.comic_id, n.author_name)"
        >
          <img :src="'https://image.yqmh.com/mh/' + n.comic_id + '.jpg'" />
          <span class="name">{{ n.comic_name }}</span>
          <span class="score">{{parseScore(n.score)}}</span>
        </div>
      </div>
      <div class="change" @click="changePage">
        换一换<i class="wd-icon-refresh"></i>
      </div>
    </div>
    <!-- <search-component></search-component> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      pageSize: 6,
      currentDate: "",
      time: "",
      fullYear: "",
      month: "",
      date: "",
      listData: {},
    };
  },
  computed: {
    url() {
      return `https://www.kanman.com/api/updatelist?page=${this.page}&pageSize=${this.pageSize}&date=${this.currentDate}`;
    },
  },
  watch: {
    url() {
      this.getListData();
    },
  },
  created() {
    this.time = new Date();
    this.fullYear = this.time.getFullYear();
    this.month = this.time.getMonth() + 1;
    this.date = this.time.getDate();
    this.currentDate = this.fullYear + "-" + this.month + "-" + this.date;
    this.getListData();
  },
  methods: {
    getListData() {
      this.$axios.get(this.url).then(({ data }) => {
        this.listData = data.data.list.slice(0, 6);
      });
    },
    turnRoute(num, str) {
      this.$router.push({
        path: "/info",
        query: {
          id: num,
          author: str,
        },
      });
    },
    turnToOnlyRank() {
      this.$router.push({
        path: "/onlyrank",
      });
    },
    turnToOnlyUpdate() {
      this.$router.push({
        path: "/onlyupdate",
      });
    },
    changePage() {
      this.page = ((this.page + 1) % 3) + 1;
    },
    turnToClassify() {
      this.$router.push({
        path: "/onlyclassify",
      });
    },
    parseScore(num){
      return num.toFixed(1)
    }
  },
};
</script>

<style lang="scss">
.commend {
  height: calc(100vh - 136px);
  overflow: auto;
  background-color: #f3f4f6;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .con-ad {
    width: 90%;
    height: 88px;
    margin: 0 auto;
    padding: 18px;
    display: flex;
    justify-content: space-between;
    .rank {
      background-image: linear-gradient(90deg, #fedeab, #fca959);
      border-radius: 6px;
      width: 48%;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 40%;
        height: 85%;
        padding: 6px;
      }
      .rank-title {
        width: 55%;
        height: 100%;
        display: flex;
        flex-direction: column;
        span {
          display: block;
          padding: 6.5px;
          font-size: 12px;
          color: #7b4306;
        }
        .rank-title-h {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .update {
      background-image: linear-gradient(90deg, #fedeab, #fca959);
      border-radius: 6px;
      width: 48%;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 35%;
        height: 90%;
        margin-left: 8px;
        border-radius: 6px;
        background-color: #9a9a9a;
      }
      .update-title {
        width: 55%;
        height: 100%;
        display: flex;
        flex-direction: column;
        span {
          display: block;
          padding: 6.5px;
          font-size: 12px;
          color: #7b4306;
        }
        .rank-title-h {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
  .manga-list {
    width: 90%;
    height: auto;
    padding-bottom: 80px;
    margin: 0 auto;
    .list-h {
      width: 100%;
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        display: block;
        font-size: 14px;
      }
      .more {
        padding: 8px 12px;
        font-size: 12px;
        border-radius: 999px;
        color: #9a9a9a;
        background-color: #edeef0;
      }
    }
    .list-items {
      width: 100%;
      height: 400px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .items {
        position: relative;
        width: 31%;
        img {
          width: 100%;
        }
        .name {
          font-size: 12px;
          display: block;
          padding: 5px 3px 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .score{
          position: absolute;
          right: 2px;
          top: 2px;
          font-size: 14px;
          color: rgb(255, 238, 85);
        }
      }
    }
    .change {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60%;
      padding: 10px 20px;
      margin: 0 auto;
      font-size: 14px;
      color: #666;
      background-color: #E4E5E7;
      border-radius: 20px;
      i {
        margin-left: 10px;
      }
    }
  }
}
</style>