<template>
  <div class="rank-container">
    <div class="rank-nav">
      <div class="style">
        <ul>
          <li
            v-for="i in rankNavStyleList"
            :key="i.value"
            @click="changeSort(i.value)"
            :ref="i.value"
            :class="{ active: i.value == 'all' }"
          >
            {{ i.name }}
          </li>
        </ul>
      </div>
      <ul class="time">
        <li
          v-for="i in rankNavTimeList"
          :key="i.value"
          @click="changeTime(i.value)"
          :ref="i.value"
          :class="{ active: i.value == 'day' }"
        >
          {{ i.name }}
        </li>
      </ul>
    </div>
    <div class="rank-list">
      <manga-list :mangaListData="rankList"></manga-list>
    </div>
  </div>
</template>

<script>
import MangaList from "@/components/mangaList.vue";
export default {
  data() {
    return {
      isalldata: 0,
      time_type: "week",
      sort_type: "all",
      rank_type: "heat",
      page: 1,
      pageSize: 100,
      lastStyleValue: "all",
      lastTimeValue: "day",
      rankNavStyleList: [
        {
          name: "综合榜",
          value: "all",
        },
        {
          name: "自制榜",
          value: "self",
        },
        {
          name: "少年榜",
          value: "boy",
        },
        {
          name: "少女榜",
          value: "girl",
        },
        {
          name: "新作榜",
          value: "new",
        },
        {
          name: "黑马榜",
          value: "dark",
        },
        {
          name: "付费榜",
          value: "charge",
        },
        {
          name: "免费榜",
          value: "free",
        },
        {
          name: "完结榜",
          value: "finish",
        },
        {
          name: "连载榜",
          value: "serialize",
        },
      ],
      rankNavTimeList: [
        {
          name: "日榜",
          value: "day",
        },
        {
          name: "周榜",
          value: "week",
        },
        {
          name: "月榜",
          value: "month",
        },
        {
          name: "总榜",
          value: "total",
        },
      ],
      rankList: {},
    };
  },
  components: {
    MangaList,
  },
  computed: {
    url() {
      return `https://www.kanman.com/api/getRankDataForWeb?isalldata=${this.isalldata}&time_type=${this.time_type}&sort_type=${this.sort_type}&rank_type=${this.rank_type}&page=${this.page}&pageSize=${this.pageSize}`;
    },
  },
  watch: {
    url() {
      this.getRankData();
    },
  },
  created() {
    this.getRankData();
  },
  methods: {
    changeSort(value) {
      this.sort_type = value;
      this.$refs[this.lastStyleValue][0].className = "";
      this.$refs[value][0].className = "active";
      this.lastStyleValue = value;
      console.log(this.$refs[value]);
    },
    changeTime(value) {
      this.time_type = value;
      this.$refs[this.lastTimeValue][0].className = "";
      this.$refs[value][0].className = "active";
      this.lastTimeValue = value;
    },
    getRankData() {
      console.log(this.url);
      this.$axios.get(this.url).then(({ data }) => {
        this.rankList = data.data;
      });
    },
  },
};
</script>
<style lang="scss">
.rank-nav {
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: auto;
  margin-top: 8px;
  .style {
    width: 90%;
    margin: 0 auto;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
  ul {
    width: 700px;
    display: flex;
    flex-wrap: nowrap;
    li {
      width: 50px;
      margin-right: 20px;
    }
  }
  .time {
    display: flex;
    width: 90%;
    // justify-content: space-between;
    margin: 0 auto;
  }
  .active {
    color: red;
  }
}
.rank-list {
  width: 90%;
  height: calc( 100vh - 190px);
  margin: 0 auto;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
</style>