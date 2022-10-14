<template>
  <div class="read-container">
    <!-- <div class="name">{{ nowCatalogName }}</div> -->
    <ul class="comic-content" ref="comicContent" @click="showTools">
      <li class="content-item" v-for="i in contentList" :key="i">
        <img :src="i" />
      </li>
    </ul>
    <div class="chapter-name">{{ nowCatalogName }}</div>
    <ReadTools
      v-show="show"
      :catalogList="catalogList"
      :nowCatalogId="nowCatalogId"
      :initTools="initTools"
      @newChapter="changeChapter"
    ></ReadTools>
  </div>
</template>
<script>
import { debounce } from "lodash-es";
import ReadTools from "@/components/ReadTools";
export default {
  name: "readView",
  components: {
    ReadTools,
  },
  data() {
    return {
      id: null,
      comicName: null,
      catalogList: [],
      orderNum: null,
      nowCatalogId: null,
      nowCatalogName: null,
      contentList: [],
      scrollList: [0],
      show: false,
      initTools: true,
      comicData: {},
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.nowCatalogId = this.$route.query.chapterId;
    this.getComicData();
    this.handleScroll = debounce(this.handleScroll, 1000);
  },
  mounted() {
    this.$refs.comicContent.addEventListener("scroll", this.handleScroll, true);
  },
  computed: {
    catalogURL() {
      return `https://www.kanman.com/api/getchapterlist?comic_id=${this.id}`;
    },
    contentURL() {
      return `https://www.kanman.com/api/getchapterinfov2?comic_id=${this.id}&chapter_newid=${this.nowCatalogId}&quality=middle`;
    },
  },
  watch: {
    catalogURL() {
      this.$axios.get(this.catalogURL).then(({ data }) => {
        this.catalogList = data.data.reverse();
        this.initComicData();
      });
    },
    contentURL() {
      if (!this.nowCatalogId) {
        return false;
      }
      this.$axios.get(this.contentURL).then(({ data }) => {
        this.contentList = [
          ...this.contentList,
          ...data.data.current_chapter.chapter_img_list,
        ];
        this.$refs.comicContent.addEventListener(
          "scroll",
          this.handleScroll,
          true
        );
      });
    },
    // orderNum() {
    //   this.nowCatalogId = this.catalogList[this.orderNum - 1].chapter_newid;
    // },
  },
  methods: {
    getComicData() {
      this.$axios
        .get(
          `https://www.kanman.com/api/getComicInfoAttribute?comic_id=${this.id}`
        )
        .then(({ data }) => {
          this.comicData = data.data;
          this.comicName = data.data.comic_name;
        });
    },
    initComicData() {
      for (let index = 0; index < this.catalogList.length; index++) {
        if (this.catalogList[index].chapter_newid == this.nowCatalogId) {
          this.orderNum = this.catalogList[index].order_num;
          break;
        }
      }
      this.nowCatalogName = this.catalogList[this.orderNum - 1].chapter_name;
    },
    handleScroll() {
      this.show = false;
      let contentH = this.$refs.comicContent.scrollHeight;
      let scrollH = this.$refs.comicContent.scrollTop;
      let viewH = document.documentElement.clientHeight;
      for (let i = this.scrollList.length - 1; i >= 0; i--) {
        if (scrollH > this.scrollList[i]) {
          this.nowCatalogName =
            this.catalogList[
              this.orderNum - 1 - (this.scrollList.length - 1 - i)
            ].chapter_name;
          break;
        }
      }
      if (contentH - scrollH >= viewH - 10) {
        this.scrollList.push(contentH);
        this.orderNum++;
        this.changeChapterId();
        this.$refs.comicContent.removeEventListener(
          "scroll",
          this.handleScroll
        );
      }
    },
    changeChapterId() {
      if (!this.catalogList[this.orderNum - 1].chapter_newid) {
        return false;
      }
      this.nowCatalogId = this.catalogList[this.orderNum - 1].chapter_newid;
    },
    changeChapter(newChapterId) {
      this.orderNum = null;
      this.nowCatalogId = newChapterId;
      this.nowCatalogName = null;
      this.contentList = [];
      this.scrollList = [0];
      this.initComicData();
    },
    showTools() {
      this.show = !this.show;
      this.initTools = !this.initTools;
    },
  },
  beforeDestroy() {
    let bookcase = JSON.parse(localStorage.getItem("bookcase")) || [];
    let hasBook = false;
    let index = null;
    bookcase.forEach((e, i) => {
      if (e.bookId == this.id) {
        hasBook = true;
        index = i;
      }
    });
    if (hasBook) {
      bookcase[index].hisChapter = this.nowCatalogId;
      bookcase[index].hisChapterName = this.nowCatalogName;
    } else {
      bookcase.push({
        bookId: this.id,
        hisChapter: this.nowCatalogId,
        hisChapterName: this.nowCatalogName,
        name: this.comicName,
      });
    }
    localStorage.setItem("bookcase", JSON.stringify(bookcase));
    this.$refs.comicContent.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="scss">
.read-container {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 998;
  background-color: black;
  color: white;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .chapter-name {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 0 5px;
    font-size: 10px;
    color: white;
  }
}
.comic-content {
  height: 100%;
  overflow: auto;
  .content-item {
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
}
</style>