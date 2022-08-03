<template>
  <div class="hello">
    memo list
  </div>
  <!-- リストレンダリング -->
  <router-link to="/:id">This is link</router-link>
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

</style>
