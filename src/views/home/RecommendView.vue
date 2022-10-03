<template>
  <div class="commend">
    <div class="con-ad">
      <div class="rank">
        <img src="" />
        <div class="rank-title">
          <span>排行榜</span>
          <span>排行榜</span>
          <span>排行榜</span>
        </div>
      </div>
      <div class="update">
        <img src="" />
        <div class="update-title">
          <span>今日更新</span>
          <span>今日更新</span>
          <span>今日更新</span>
        </div>
      </div>
    </div>
    <div class="manga-list">
      <div class="list-h">
        <span>全网都在看</span>
        <span class="more">更多 ></span>
      </div>
      <div class="list-items">
        <div class="items" v-for="n in listData" :key="n.comic_id">
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
      listData: "",
    };
  },
  computed: {
    url() {
      return `https://www.kanman.com/api/updatelist?page=${this.page}&pageSize=${this.pageSize}&date=${this.date}`;
    },
  },
  watch: {
    url() {},
  },
  created() {
    this.getListData();
  },
  methods: {
    getListData() {
      //   console.log(this.url);
      this.$axios.get(this.url).then(({ data }) => {
        console.log(data.data.list);
        this.listData = data.data.list;
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
      width: 48%;
      height: 100%;
      background-color: pink;
      display: flex;
      flex-direction: row;
      img {
        width: 45%;
        height: 100%;
        background-color: blue;
      }
      .rank-title {
        width: 55%;
        height: 100%;
        display: flex;
        flex-direction: column;
        span {
          display: block;
          padding: 7px;
          font-size: 12px;
        }
      }
    }
    .update {
      width: 48%;
      height: 100%;
      background-color: pink;
      display: flex;
      flex-direction: row;
      img {
        width: 45%;
        height: 100%;
        background-color: blue;
      }
      .update-title {
        width: 55%;
        height: 100%;
        display: flex;
        flex-direction: column;
        span {
          display: block;
          padding: 7px;
          font-size: 12px;
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
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        display: block;
        font-size: 14px;
      }
      .more {
        padding: 0 12px;
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