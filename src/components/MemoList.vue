<template>
  <div class="memo-list-area">
    <div class="memo-list-item" v-for="memo in memos" :key="memo.id">
      <router-link :to="`/memos/${memo.id}`">{{ getMemoTitle(memo.content) }}</router-link>
    </div>
    <router-link :to="`/memos/new`">+</router-link>
  </div>
</template>

<script>
export default {
  name: 'MemoList',
  props: {
    memos: Object
  },
  created () {
  },
  methods: {
    getMemoTitle(memo) {
      const title = memo.split(/\r\n|\r|\n/)[0]
      return title
    },
  },
}
</script>

<style scoped>
.memo-list-item {
  margin: 4px 0;
}
</style>
