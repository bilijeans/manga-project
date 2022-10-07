<template>
  <div class="container">
    <ul class="rank-items">
      <li
        class="item"
        v-for="i in mangaListData.list"
        :key="i.comic_id"
        :to="'/info/' + i.comic_id"
        @click="turnRoute(i,i.comic_id,i.author_name)"
      >
        <img :src="'https://image.yqmh.com/mh/' + i.comic_id + '.jpg'" />
        <div class="info">
          <div class="name">{{ i.comic_name }}</div>
          <div class="type" v-if="i.cartoon_type_list">{{ i.cartoon_type_list[0].name }}</div>
          <div class="author" v-if="i.author_name">{{ i.author_name }}</div>
          <div class="desc">
            {{ i.comic_shortdesc ? i.comic_shortdesc : i.comic_feature }}
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
    turnRoute(i,num,str) {
      console.log(i);
      this.$router.push({ path: "/info", query: {
        id:num,author:str,
      } });
    },
  },
};
</script>
<style lang="scss">
.rank-items {
  .item {
    display: flex;
    padding: 10px 0px;
    border-bottom: 1px solid #ccc;
    img {
      display: block;
      width: 25%;
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
    content: "T_T 没有更多了";
    text-align: center;
    font-size: 12px;
    color: #666;
    margin-bottom: 20px;
  }
}
.info {
  margin-left: 10px;
  .name {
    font-size: 16px;
    font-weight: bold;
  }
  .type {
    width: 26px;
    font-size: 12px;
    margin-top: 10px;
    padding: 5px;
    border-radius: 20px;
    background-color: rgba(204, 204, 204, 0.5);
    text-align: center;
    color: #666;
  }
  .author {
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