<template>
  <div class="only-classify-page" ref="classifyPage">
    <header ref="header">
      <div class="classifySearch" @click="turnToSearchView">
        <i @click="back()" class="back wd-icon-thin-arrow-left"></i>
      </div>
      <div class="classifyComic">分类漫画</div>
    </header>

    <nav>
      <div
        class="navBox"
        v-for="(item, index) in classifyTitle"
        ref="navBox"
        :key="item.id"
      >
        <div
          class="arrow"
          @click="navMore(index)"
          v-if="index == 0 || index == 3"
        >
          >
        </div>
        <div
          :class="{ active: i.value == $data[item.type] }"
          class="classifyItem"
          v-for="i in item.content"
          :key="i.value"
          @click="showActive(item.type, i.value, i.name)"
        >
          {{ i.name }}
        </div>
      </div>
    </nav>

    <main ref="mangaList">
      <manga-list :mangaListData="finallyResult"></manga-list>
    </main>
  </div>
</template>


<script>
import { debounce } from "lodash-es";
import mangaList from "../components/mangaList.vue";
export default {
  components: { mangaList },

  data() {
    return {
      allComic: [],
      allComicSelect: [],
      selectResult: [],
      selectResultCut: [],
      finallyResult: {},
      title: "all",
      place: "all",
      isFin: "all",
      word: "all",
      show: 20,
      page: 1,
      titleIsActive: true,
      wordIsActive: true,
      classifyTitle: [
        {
          name: "题材",
          type: "title",
          id: "1",
          content: [
            {
              name: "全部",
              value: "all",
            },
            {
              name: "热血",
              value: "rexue",
            },
            {
              name: "机战",
              value: "jizhan",
            },
            {
              name: "运动",
              value: "yundong",
            },
            {
              name: "推理",
              value: "tuili",
            },
            {
              name: "冒险",
              value: "maoxian",
            },
            {
              name: "搞笑",
              value: "gaoxiao",
            },
            {
              name: "战争",
              value: "zhanzheng",
            },
            {
              name: "神魔",
              value: "shenmo",
            },
            {
              name: "忍者",
              value: "renzhe",
            },
            {
              name: "竞争",
              value: "jingzheng",
            },
            {
              name: "悬疑",
              value: "xuanyi",
            },
            {
              name: "社会",
              value: "shehui",
            },
            {
              name: "恋爱",
              value: "lianai",
            },
            {
              name: "宠物",
              value: "chongwu",
            },
            {
              name: "吸血",
              value: "xixue",
            },
            {
              name: "萝莉",
              value: "luoli",
            },
            {
              name: "御姐",
              value: "yujie",
            },
            {
              name: "霸总",
              value: "bazong",
            },
            {
              name: "玄幻",
              value: "xuanhuan",
            },
            {
              name: "古风",
              value: "gufeng",
            },
            {
              name: "历史",
              value: "lishi",
            },
            {
              name: "漫改",
              value: "mangai",
            },
            {
              name: "游戏",
              value: "youxi",
            },
            {
              name: "穿越",
              value: "chuanyue",
            },
            {
              name: "恐怖",
              value: "kongbu",
            },
            {
              name: "真人",
              value: "zhenren",
            },
            {
              name: "科幻",
              value: "kehuan",
            },
            {
              name: "防疫",
              value: "fangyi",
            },
            {
              name: "都市",
              value: "dushi",
            },
            {
              name: "武侠",
              value: "wuxia",
            },
            {
              name: "修真",
              value: "xiuzhen",
            },
            {
              name: "生活",
              value: "shenghuo",
            },
            {
              name: "动作",
              value: "dongzuo",
            },
          ],
        },
        {
          name: "地区",
          type: "place",
          id: "2",
          content: [
            {
              name: "全部",
              value: "all",
            },
            {
              name: "大陆",
              value: "dalu",
            },
            {
              name: "日本",
              value: "riben",
            },
            {
              name: "港台",
              value: "gangtai",
            },
            {
              name: "欧美",
              value: "oumei",
            },
            {
              name: "韩国",
              value: "hanguo",
            },
          ],
        },
        {
          name: "进度",
          type: "isFin",
          id: "3",
          content: [
            {
              name: "全部",
              value: "all",
            },
            {
              name: "连载",
              value: "lianzai",
            },
            {
              name: "完结",
              value: "wanjie",
            },
          ],
        },
        {
          name: "字母",
          type: "word",
          id: "4",
          content: [
            { name: "全部", value: "all" },
            { name: "A", value: "A" },
            { name: "B", value: "B" },
            { name: "C", value: "C" },
            { name: "D", value: "D" },
            { name: "E", value: "E" },
            { name: "F", value: "F" },
            { name: "G", value: "G" },
            { name: "H", value: "H" },
            { name: "I", value: "I" },
            { name: "J", value: "J" },
            { name: "K", value: "K" },
            { name: "L", value: "L" },
            { name: "M", value: "M" },
            { name: "N", value: "N" },
            { name: "O", value: "O" },
            { name: "P", value: "P" },
            { name: "Q", value: "Q" },
            { name: "R", value: "R" },
            { name: "S", value: "S" },
            { name: "T", value: "T" },
            { name: "U", value: "U" },
            { name: "V", value: "V" },
            { name: "W", value: "W" },
            { name: "X", value: "X" },
            { name: "Y", value: "Y" },
            { name: "Z", value: "Z" },
          ],
        },
      ],
    };
  },
  mounted() {
    this.$refs.mangaList.addEventListener("scroll", this.handleScroll, true);
  },
  created() {
    this.allComic = JSON.parse(localStorage.getItem("allComic"));
    this.selectResult = this.allComic;
    for (let i = 0; i < this.show; i++) {
      if (!this.selectResult[i]) {
        break;
      } else {
        this.selectResultCut.push(this.selectResult[i]);
      }
    }
    this.finallyResult = {
      list: this.selectResultCut,
      totalNum: this.selectResultCut.length,
    };
    this.handleScroll = debounce(this.handleScroll, 1000);
  },

  methods: {
    navMore(i) {
      if (i === 0 && this.titleIsActive) {
        this.titleIsActive = !this.titleIsActive;
        this.$refs.navBox[i].className = "navBox navBoxActive";
        this.$refs.navBox[i].firstElementChild.className = "arrow arrowActive";
        this.$refs.navBox[i].firstElementChild.textContent = "∧";
      } else if (i === 0 && !this.titleIsActive) {
        this.titleIsActive = !this.titleIsActive;
        this.$refs.navBox[i].className = "navBox";
        this.$refs.navBox[i].firstElementChild.className = "arrow";
        this.$refs.navBox[i].firstElementChild.textContent = ">";
      } else if (i === 3 && this.wordIsActive) {
        this.wordIsActive = !this.wordIsActive;
        this.$refs.navBox[i].className = "navBox navBoxActive";
        this.$refs.navBox[i].firstElementChild.className = "arrow arrowActive";
        this.$refs.navBox[i].firstElementChild.textContent = "∧";
      } else {
        this.wordIsActive = !this.wordIsActive;
        this.$refs.navBox[i].className = "navBox";
        this.$refs.navBox[i].firstElementChild.className = "arrow";
        this.$refs.navBox[i].firstElementChild.textContent = ">";
      }
    },
    // loading(e) {
    //   console.log(e);
    //   if (e.targetTouches[0].pageY > this.$refs.classifyPage.scrollHeight) {
    //     this.page++;

    //     this.show += 20;
    //     for (let i = (this.page - 1) * 20; i < this.show; i++) {
    //       if (!this.selectResult[i]) {
    //         break;
    //       } else {
    //         this.finallyResult.list.push(this.selectResult[i]);
    //         this.finallyResult.totalNum++;
    //       }
    //     }
    //   }
    // },
    handleScroll() {
      let contentH = this.$refs.mangaList.scrollHeight;
      let scrollH = this.$refs.mangaList.scrollTop;
      let viewH = this.$refs.mangaList.clientHeight;
      if (contentH - scrollH == viewH) {
        this.page++;
        this.show += 20;
        for (let i = (this.page - 1) * 20; i < this.show; i++) {
          if (!this.selectResult[i]) {
            break;
          } else {
            this.finallyResult.list.push(this.selectResult[i]);
            this.finallyResult.totalNum++;
          }
        }
      }
    },
    getUrl(id) {
      return "https://image.yqmh.com/mh/" + id + ".jpg";
    },
    showActive(type, value, name) {
      this.$refs.mangaList.scrollTop = 0;
      this.selectResultCut = [];
      this.page = 1;
      this.show = 20;
      this[type] = value;

      this.selectResult = this.allComic;

      if (type === "title") {
        this.allComicSelect = this.allComicSelect.filter((i) => {
          return i.type !== "title";
        });
        if (value !== "all") {
          this.allComicSelect.push({ type, name });
        }
      } else if (type === "place") {
        this.allComicSelect = this.allComicSelect.filter((i) => {
          return i.type !== "place";
        });
        if (value !== "all") {
          this.allComicSelect.push({ type, name });
        }
      } else if (type === "isFin") {
        this.allComicSelect = this.allComicSelect.filter((i) => {
          return i.type !== "isFin";
        });

        if (value !== "all") {
          this.allComicSelect.push({ type, name });
        }
      } else {
        this.allComicSelect = this.allComicSelect.filter((i) => {
          return i.type !== "word";
        });
        if (value !== "all") {
          this.allComicSelect.push({ type, word: name.toLowerCase() });
        }
      }
      for (let j = 0; j < this.allComicSelect.length; j++) {
        this.selectResult = this.selectResult.filter((i) => {
          return (
            i.cartoon_type_list_name.indexOf(this.allComicSelect[j].name) !==
              -1 || i.PinYin_name.slice(0, 1) === this.allComicSelect[j].word
          );
        });
      }

      for (let i = 0; i < this.show; i++) {
        if (!this.selectResult[i]) {
          break;
        } else {
          this.selectResultCut.push(this.selectResult[i]);
        }
      }
      // console.log(this.selectResultCut)
      this.finallyResult = {
        list: this.selectResultCut,
        totalNum: this.selectResultCut.length,
      };
    },
    turnToSearchView() {
      this.$router.push({
        path: "/home/search",
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>


<style lang="scss" scoped>
.only-classify-page {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 200;
  main {
    height: calc(100vh - 250px);
  }
}
header {
  position: relative;
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 20px;
  background-color: #fff;

  .classifySearch {
    margin-left: 20px;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 50px;
    i {
      font-size: 20px;
    }
  }

  .classifyComic {
    margin: 0 auto;
  }
}

nav {
  width: 100%;

  .navBox {
    position: relative;
    width: 100%;
    padding: 0 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
    height: 40px;
    overflow: hidden;

    .arrow {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background-color: #fff;
      position: absolute;
      //   top: 5px;
      right: 0px;
    }

    .arrowActive {
      bottom: 0px;
    }

    .classifyTitle {
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      width: 40px;
      height: 20px;
      margin-left: 10px;
      margin-top: 10px;
    }

    .classifyItem {
      font-size: 14px;
      color: #333;
      text-align: center;
      line-height: 20px;
      //   width: 40px;
      padding: 0 5px;
      height: 20px;
      margin-top: 10px;
      border: 1px solid white;
      border-radius: 10px;

      &.active {
        border: 1px solid #0bb9d0;
        color: #0bb9d0;
      }
    }
  }

  .navBoxActive {
    height: auto;
    overflow: visible;
  }
}

main {
  width: 100%;
  position: relative;
  overflow: auto;

  .null {
    position: absolute;
    top: 360px;
    left: 150px;
    font-size: 20px;
    font-weight: 800;
    color: #999;
  }
  .mainBox {
    width: 100%;
    height: 18vh;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-left: 10px;

    .classifyMainImg {
      width: 25%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .classifyMainText {
      width: 75%;
      height: 100%;
      padding-left: 20px;

      div {
        margin-top: 18px;
        color: #999;
      }
      .classifyComicName {
        font-size: 18px;
        font-weight: 800;
        color: black;
      }
    }
  }
}
</style>