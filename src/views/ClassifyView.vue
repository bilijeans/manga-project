<template>
    <div class="classifyPage" ref="classifyPage" @touchmove="loading">
        <header ref="header">
             <div class="classifySearch">
        <svg
          t="1664782037558"
          class="icon"
          viewBox="0 0 1040 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1401"
          width="20"
          height="20"
        >
          <path
            d="M176.439478 676.824953c-139.585105-133.763516-139.585105-351.411535 0-485.179145 67.62826-64.84589 157.511383-100.492762 253.15572-100.492762 95.567589 0 185.449689 35.647895 253.078972 100.492762 139.585105 133.76761 139.585105 351.415628 0 485.179145-67.62826 64.777329-157.511383 100.484575-253.15572 100.484575C333.950861 777.309528 244.067738 741.602282 176.439478 676.824953L176.439478 676.824953 176.439478 676.824953zM1024.212848 955.665659 756.059552 698.643887c142.644791-161.752987 136.315642-403.047566-22.757307-555.514049-83.911108-80.436984-193.845916-120.617102-303.707047-120.617102-109.937878 0-219.880873 40.180118-303.779701 120.617102-167.754678 160.728658-167.754678 421.408749 0 582.215178 83.898829 80.364329 193.8408 120.613008 303.702953 120.613008 98.632391 0 196.124819-34.149774 275.908934-98.794074l268.225951 257.017678L1024.212848 955.665659 1024.212848 955.665659zM1024.212848 955.665659"
            p-id="1402"
          ></path>
        </svg>
      </div>
      <div class="classifyComic">漫画</div>
        </header>

        <nav>
           <div class="navBox" v-for="item in classifyTitle" :key="item.id">
                <div class="classifyTitle">{{item.name}}</div>
                <div :class="{active : i.value == $data[item.calssName]}" class="classifyItem" v-for="i in item.content" :key="i.value" @click="showActive(item.calssName,i.value,i.name)">{{i.name}}</div>
           </div>
        </nav>

        <main>
            <div class="null" v-show="selectResult.length === 0">没有啦(๑￫ܫ￩)</div>
            <div class="mainBox" v-for="(item,index) in selectResult" :key="item.comic_id" v-show="index < show" @click="getId(item.comic_id)">
                <div class="classifyMainImg">
                    <img :src="getUrl(item.comic_id)">
                </div>
                <div class="classifyMainText">
                    <div class="classifyComicName">{{item.comic_name}}</div>
                    <div class="classifyComicStatus">{{item.comic_status === 1? `更新至${item.latest_cartoon_topic_name}` : '已完结'}}</div>
                    <div class="classifyComicFeature">{{item.comic_feature}}</div>
                    <div class="classifyComicScore">{{item.score}}分</div>
                </div>
            </div>
        </main>
    </div>
</template>


<script>
export default {
    data() {
        return{
            allComic : [],
            allComicSelect : [],
            selectResult : [],
            title : '',
            place : '',
            isFin : '',
            word : '',
            show : 20,

            classifyTitle: [
                {
                    name : '题材',
                    calssName : 'title',
                    id: '1',
                    content : [
                        {
                            name : '热血',
                            value : 'rexue'
                        },
                         {
                            name : '机战',
                            value : 'jizhan'
                        },
                         {
                            name : '运动',
                            value : 'yundong'
                        },
                         {
                            name : '推理',
                            value : 'tuili'
                        },
                         {
                            name : '冒险',
                            value : 'maoxian'
                        },
                         {
                            name : '搞笑',
                            value : 'gaoxiao'
                        },
                         {
                            name : '战争',
                            value : 'zhanzheng'
                        },
                         {
                            name : '神魔',
                            value : 'shenmo'
                        },
                         {
                            name : '忍者',
                            value : 'renzhe'
                        },
                         {
                            name : '竞争',
                            value : 'jingzheng'
                        },
                         {
                            name : '悬疑',
                            value : 'xuanyi'
                        },
                         {
                            name : '社会',
                            value : 'shehui'
                        },
                         {
                            name : '恋爱',
                            value : 'lianai'
                        },
                        {
                            name : '宠物',
                            value : 'chongwu'
                        },
                        {
                            name : '吸血',
                            value : 'xixue'
                        },
                        {
                            name : '萝莉',
                            value : 'luoli'
                        },
                        {
                            name : '御姐',
                            value : 'yujie'
                        },
                        {
                            name : '霸总',
                            value : 'bazong'
                        },
                        {
                            name : '玄幻',
                            value : 'xuanhuan'
                        },
                        {
                            name : '古风',
                            value : 'gufeng'
                        },
                        {
                            name : '历史',
                            value : 'lishi'
                        },
                        {
                            name : '漫改',
                            value : 'mangai'
                        },
                        {
                            name : '游戏',
                            value : 'youxi'
                        },
                        {
                            name : '穿越',
                            value : 'chuanyue'
                        },
                        {
                            name : '恐怖',
                            value : 'kongbu'
                        },
                        {
                            name : '真人',
                            value : 'zhenren'
                        },
                        {
                            name : '科幻',
                            value : 'kehuan'
                        },
                        {
                            name : '防疫',
                            value : 'fangyi'
                        },
                        {
                            name : '都市',
                            value : 'dushi'
                        },
                        {
                            name : '武侠',
                            value : 'wuxia'
                        },
                        {
                            name : '修真',
                            value : 'xiuzhen'
                        },
                        {
                            name : '生活',
                            value : 'shenghuo'
                        },
                        {
                            name : '动作',
                            value : 'dongzuo'
                        }

                    ]
                },
                {
                    name : '地区',
                    calssName : 'place',
                    id: '2',
                    content : [
                        {
                            name : '大陆',
                            value : 'dalu'
                        },
                        {
                            name : '日本',
                            value : 'riben'
                        },
                        {
                            name : '港台',
                            value : 'gangtai'
                        },
                        {
                            name : '欧美',
                            value : 'oumei'
                        },
                        {
                            name : '韩国',
                            value : 'hanguo'
                        }
                    ]
                },
                {
                    name : '进度',
                    calssName : 'isFin',
                    id:'3',
                    content : [
                        {
                            name : '连载',
                            value : 'lianzai'
                        },{
                            name : '完结',
                            value : 'wanjie'
                        },
                    ]
                },
                {
                    name : '字母',
                    calssName : 'word',
                    id:'4',
                    content : [
                     {name :'A', value : 'A'},
                     {name :'B', value : 'B'},
                     {name :'C', value : 'C'},
                     {name :'D', value : 'D'},
                     {name :'E', value : 'E'},
                     {name :'F', value : 'F'},
                     {name :'G', value : 'G'},
                     {name :'H', value : 'H'},
                     {name :'I', value : 'I'},
                     {name :'J', value : 'J'},
                     {name :'K', value : 'K'},
                     {name :'L', value : 'L'},
                     {name :'M', value : 'M'},
                     {name :'N', value : 'N'},
                     {name :'O', value : 'O'},
                     {name :'P', value : 'P'},
                     {name :'Q', value : 'Q'},
                     {name :'R', value : 'R'},
                     {name :'S', value : 'S'},
                     {name :'T', value : 'T'},
                     {name :'U', value : 'U'},
                     {name :'V', value : 'V'},
                     {name :'W', value : 'W'},
                     {name :'X', value : 'X'},
                     {name :'Y', value : 'Y'},
                     {name :'Z', value : 'Z'}
                    ]
                }
            ],

            

        }
    },

    created() {
            this.allComic = JSON.parse(localStorage.getItem("allComic"));
             this.selectResult = this.allComic;
    },

    methods : {
        getId(id){
           console.log('id ==>', id)
        },
        loading(e){

             if(e.targetTouches[0].pageY > this.$refs.classifyPage.scrollHeight - 500){
                this.show += 20
             }
        },
        getUrl(id){
             return 'https://image.yqmh.com/mh/' + id + '.jpg'
        },
        showActive(type,value,name){
            this.show = 20;
            this[type] = value ;

            this.selectResult = this.allComic;

          if(type === 'title'){
             this.allComicSelect = this.allComicSelect.filter(i =>{
                return i.type !== 'title'
             })

             this.allComicSelect.push({type,name});
          }else if(type === 'place'){
            this.allComicSelect = this.allComicSelect.filter(i =>{
                return i.type !== 'place'
             })

             this.allComicSelect.push({type,name});
          }else if(type === 'isFin'){
            this.allComicSelect = this.allComicSelect.filter(i =>{
                return i.type !== 'isFin'
             })

             this.allComicSelect.push({type,name});
          }else{
            this.allComicSelect = this.allComicSelect.filter(i =>{
                return i.type !== 'word'
             })

             this.allComicSelect.push({type,word : name.toLowerCase ()});
          }
           
              for(let j = 0; j < this.allComicSelect.length; j++){
                  this.selectResult = this.selectResult.filter(i => {
                    return i.cartoon_type_list_name.indexOf(this.allComicSelect[j].name) !== -1 || i.PinYin_name.slice(0,1) === this.allComicSelect[j].word

                  })
              }
           
            
        },

       
    }
}
</script>


<style lang="scss" scoped>
header {
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 20px;
  background-color: #f3f4f6;

  .classifySearch{
    margin-left: 20px;
    position: relative;
  }
  
  .classifyComic{
    margin: 0 auto;
  }
}

nav {
    width: 100%;
    .navBox{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 10px;

        .classifyTitle{
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
            width: 40px;
            height: 20px;
            margin-left: 10px;
            margin-top: 10px;
        }

        .classifyItem{
            font-size: 14px;
            color: #333;
            text-align: center;
            line-height: 20px;
            width: 40px;
            height: 20px;
            margin-top: 10px;
            border: 1px solid white;
            border-radius: 10px;
        
        &.active{
        border: 1px solid #0bb9d0;
        color: #0bb9d0;
         }
        }
    }

    
}

main{
    width: 100%;
    position: relative;

    .null{
        position: absolute;
        top: 360px;
        left: 150px;
        font-size: 20px;
        font-weight: 800;
        color: #999;
    }
    .mainBox{
        width: 100%;
        height: 18vh;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        padding-left: 10px;


        .classifyMainImg{
            width: 25%;
            height: 100%;

            img{
                width: 100%;
                height: 100%;
            }
        }

        .classifyMainText{
            width: 75%;
            height: 100%;
            padding-left: 20px;

            div{
                margin-top: 18px;
                color: #999;
            }
            .classifyComicName{
                font-size: 18px;
                font-weight: 800;
                color: black;
            }
        }
    }
}


</style>