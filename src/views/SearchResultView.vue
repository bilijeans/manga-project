<template>
  <div>我是搜索结果</div>
</template>
<script>
export default {
  created() {
    console.log((this.searchKey = this.$route.query.keyword));
  },
};
</script>