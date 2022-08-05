<template>
  <div class="hello">
    {{ memoContent }}
    <div><button>編集</button></div>
  </div>
</template>

<script>
import db from '../firebase.js'
import { collection, getDocs } from "firebase/firestore"

export default {
  name: 'MemoContent',
  data() {
    return {
      memoId: '',
      memoContent: ''
    }
  },
  props: {},
  computed: {},
  beforeRouteUpdate (to, from, next) {
    this.getMemoContent(to.params.id)
    next()
  },
  mounted () {
    this.getMemoContent(this.$route.params.id)
  },
  methods: {
    getMemoContent: async function(memoId) {
      const querySnapshot = await getDocs(collection(db, "memos"))
      querySnapshot.forEach((doc) => {
        if (doc.id === memoId) {
          this.memoContent = doc.data().content
        }
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
