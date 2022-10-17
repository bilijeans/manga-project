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
      <div class="title">{{ mangaData.comic_name }}</div>
      <div class="home" @click="turnToHome">
        <svg
          class="icon"
          width="16px"
          height="16.00px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M568.064 841.1648H438.6304c-11.3152 0-20.48-9.1648-20.48-20.48v-164.0448c0-46.9504 38.1952-85.1968 85.1968-85.1968 46.9504 0 85.1968 38.1952 85.1968 85.1968v164.0448c0 11.3152-9.1648 20.48-20.48 20.48z m-108.9536-40.96h88.4736v-143.5648c0-24.3712-19.8656-44.2368-44.2368-44.2368-24.3712 0-44.2368 19.8656-44.2368 44.2368v143.5648z"
          />
          <path
            d="M791.6544 915.968H210.9952c-28.5696 0-51.8656-23.2448-51.8656-51.8656v-314.5216h-14.336c-21.2992 0-40.1408-12.7488-48.128-32.512-7.936-19.7632-3.1744-42.0352 12.1856-56.7296l358.5536-344.2176a51.69664 51.69664 0 0 1 71.8336 0l358.5536 344.2176c15.36 14.7456 20.1216 37.0176 12.1856 56.7296a51.6096 51.6096 0 0 1-48.128 32.512h-18.3296v314.5216c0 28.5696-23.2448 51.8656-51.8656 51.8656zM503.3472 142.592c-2.7136 0-5.4272 1.024-7.5264 3.0208L137.2672 489.8304c-4.8128 4.608-3.3792 9.8816-2.56 11.9296s3.4816 6.8096 10.0864 6.8096h34.816c11.3152 0 20.48 9.1648 20.48 20.48v335.0016c0 5.9904 4.864 10.9056 10.9056 10.9056h580.6592c5.9904 0 10.9056-4.864 10.9056-10.9056v-335.0016c0-11.3152 9.1648-20.48 20.48-20.48h38.8096c6.656 0 9.2672-4.7616 10.0864-6.8096 0.8192-2.048 2.2016-7.3216-2.56-11.9296L510.8736 145.6128c-2.0992-1.9968-4.8128-3.0208-7.5264-3.0208z"
          />
        </svg>
      </div>
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
            <div class="catalog-head" @click="changeCatalogPlain">
              {{ plain ? "倒序" : "正序" }}
            </div>
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
      <div class="read" v-if="!hasHisRead" @click="readStart()">立即阅读</div>
      <div class="read" v-else @click="readByCatalog(hisChapter)">继续阅读</div>
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
      plain: true,
      hasHisRead: false,
      hisChapter: null,
    };
  },
  created() {
    this.hisChapter = null;
    this.id = this.$route.query.id;
    this.author = this.$route.query.author;
    this.bookcase = JSON.parse(localStorage.getItem("bookcase")) || [];
    this.hasHis();
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
    hasBook() {
      let flag = false;
      this.bookcase.forEach((e) => {
        if (e.bookId == this.id) {
          flag = true;
          this.hisChapter = e.hisChapter;
        }
      });
      return flag;
    },
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
          author: this.author,
        },
      });
    },
    readByCatalog(chapterId) {
      console.log(chapterId);
      this.$router.push({
        path: "/read",
        query: {
          id: this.id,
          chapterId: chapterId,
          author: this.author,
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
      console.log(this.mangaData);
      this.bookcase.push({
        bookId: this.id,
        hisChapter: this.mangaData.first_chapter_newid,
        hisChapterName: this.mangaData.first_chapter_name,
        newChapterName: this.mangaData.last_chapter_name,
        name: this.mangaData.comic_name,
        desc: this.mangaData.comic_desc,
        author: this.author,
      });

      localStorage.setItem("bookcase", JSON.stringify(this.bookcase));
    },
    removeToBookcase() {
      // this.hasBook = false;
      this.bookcase = this.bookcase.filter((e) => {
        return e.bookId != this.id;
      });
      localStorage.setItem("bookcase", JSON.stringify(this.bookcase));
      this.hasHisRead = false;
    },
    changeCatalogPlain() {
      this.plain = !this.plain;
      this.catalogList = this.catalogList.reverse();
    },
    hasHis() {
      this.bookcase.forEach((e) => {
        if (e.bookId == this.id) {
          this.hasHisRead = true;
          this.hisChapter = e.hisChapter;
        }
      });
    },
    turnToHome(){
      this.$router.push({
        path:'/home'
      })
    }
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
    .title {
      text-align: center;
      color: #fff;
      font-size: 17px;
    }
    .home {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 30px;
      height: 30px;
      border-radius: 999px;
      // border: 1px solid black;
      background-color: #fff;
      svg {
        width: 28px;
        height: 28px;
        transform: translate(1px, -3px);
        fill: #00adf1;
      }
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
    position: relative;
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
    .catalog-head {
      position: absolute;
      top: 0px;
      right: 10px;
      color: #00adf1;
      font-size: 16px;
    }
    & > div {
      padding-top: 20px;
    }
    .catalog-list {
      width: 100%;
      height: calc(100vh - 355px);
      overflow: auto;
      .catalog-item {
        padding: 15px 0;
        font-size: 16px;
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