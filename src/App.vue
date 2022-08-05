<template>
  <MemoHeader></MemoHeader>
  <MemoList :memos="memos"></MemoList>
  <router-view @updated="updateMemoList"></router-view>
</template>

<script>
import MemoHeader from './components/MemoHeader.vue'
import MemoList from './components/MemoList.vue'
import db from './firebase.js'
import { collection, getDocs } from "firebase/firestore"
export default {
  name: 'App',
  components: {
    MemoHeader,
    MemoList,
  },
  data() {
    return {
      memos: []
    }
  },
  created () {
    this.getMemoList()
  },
  // TODO: memoListの構成を修正する
  methods: {
    updateMemoList () {
      this.memos = []
      this.getMemoList()
    },
    async getMemoList () {
      const querySnapshot = await getDocs(collection(db, "memos"))
      querySnapshot.forEach((doc) => {
        this.memos.push(doc)
      })
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
