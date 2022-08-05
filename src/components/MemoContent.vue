<template>
  <div class="">
    <div v-if="edit">
      <textarea name="memoContent" id="" cols="30" rows="10" v-model="memoContent"></textarea>
    </div>
    <div v-else>
      {{ memoContent }}
      {{ originalMemoContent }}
    </div>
    <div>
      <div v-if="edit">
        <div @click="updateMemo">保存</div>
        <div @click="cancelEdit">キャンセル</div>
      </div>
      <div v-else>
        <div @click="onEdit">編集</div>
        <div @click="deleteMemo">削除</div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase.js'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

export default {
  name: 'MemoContent',
  data () {
    return {
      memoId: '',
      memoContent: '',
      originalMemoContent: '',
      edit: false,
    }
  },
  props: {},
  emits: ['updated'],
  computed: {},
  beforeRouteUpdate (to, from, next) {
    this.setMemoId(to.params.id)
    this.getMemoContent(to.params.id)
    next()
  },
  mounted () {
    this.setMemoId(this.$route.params.id)
    this.getMemoContent(this.$route.params.id)
  },
  methods: {
    async getMemoContent (memoId) {
      const memoRef = doc(db, "memos", memoId);
      const memoSnap = await getDoc(memoRef);

      if (memoSnap.exists()) {
        this.memoContent = memoSnap.data().content
      } else {
        console.log("No such memo!")
      }
    },
    onEdit () {
      this.originalMemoContent = this.memoContent
      this.edit = true
    },
    offEdit () {
      this.edit = false
      this.originalMemoContent = ''
    },
    cancelEdit () {
      this.edit = false
      this.memoContent = this.originalMemoContent
      this.originalMemoContent = ''
    },
    async updateMemo () {
      this.offEdit()
      const memoRef = doc(db, "memos", this.memoId)
      await updateDoc(memoRef, {
        content: this.memoContent
      })
      this.emitEvent()
    },
    setMemoId (memoId) {
      this.memoId = memoId
    },
    async deleteMemo () {
      console.log('Delting:', this.memoId);
      await deleteDoc(doc(db, "memos", this.memoId))
      this.emitEvent()
      this.$router.push('/memos')
    },
    emitEvent () {
      this.$emit('updated')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
