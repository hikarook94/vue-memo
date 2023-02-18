<template>
  <div class="memo-list-area">
    <div class="memo-list-item" v-for="memo in memos" :key="memo.id">
      <router-link :to="`/memos/${memo.id}`">{{ getMemoTitle(memo) }}</router-link>
    </div>
    <router-link to="/memos/new">+</router-link>
  </div>
</template>

<script>
export default {
  name: 'MemoList',
  props: {
    memos: Object
  },
  methods: {
    getMemoTitle(memo) {
      return memo.content.split(/\r\n|\r|\n/)[0]
    },
  },
}
</script>

<style scoped>
.memo-list-item {
  margin: 4px 0;
}
</style>
