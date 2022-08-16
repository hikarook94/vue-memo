<template>
  <div>
    <div class="memo-content-area">
      <textarea class="memo-text-area" v-model="memoContent" autofocus></textarea>
    </div>
    <div class="button-area">
      <button class="button positive-button" @click="createMemo">保存</button>
      <button class="button negative-button" @click="cancelEdit">キャンセル</button>
    </div>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore"
import db from '../firebase.js'

export default {
  name: 'MemoEditor',
  data () {
    return {
      memoContent: '',
    }
  },
  emits: ['updated'],
  methods: {
    async createMemo () {
      const memoRef = await addDoc(collection(db, "memos"), {
        content: this.memoContent
      })
      this.emitEvent()
      this.$router.push(`/memos/${memoRef.id}`)
    },
    cancelEdit () {
      this.memoContent = ''
    },
    emitEvent() {
      this.$emit('updated')
    },
  }
}
</script>

<style scoped>
.memo-content-area {
  height: 400px;
  width: 320px;
  border: 1px solid black;
  padding: 4px;
  margin-bottom: 8px;
  border-radius: 4px;
}
.memo-text-area {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: 1rem;
  border: none;
  outline: none;
}
.button-area {
  display: flex;
}
.positive-button {
  width: calc(320px * 0.7);
  margin-right: 8px;
}
.negative-button {
  width: calc(320px * 0.3);
}
</style>
