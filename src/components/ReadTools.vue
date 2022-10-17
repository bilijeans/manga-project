<template>
  <div class="read-tools">
    <div class="read-head">
      <i @click="back()" class="back wd-icon-thin-arrow-left"></i>
      <div class="title">{{ title }}</div>
      <div class="btn-book" @click="turnToBookInfo">详情</div>
    </div>
    <div class="bottom-tools" v-if="show">
      <div class="prev-chapter" @click="prevChapter()">上一章</div>
      <div class="chapter-list" @click="showChapterList()">目录</div>
      <div class="next-chapter" @click="nextChapter()">下一章</div>
    </div>
    <div class="chapter-container" v-else>
      <div class="title">目录</div>
      <ul class="chapter-page">
        <li
          class="chapter-item"
          v-for="i in catalogList"
          :key="i.order_num"
          @click="changeChapter(i.chapter_newid)"
        >
          {{ i.chapter_name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    catalogList: Array,
    nowCatalogId: String,
    initTools: Boolean,
    title: String,
    bookId: String,
    author:String
  },
  data() {
    return {
      show: true,
    };
  },
  watch: {
    initTools() {
      if (this.initTools) {
        this.show = true;
      }
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
      this.$router.go(0);
    },
    showChapterList() {
      this.show = false;
    },
    changeChapter(chapter_newid) {
      this.show = true;
      this.$emit("newChapter", chapter_newid);
    },
    prevChapter() {
      let chapter_newid = null;
      for (let i = 0; i < this.catalogList.length; i++) {
        if (this.catalogList[i].chapter_newid == this.nowCatalogId) {
          if (i == 0) {
            return false;
          }
          chapter_newid = this.catalogList[i - 1].chapter_newid;
          break;
        }
      }
      this.$emit("newChapter", chapter_newid);
    },
    nextChapter() {
      let chapter_newid = null;
      for (let i = 0; i < this.catalogList.length; i++) {
        if (this.catalogList[i].chapter_newid == this.nowCatalogId) {
          if (i == this.catalogList.length - 1) {
            return false;
          }
          chapter_newid = this.catalogList[i + 1].chapter_newid;
          break;
        }
      }
      this.$emit("newChapter", chapter_newid);
    },
    turnToBookInfo() {
      this.$router.push({
        path: "/info",
        query: {
          id: this.bookId,
          author: this.author,
        },
      });
    },
  },
};
</script>
<style lang="scss">
.read-tools {
  position: fixed;
  top: 0;
  z-index: 999;
  .read-head {
    position: relative;
    width: 100vw;
    height: 30px;
    padding: 10px 0;
    line-height: 30px;
    background-color: rgba(0, 0, 0, 0.6);
    .back {
      position: absolute;
      padding-left: 10px;
      font-size: 20px;
      font-weight: lighter;
      color: white;
    }
    .title {
      text-align: center;
    }
    .btn-book {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  .bottom-tools {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .chapter-page {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 164px;
    overflow: auto;
    .chapter-item {
      width: 25%;
      padding: 5px 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 10px;
      font-size: 14px;
      border: 1px solid white;
      text-align: center;
    }
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
}
.chapter-container {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.6);
  .title {
    padding: 10px;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.8);
  }
}
</style>