<template>
  <div class="bg">
    <div class="mask" v-show="show" @click="isShowMore"></div>
    <header>
      <i class="wd-icon-search search" @click="turnToSearch"> </i>
      <div class="title" style="font-size:18px;">书架</div>
      <div
        class="wd-icon-more more"
        @click.stop="isShowMore"
        v-show="!bookSwitch"
      >
        <div class="moreList" v-show="show">
          <ul>
            <li>
              <svg
                t="1664874612755"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2515"
                width="30"
                height="30"
              >
                <path
                  d="M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z"
                  p-id="2516"
                ></path>
                <path
                  d="M400.807037 542.518061c-0.588401-0.224104-1.233084-0.364297-1.876744-0.364297L197.800483 542.153764c-44.358277 0-80.713276 35.83516-81.231069 79.999009-0.026606 0.195451-0.026606 0.363274-0.026606 0.561795l0 189.938933c0 2.550079 0.432859 5.158487 1.176802 7.264451 6.688329 39.057551 40.33566 67.432809 80.080873 67.432809L398.92927 887.35076c0.588401 0 1.12052-0.11154 1.653663-0.336668 37.179784-2.863211 67.295686-30.312376 73.294306-66.283636 1.011027-2.7486 1.458211-5.499248 1.458211-8.131191l0-189.884698c0-0.197498 0-0.36532 0-0.534166C474.833007 580.541049 442.362478 545.94102 400.807037 542.518061M425.259962 627.142413l0 175.219697c0 19.346627-15.787568 35.051307-35.219129 35.051307L208.764186 837.413418c-0.335644-0.059352-0.715291-0.059352-1.066285 0l-5.872754 0c-19.390629 0-35.177174-15.70468-35.177174-35.051307L166.647973 627.142413c0-19.292392 15.786545-35.020608 35.177174-35.020608l188.214662 0C409.472394 592.121805 425.259962 607.850022 425.259962 627.142413"
                  p-id="2517"
                ></path>
                <path
                  d="M892.595716 191.294814c-0.476861-41.625026-32.973996-76.227102-74.501808-79.646991-0.61603-0.223081-1.234107-0.363274-1.904373-0.363274L636.370077 111.284549c-44.556798 0-81.035618 36.114522-81.260745 80.556711l0 189.94098c0 2.636037 0.449231 5.341658 1.179872 7.262404 6.67298 39.046295 40.289612 67.421552 80.080873 67.421552l179.819458 0c0.588401 0 1.121544-0.11154 1.65264-0.322341 37.154201-2.873444 67.323315-30.325679 73.351612-66.300009 0.953721-2.691295 1.401929-5.426593 1.401929-8.118911l0-189.884698C892.595716 191.644785 892.595716 191.475939 892.595716 191.294814M842.516134 196.270129l0 175.206394c0 19.348674-15.785521 35.049261-35.160801 35.049261L640.349715 406.525784c-19.374256 0-35.160801-15.70161-35.160801-35.049261L605.188914 196.270129c0-19.303648 15.787568-35.034934 35.160801-35.034934l167.005618 0C826.730613 161.235195 842.516134 176.966481 842.516134 196.270129"
                  p-id="2518"
                ></path>
                <path
                  d="M818.093908 542.518061c-0.61603-0.224104-1.234107-0.364297-1.904373-0.364297L636.370077 542.153764c-44.556798 0-81.035618 36.116569-81.260745 80.560804l0 189.938933c0 2.636037 0.449231 5.353938 1.179872 7.264451 6.67298 39.057551 40.289612 67.432809 80.080873 67.432809l179.819458 0c0.588401 0 1.121544-0.11154 1.65264-0.336668 37.154201-2.863211 67.323315-30.312376 73.351612-66.283636 0.953721-2.693342 1.401929-5.439896 1.401929-8.131191l0-189.884698c0-0.197498 0-0.36532 0-0.534166C892.118855 580.541049 859.62172 545.94102 818.093908 542.518061M842.516134 627.142413l0 175.219697c0 19.346627-15.785521 35.051307-35.160801 35.051307L640.349715 837.413418c-19.374256 0-35.160801-15.70468-35.160801-35.051307L605.188914 627.142413c0-19.292392 15.787568-34.991955 35.160801-34.991955l167.005618 0C826.730613 592.149435 842.516134 607.850022 842.516134 627.142413"
                  p-id="2519"
                ></path>
                <path
                  d="M400.807037 111.646799c-0.588401-0.223081-1.233084-0.363274-1.876744-0.363274L197.800483 111.283526c-44.358277 0-80.713276 35.83516-81.231069 79.983659-0.026606 0.209778-0.026606 0.3776-0.026606 0.573051l0 189.94098c0 2.553149 0.432859 5.160533 1.176802 7.262404 6.688329 39.046295 40.33566 67.421552 80.080873 67.421552L398.92927 456.465173c0.588401 0 1.12052-0.11154 1.653663-0.322341 37.179784-2.873444 67.295686-30.325679 73.294306-66.300009 1.011027-2.803859 1.458211-5.454222 1.458211-8.118911l0-189.884698c0-0.195451 0-0.363274 0-0.545422C474.833007 149.669788 442.362478 115.067712 400.807037 111.646799M425.259962 196.270129l0 175.206394c0 19.348674-15.787568 35.049261-35.219129 35.049261L201.825147 406.525784c-19.390629 0-35.177174-15.70161-35.177174-35.049261L166.647973 196.270129c0-19.303648 15.786545-35.034934 35.177174-35.034934l188.214662 0C409.472394 161.235195 425.259962 176.966481 425.259962 196.270129"
                  p-id="2520"
                ></path>
              </svg>
              <span @click="model = !model">切换模式</span>
            </li>
            <li>
              <svg
                t="1664874960322"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5109"
                width="30"
                height="30"
              >
                <path
                  d="M921.735 733.468v38.168s2.076 19.328-38.168 57.252c-47.984 45.662-549.786 61.141-648.851 0C135.652 767.744 101.13 542.63 101.13 542.63v-38.17H62.962v57.252s44.053 243.426 171.755 305.341c168.718 56.5 475.487 54.952 648.851 0 62.688-22.445 76.335-95.417 76.335-95.417v-38.168h-38.168z m-142.786 17.733c21.006 36.553 67.667 49.156 104.221 28.149 36.551-21.006 49.154-67.667 28.149-104.219l-152.14-264.739c-21.007-36.553-67.669-49.154-104.221-28.151-36.553 21.007-49.156 67.667-28.149 104.221l152.14 264.739z m-95.465-319.319c18.275-10.504 41.607-4.202 52.11 14.072l142.631 248.193c10.504 18.277 4.202 41.607-14.074 52.11-18.277 10.504-41.607 4.202-52.11-14.076L669.41 483.989c-10.504-18.275-4.202-41.607 14.074-52.107zM497.098 761.59c7.544 41.479 47.286 68.986 88.763 61.442 41.479-7.546 68.988-47.284 61.442-88.765l-102.455-563.27c-7.544-41.479-47.284-68.988-88.763-61.442-41.479 7.544-68.988 47.286-61.442 88.763L497.098 761.59z m-30.769-595.71c20.74-3.771 40.61 9.983 44.383 30.721L609.754 741.1c3.771 20.738-9.983 40.609-30.721 44.381-20.74 3.773-40.61-9.981-44.383-30.721l-99.041-544.496c-3.772-20.739 9.982-40.611 30.72-44.384zM311.05 809.801c42.16 0 76.337-34.177 76.337-76.333V160.951c0-42.158-34.177-76.335-76.337-76.335-42.158 0-76.333 34.177-76.333 76.335v572.517c-0.001 42.156 34.175 76.333 76.333 76.333z m-38.166-629.766c0-21.08 17.088-38.166 38.166-38.166 21.08 0 38.17 17.086 38.17 38.166v553.433c0 21.078-17.09 38.168-38.17 38.168-21.078 0-38.166-17.09-38.166-38.168V180.035z"
                  p-id="5110"
                ></path>
              </svg>
              <span @click="deleteBook">书架管理</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="turn-off" v-show="bookSwitch" @click="initHead">关闭</div>
    </header>
    <main class="list-view" v-if="model">
      <div
        class="comicItem"
        v-for="i in bookcase"
        :key="i.bookId"
        @click="turnToRead(i.bookId, i.hisChapter)"
      >
        <div class="comicItemImg">
          <img :src="`https://image.yqmh.com/mh/${i.bookId}.jpg`" />
        </div>
        <div class="comicItemText">
          <p class="title">{{ i.name }}</p>
          <p>
            <span>上次看至：</span>
            <span>{{ i.hisChapterName }}</span>
          </p>
          <p>
            <span>最新章节：{{ i.newChapterName }}</span>
          </p>
        </div>
        <div class="delete" v-show="bookSwitch" @click="removeBook(i.bookId)">
          <i class="wd-icon-close-outline"></i>
        </div>
      </div>
    </main>
    <main class="card-view" v-else>
      <div
        class="comic-card"
        v-for="i in bookcase"
        :key="i.bookId"
        @click="turnToRead(i.bookId, i.hisChapter)"
      >
        <img :src="`https://image.yqmh.com/mh/${i.bookId}.jpg`" />
        <span>{{ i.name }}</span>
        <div class="delete" v-show="bookSwitch" @click="removeBook(i.bookId)">
          <i class="wd-icon-close-outline"></i>
        </div>
      </div>
      <div class="comic-card"></div>
      <div class="comic-card"></div>
    </main>
  </div>
</template>


<script>
export default {
  data() {
    return {
      show: false,
      bookcase: [],
      bookSwitch: false,
      deleteBtn: false,
      model: null,
      config: null,
    };
  },
  created() {
    this.bookcase = JSON.parse(localStorage.getItem("bookcase")) || [];
    this.config = JSON.parse(localStorage.getItem("config")) || {};
    console.log(this.config);
    this.model = this.config.model
  },
  methods: {
    isShowMore() {
      this.show = !this.show;
    },
    async getLastChapter(id) {
      let { data } = await this.$axios.get(
        `https://www.kanman.com/api/getComicInfoAttribute?comic_id=${id}`
      );
      return data.data.last_chapter_name;
    },
    turnToRead(id, newId) {
      this.$router.push({
        path: "/read",
        query: {
          id: id,
          chapterId: newId,
        },
      });
    },
    deleteBook() {
      this.show = true;
      this.bookSwitch = true;
      this.deleteBtn = true;
    },
    initHead() {
      this.bookSwitch = false;
      this.deleteBtn = false;
    },
    removeBook(id) {
      console.log(id);
      this.bookcase = this.bookcase.filter((el) => {
        return el.bookId !== id;
      });
      localStorage.setItem("bookcase", JSON.stringify(this.bookcase));
    },
    turnToSearch() {
      this.$router.push({
        path: "/home/search",
      });
    },
  },
  beforeDestroy() {
    localStorage.setItem(
      "config",
      JSON.stringify({
        model: this.model,
      })
    );
  },
};
</script>


<style lang="scss">
.bg {
  position: relative;
  padding-top: 50px;
  .mask {
    height: 100vh;
    width: 100vw;
    background-color: rgb(0, 0, 0, 0.3);
    position: absolute;
    top: 0%;
    left: 0%;
    right: 0%;
    bottom: 0%;
    z-index: 100;
  }

  header {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 50px;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    background-color: #fff;
    z-index: 200;
    .search {
      position: absolute;
      left: 20px;
    }
    .more {
      position: absolute;
      right: 20px;
      top: 0;

      .moreList {
        width: 35vw;
        height: 80px;
        position: absolute;
        top: 45px;
        right: -20px;
        background-color: #fff;
        border-radius: 10px;
        z-index: 999;
        ul {
          width: 100%;
          height: 100%;
          li {
            margin-top: 5px;
            width: 100%;
            height: 30px;
            font-size: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .turn-off {
      position: absolute;
      top: 0;
      right: 20px;
      font-size: 16px;
      margin-right: 13px;
    }
  }

  main {
    height: calc(100vh - 106px);
    overflow: auto;
    padding: 0 20px;
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
    .comicItem {
      position: relative;
      width: 100%;
      height: 15vh;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .comicItemImg {
        height: 100%;
        width: 25%;
        img {
          width: 100%;
        }
      }

      .comicItemText {
        width: 75%;
        height: 100%;
        padding-left: 10px;

        p {
          margin-top: 15px;
          color: #aaa;
          font-size: 14px;
        }

        .title {
          color: #000;
          font-size: 18px;
          font-weight: 700;
        }
      }
      .delete {
        position: absolute;
        right: 0px;
        top: 10px;
        i {
          color: red;
        }
      }
    }
  }
  .card-view {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
    width: 90%;
    padding: 0;
    margin: 0 auto;
    .comic-card {
      position: relative;
      display: flex;
      flex-direction: column;
      // align-items: ;
      width: 30%;
      // height: 200px;
      padding-top: 10px;
      margin-bottom: 5px;
      img {
        display: block;
        width: 100%;
        height: auto;
      }
      span {
        margin-top: 5px;
        padding-left: 5px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .delete {
        position: absolute;
        right: -5px;
        top: 0px;
        background-color: #fff;
        border-radius: 999px;
        i {
          color: red;
        }
      }
    }
  }
}
</style>