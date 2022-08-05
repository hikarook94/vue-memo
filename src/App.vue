<template>
  <MemoHeader></MemoHeader>
  <MemoList :memos="memos"></MemoList> 
  <router-view></router-view>
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
  created: async function () {
    // querySnapshotとは？
    const querySnapshot = await getDocs(collection(db, "memos"))
    querySnapshot.forEach((doc) => {
      this.memos.push(doc)
    })
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
