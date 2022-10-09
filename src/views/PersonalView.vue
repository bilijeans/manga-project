<template>
  <div class="personal">
    <div class="p-head">
      <div class="p-register">注册</div>
      <div class="p-login">登录</div>
    </div>
    <div class="p-function">
        <div class="function-e">
            <img src="@/assets/collect.svg">
            <span class="function-title">我的收藏</span>
            <span>></span>
        </div>
        <div class="function-e">
            <img src="@/assets/readinghistory.svg">
            <span class="function-title">阅读历史</span>
            <span>></span>
        </div>
        <div class="function-e">
            <img src="@/assets/attention.svg">
            <span class="function-title">我的关注</span>
            <span>></span>
        </div>
        <div class="function-e">
            <img src="@/assets/feedback.svg">
            <span class="function-title">意见反馈</span>
            <span>></span>
        </div>
    </div>
  </div>
</template>

<style lang="scss">
.personal {
  background-color: #f3f4f6;
  .p-head {
    display: flex;
    justify-content: space-around;
    margin-bottom: 5px;
    padding: 30px;
    background-color: #00adf1;
    .p-register {
      font-size: 14px;
      padding: 12px 35px;
      color: #00adf1;
      background-color: #fff;
    }
    .p-login {
      font-size: 14px;
      padding: 12px 35px;
      color: #00adf1;
      background-color: #fff;
    }
  }
  .p-function {
    .function-e {
        display: flex;
        align-items: center;
        padding: 15px;
        background-color: #fff;
        img {
            margin-right:10px;
        }
        .function-title {
            margin-right: 70%;
        }
    }
  }
}
</style>