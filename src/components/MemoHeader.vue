<template>
  <div id="header">
    <div id="title">Memo</div>
  </div>
</template>

<script>
export default {
  name: 'MemoList',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
  height: 64px;
}
#title {
  height: 100%;
  line-height: 100%;
}

</style>
