<template>
  <div class="">
    <div class="memo-content-area">
      <template v-if="edit">
        <textarea class="memo-text-area" v-model="memoContent"></textarea>
      </template>
      <template v-else>
        <p class="memo-content">{{ memoContent }}</p>
      </template>
    </div>
    <div class="button-area">
      <template v-if="edit">
        <button class="button positive-button" @click="updateMemo">保存</button>
        <button class="button negative-button" @click="cancelEdit">キャンセル</button>
      </template>
      <template v-else>
        <button class="button positive-button" @click="onEdit">編集</button>
        <button class="button negative-button" @click="deleteMemo">削除</button>
      </template>
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
      // TODO: メソッド切り出し
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
.memo-content-area {
  height: 400px;
  width: 320px;
  border: 1px solid black;
  padding: 4px;
  margin-bottom: 8px;
  border-radius: 4px;
}
.memo-content {
  margin: 0;
  white-space: pre-line;
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
