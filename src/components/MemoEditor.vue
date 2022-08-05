<template>
  <div>新規作成</div>
  <textarea name="memo" id="" cols="30" rows="10" v-model="memoContent"></textarea>
  <div>
    <div @click="createMemo">保存</div>
    <div @click="cancelEdit">キャンセル</div>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore"
import db from '../firebase.js'

export default {
  name: 'MemoEditor',
  data () {
    return {
      memoContent: ''
    }
  },
  emits: ['updated'],
  components: {},
  methods: {
    async createMemo () {
      const memoRef = await addDoc(collection(db, "memos"), {
        content: this.memoContent
      })
      this.emitEvent()
      this.$router.push(`/memos/${memoRef.id}`)
    },
    cancelEdit () {},
    emitEvent() {
      this.$emit('updated')
    },
  }
}
</script>

<style>
</style>
