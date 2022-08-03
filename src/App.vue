<template>
  <MemoHeader></MemoHeader>
  <MemoList></MemoList> 
  <router-view></router-view>
</template>

<script>
import MemoHeader from './components/MemoHeader.vue'
import MemoList from './components/MemoList.vue'

export default {
  name: 'App',
  components: {
    MemoHeader,
    MemoList,
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
