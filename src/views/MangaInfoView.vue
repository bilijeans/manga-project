<template>
  <div
    class="comic-info"
    :style="{
      backgroundImage: 'url(' + img + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <header>
      <i class="back wd-icon-thin-arrow-left" @click="back()"></i>
      <div class="title">{{mangaData.comic_name}}</div>
    </header>
    <main>
      <div class="manga-item">
        <img :src="'https://image.yqmh.com/mh/' + id + '.jpg'" />
        <div class="info">
          <div class="info-name">{{ mangaData.comic_name }}</div>
          <div class="info-author">作者：{{ author }}</div>
          <div class="score">评分：{{ score }}</div>
        </div>
      </div>
      <div class="card">
        <div class="card-nav">
          <div
            :class="['details', { active: choose == 'details' }]"
            @click="choose = 'details'"
          >
            详情
          </div>
          <div
            :class="['catalog', { active: choose == 'catalog' }]"
            @click="choose = 'catalog'"
          >
            目录
          </div>
        </div>
        <div class="card-container">
          <div v-if="choose == 'details'" class="detail-con">
            <div class="style">类型：{{ styleStr }}</div>
            <div class="update">更新至：{{ mangaData.last_chapter_name }}</div>
            <div class="desc">
              简介：<span>{{ mangaData.comic_desc }}</span>
            </div>
          </div>
          <div v-else>
            <ul class="catalog-list">
              <li
                v-for="i in catalogList"
                :key="i.chapterId"
                class="catalog-item"
                @click="readByCatalog(i.chapter_newid)"
              >
                <!-- <span class="catalog-time">{{ i.publishTime }}</span -->
                <span class="catalog-name">{{ i.chapter_name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="add" v-if="!hasBook" @click="addToBookcase()">加入书架</div>
      <div class="add" v-else @click="removeToBookcase()">移出书架</div>
      <div class="read" @click="readStart()">立即阅读</div>
    </footer>
  </div>
</template>
<script>
import router from "@/router";
export default {
  data() {
    return {
      id: null,
      author: null,
      mangaData: {},
      style: [],
      choose: "details",
      catalogList: [],
      chapter_newid: null,
      bookcase: [],
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.author = this.$route.query.author;
    this.bookcase = JSON.parse(localStorage.getItem("bookcase")) || [];

  },
  computed: {
    img() {
      return "https://image.yqmh.com/mh/" + this.id + ".jpg";
    },
    url() {
      return `https://www.kanman.com/api/getComicInfoAttribute?comic_id=${this.id}`;
    },
    styleStr() {
      let str = "";
      this.style.forEach((e) => {
        str += e.name + " | ";
      });
      str = str.slice(0, str.length - 2);
      return str;
    },
    score() {
      return parseInt(this.mangaData.score) / 10;
    },
    catalogURL() {
      return `https://www.kanman.com/api/getchapterlist?comic_id=${this.id}`;
    },
    hasBook(){
      let flag = false
      this.bookcase.forEach(e=>{
        if(e.bookId==this.id){
          flag = true
        }
      })
      return flag
    }
  },
  watch: {
    url() {
      this.chapter_newid = null;
      this.$axios.get(this.url).then(({ data }) => {
        this.mangaData = data.data;
        this.dealWithStyle(this.mangaData.cartoon_type_list);
        this.chapter_newid = this.mangaData.first_chapter_newid;
      });
    },
    catalogURL() {
      this.getCatalogList();
    },
  },
  methods: {
    back() {
      router.go(-1);
    },
    dealWithStyle(data) {
      this.style = data;
    },
    getCatalogList() {
      this.$axios.get(this.catalogURL).then(({ data }) => {
        this.catalogList = data.data;
        this.catalogList = this.catalogList.reverse();
      });
    },
    readStart() {
      this.$router.push({
        path: "/read",
        query: {
          id: this.id,
          chapterId: this.catalogList[0].chapter_newid,
        },
      });
    },
    readByCatalog(chapterId) {
      this.$router.push({
        path: "/read",
        query: {
          id: this.id,
          chapterId: chapterId,
        },
      });
    },
    addToBookcase() {
      /*
        {
          bookId:num
          hisChapter:num
        }
      */
      // this.hasBook = true;
      // let bookcase = JSON.parse(localStorage.getItem("bookcase")) || [];
      this.bookcase.push({
        bookId: this.id,
        hisChapter: this.mangaData.first_chapter_newid,
        hisChapterName:this.mangaData.first_chapter_name,
        name:this.mangaData.comic_name
      });

      localStorage.setItem("bookcase", JSON.stringify(this.bookcase));
    },
    removeToBookcase() {
      // this.hasBook = false;
      this.bookcase = this.bookcase.filter((e) => {
        return e.bookId != this.id;
      });
      localStorage.setItem("bookcase", JSON.stringify(this.bookcase));
    },
  },
};
</script>
<style lang="scss">
.comic-info {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  footer {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 55px;
    align-content: center;
    line-height: 55px;
    text-align: center;
    div {
      flex: 1;
    }
    .add {
      border-top: 1px solid #ccc;
    }
    .read {
      background-color: rgb(0, 166, 255);
      color: white;
      font-weight: bold;
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    z-index: -1;
  }
  header {
    width: 100%;
    height: 50px;
    background-color: rgb(0, 166, 255);
    line-height: 50px;
    .back {
      position: absolute;
      left: 10px;
      font-size: 20px;
      color: white;
    }
    .title{
      text-align: center;
      color: #fff;
      font-size: 17px;
    }
  }
}
.manga-item {
  display: flex;
  width: 90%;
  margin: 20px auto;
  img {
    display: block;
    width: 100px;
    border-radius: 10px;
  }
  .info {
    margin-left: 20px;
    color: white;
    .info-name {
      margin-top: 10px;
      font-size: 16px;
      font-weight: bold;
      padding: 20px 0;
    }
    .info-author {
      font-size: 12px;
    }
    .score {
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
.card {
  width: 100vw;
  height: calc(100vh - 50px);
  background-color: rgb(255, 255, 255);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: 20px;
  .card-nav {
    display: flex;
    justify-content: space-evenly;
    color: #aaa;
    div {
      padding: 20px 10px;
    }
    .active {
      position: relative;
      padding-top: 16px;
      font-size: 20px;
      color: #000;
      &::after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 10px;
        margin: 0 auto;
        width: 22px;
        background-color: #00adf1;
        height: 4px;
        border-radius: 2px;
      }
    }
  }
  .card-container {
    width: 90%;
    margin: 0 auto;
    font-size: 14px;
    .detail-con {
      div {
        margin-top: 15px;
        span {
          display: inline-block;
          width: 80%;
          color: #aaa;
          font-size: 13px;
          line-height: 18px;
        }
      }
    }
    .desc {
      display: flex;
    }
    .catalog-list {
      width: 100%;
      height: calc(100vh - 335px);
      overflow: auto;
      .catalog-item {
        padding: 20px 0;
        .catalog-time {
          margin-right: 10px;
        }
      }
      &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }
    }
  }
}
</style>