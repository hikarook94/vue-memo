<template>
  <MemoList id="list-area" :memos="memos"></MemoList>
  <router-view id="content-area" @updated="updateMemoList"></router-view>
</template>

<script>
import MemoList from './components/MemoList.vue'
import db from './firebase.js'
import { collection, getDocs } from "firebase/firestore"
export default {
  name: 'App',
  components: {
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
  methods: {
    updateMemoList () {
      this.memos = []
      this.getMemoList()
    },
    async getMemoList () {
      const querySnapshot = await getDocs(collection(db, "memos"))
      querySnapshot.forEach((doc) => {
        this.memos.push({
          id: doc.id,
          content: doc.data().content
        })
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
  display: flex;
  box-sizing: border-box;
}
#list-area {
  width: 30%;
}
#content-area {
  width: 70%;
}
</style>
