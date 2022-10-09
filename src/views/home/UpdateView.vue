<template>
  <div class="update-container">
    <div class="head">
      <div
        @click="dateActive(i.dateId)"
        :class="['date', { 'date-active': i.status }]"
        v-for="i in timeDay"
        :key="i.dateId"
      >
        {{ i.date }}
      </div>
    </div>
    <div class="update-list">
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
</template>

<script>
export { whatday } from "@/utils/date";
export default {
  data() {
    return {
      page: 1,
      pageSize: 12,
      currentDate: "",
      time: "",
      fullYear: "",
      month: "",
      date: "",
      listData: {},
      timeData: {},
      timeDay: [],
    };
  },
  computed: {
    url() {
      return `https://www.kanman.com/api/updatelist?page=${this.page}&pageSize=${this.pageSize}&date=${this.currentDate}`;
      //https://www.kanman.com/api/updatelist?page=1&pageSize=12&date=2022-10-1
    },
  },
  created() {
    this.time = new Date();
    this.fullYear = this.time.getFullYear();
    this.month = this.time.getMonth() + 1;
    this.date = this.time.getDate();
    this.currentDate = this.fullYear + "-" + this.month + "-" + this.date;
    this.getUpdateListData();
    this.getTimeData();
  },
  methods: {
    getUpdateListData() {
      this.$axios.get(this.url).then(({ data }) => {
        this.listData = data.data.list;
      });
    },
    getTimeData() {
      let num = 5;
      let today = new Date().getDay();
      this.timeDay.push({
        date: "今天",
        dateId: today,
        status: true,
      });
      this.timeDay.push({
        date: "昨天",
        dateId: today - 1,
        status: false,
      });
      let beforeYestoday = today - 2;
      for (let i = 0; i < num; i++) {
        let num = beforeYestoday - i;
        num = num <= 0 ? num + 7 : num;
        let dayStr = this.weekday(num);
        this.timeDay.push({
          date: dayStr,
          dateId: beforeYestoday - i,
          status: false,
        });
      }
      this.timeDay = this.timeDay.reverse();
    },
    weekday(num) {
      switch (num) {
        case 1:
          return "周一";
        case 2:
          return "周二";
        case 3:
          return "周三";
        case 4:
          return "周四";
        case 5:
          return "周五";
        case 6:
          return "周六";
        case 7:
          return "周日";
        default:
          break;
      }
    },
    dateActive(i) {
      for (const key in this.timeDay) {
        this.timeDay[key].status = false;
        if (i == this.timeDay[key].dateId) {
          this.timeDay[key].status = true;
          this.currentDate =
            this.fullYear +
            "-" +
            this.month +
            "-" +
            (2 + this.timeDay[key].dateId);
          this.getUpdateListData();
        }
      }
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
.update-container {
  .head {
    width: 100%;
    padding: 10px 0;
    background-color: #00adf1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .date {
      color: #fff;
      font-size: 14px;
    }
    .date-active {
      padding: 5px 8px;
      border-radius: 10px;
      color: #00adf1;
      background-color: #fff;
    }
  }
  .update-list {
    width: 90%;
    height: calc(100vh - 209px);
    margin: 10px auto;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .items {
      width: 31%;
      img {
        width: 100%;
      }
      span {
        font-size: 12px;
        display: block;
        padding: 5px 3px 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &::-webkit-scrollbar{
      width: 0;
      height: 0;
    }
  }
}
</style>