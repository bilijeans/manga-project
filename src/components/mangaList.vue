<template>
  <div class="container">
    <ul class="rank-items">
      <li
        class="item"
        v-for="(i, index) in mangaListData.list"
        :key="index"
        :to="'/info/' + i.comic_id"
        @click="turnRoute(i, i.comic_id, i.author_name)"
      >
        <img :src="'https://image.yqmh.com/mh/' + i.comic_id + '.jpg'" />
        <div class="info">
          <div class="name">{{ i.comic_name }}</div>
          <div class="type" v-if="i.cartoon_type_list">
            <div
              class="type-item"
              v-for="(item, index) in i.cartoon_type_list"
              :key="index"
            >
              {{ item.name }}
            </div>
          </div>
          <div
            class="new"
            v-if="i.last_chapter_name || i.latest_cartoon_topic_name"
          >
            {{ i.last_chapter_name || i.latest_cartoon_topic_name }}
          </div>
          <div class="rate"></div>
          <div
            class="author"
            v-if="i.comic_author || i.cartoon_author_list_name"
          >
            {{i.comic_author || i.cartoon_author_list_name }}
          </div>
          <div class="desc" v-if="i.cartoon_desc || i.comic_feature">
            {{
              (i.comic_shortdesc ? i.comic_shortdesc : i.comic_feature) ||
              i.cartoon_desc
            }}
          </div>
        </div>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
/*
  mangaListData:{
    list:Array,
    totalNum:Number
  }
*/
export default {
  props: { mangaListData: Object },
  methods: {
    turnRoute(i, num, str) {
      console.log(this.mangaListData);
      this.$router.push({
        path: "/info",
        query: {
          id: num,
          author: str,
        },
      });
    },
    typeList(arr) {
      console.log(arr);
    },
  },
};
</script>
<style lang="scss">
.rank-items {
  padding: 0 20px;
  .item {
    display: flex;
    padding: 10px 0px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.5);
    img {
      display: block;
      width: 30%;
      height: auto;
    }
  }
  .item:last-child {
    border: 0px;
  }
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  &::after {
    display: block;
    content: "T_T ???????????????";
    text-align: center;
    font-size: 12px;
    color: #666;
    margin-bottom: 20px;
  }
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // width: 60%;
  margin-left: 10px;
  .name {
    font-size: 16px;
    font-weight: bold;
  }
  .type {
    display: flex;
    // flex-wrap: wrap;
    // width: 90%;
    overflow: auto;
    &::-webkit-scrollbar{
      width: 0;
    }
    .type-item {
      width: 26px;
      font-size: 12px;
      margin-top: 10px;
      margin-right: 5px;
      padding: 5px;
      border-radius: 20px;
      background-color: rgba(204, 204, 204, 0.5);
      text-align: center;
      color: #666;
    }
  }
  .author {
    margin-top: 10px;
    font-size: 12px;
  }
  .new {
    margin-top: 10px;
    font-size: 12px;
  }
  .desc {
    height: 36px;
    line-height: 18px;
    margin-top: 10px;
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #aaa;
  }
}
</style>