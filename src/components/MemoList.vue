<template>
  <div class="hello">
    memo list
  </div>
  <div v-for="(memo) in memos" :key="memo.id">
    <router-link :to="`/memos/${memo.id}`">LINK</router-link>
    {{ memo.id }}{{ memo.data().content }}
  </div>
</template>

<script>
export default {
  name: 'MemoList',
  props: {
    memos: Array
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
