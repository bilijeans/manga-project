<template>
  <div class="commend">
    <div class="con-ad">
      <div class="rank">
        <img src="@/assets/cup.jpg" />
        <div class="rank-title">
          <span class="rank-title-h">排行榜</span>
          <span>海量精品漫画</span>
          <span>立即去看看</span>
        </div>
      </div>
      <div class="update">
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
        <span class="more">更多 ></span>
      </div>
      <div class="list-items">
        <div
          class="items"
          v-for="n in listData"
          :key="n.comic_id"
          @click="turnRoute(n.comic_id, n.author_name)"
        >
          <img :src="'https://image.yqmh.com/mh/' + n.comic_id + '.jpg'" />
          <span>{{ n.comic_name }}</span>
        </div>
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
      date: "2022-10-1",
      listData: {},
    };
  },
  computed: {
    url() {
      return `https://www.kanman.com/api/updatelist?page=${this.page}&pageSize=${this.pageSize}&date=${this.date}`;
    },
  },
  watch: {
    url() {
      return `https://www.kanman.com/api/updatelist?page=${this.page}&pageSize=${this.pageSize}&date=${this.date}`;
    },
  },
  created() {
    this.getListData();
  },
  methods: {
    getListData() {
      this.$axios.get(this.url).then(({ data }) => {
        console.log(data.data.list);
        this.listData = data.data.list;
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
  },
};
</script>

<style lang="scss">
.commend {
  background-color: #f3f4f6;
  .con-ad {
    width: 90%;
    height: 80px;
    margin: 0 auto;
    padding: 18px;
    display: flex;
    justify-content: space-between;
    .rank {
      background-image: linear-gradient(90deg, #fedeab, #fca959);
      border-radius: 6px;
      width: 48%;
      height: 100%;
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
          padding: 6px;
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
      height: 100%;
      background-color: pink;
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
          padding: 6px;
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
      height: auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .items {
        width: 31%;
        img {
          width: 100%;
        }
        span {
          font-size: 12px;
          display: block;
          padding: 5px 3px 20px;
        }
      }
    }
  }
}
</style>