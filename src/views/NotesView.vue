<script setup>
import "@fontsource/source-sans-pro/400.css"
import "@fontsource/source-sans-pro/700.css"
import "@fontsource/source-code-pro/400.css"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCirclePlus, faPencil, faCheck } from "@fortawesome/free-solid-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"

import { ref, computed } from "vue"
import { useLocalStorage } from "@vueuse/core"
import { marked } from "marked"

const notes = useLocalStorage("notes", [])

let newId = notes.value.reduce(
  (acc, note) => (note.id > acc ? note.id : acc), 0
) + 1

const addNote = () => {
  notes.value.unshift({
    id: newId++,
    title: "",
    isDone: false,
    date: new Date().getTime(),
  })
}

const editId = ref(null)
const editTitle = ref("")

const editNote = (item) => {
  editId.value = item.id
  editTitle.value = item.title
}

const saveNote = (item) => {
  item.title = editTitle.value
  item.date = new Date().getTime()
  editId.value = null
}

const deleteNote = (id) => {
  notes.value.splice(
    notes.value.findIndex(
      (item) => item.id === id
    ),
  1)
}

const dateFormat = new Intl.DateTimeFormat("ru-Ru", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
}).format

// markdown
const output = computed(() =>
  notes.value.map((note) => marked(note.title))
)
</script>

<template>
  <main>
    <h1 class="header">VueJs Markdown Notes</h1>
    <font-awesome-icon
      :icon="faCirclePlus"
      size="2xl"
      class="icons"
      @click="addNote"
    />
    <div
      v-for="(item, index) in notes"
      :key="item.id"
      class="note"
      :class="{ 'line-through': item.isDone }"
    >
      <span class="date">{{ dateFormat(item.date) }} </span>
      <span class="icons">
        <template v-if="editId === item.id">
          <font-awesome-icon
            :icon="faCheck"
            size="lg"
            @click="saveNote(item)"
          />
        </template>
        <template v-else>
          <font-awesome-icon
            :icon="faPencil"
            size="lg"
            @click="editNote(item)"
          />
        </template>
        <font-awesome-icon
          :icon="faTrashCan"
          size="lg"
          @click="deleteNote(item.id)"
        />
      </span>
      <textarea
        v-if="editId === item.id"
        v-model="editTitle"
        class="markdown-body"
      />
      <div
        v-else
        v-html="output[index]"
        class="markdown-body"
      />
    </div>
  </main>
</template>

<style scoped>
* {
  font-family: "Arial", sans-serif;
  box-sizing: border-box;
}

img {
  max-width: 100%;
  height: auto;
}

.line-through {
  text-decoration: line-through;
}

.markdown-body {
  font-size: 1.2em;
  font-family: "Source Sans Pro", "Arial", sans-serif;
  border: none;
  box-shadow: none;
  margin: 0;
  width: 100%;
  padding: 10px 20px 10px;
  min-height: 300px;
  background: #f9f9f9;
}

.markdown-body:focus {
  font-family: "Source Code Pro", courier, monospace;
  font-size: 1em;
}

.markdown-body pre,
.markdown-body code {
  background: #ededed;
}

.header {
  margin: 5px 10px 0;
  color: #d46e58;
  display: inline-block;
}

.note {
  background: #eee;
  box-shadow: #999 1px 1px 3px;
  margin: 30px 0;
  padding-top: 40px;
  min-height: 200px;
  width: 100%;
  display: block;
  position: relative;
  overflow: hidden;
}

.date {
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px;
  font-size: 0.7em;
  font-style: italic;
  color: #71cbd0;
}

.icons {
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
}

.fa-circle-plus,
.fa-pencil,
.fa-check,
.fa-trash-can {
  cursor: pointer;
}

.fa-circle-plus {
  color: #71cbd0;
}

.fa-circle-plus:hover {
  color: darken(#71cbd0, 20);
}

.fa-pencil {
  color: #dbc394;
}

.fa-check {
  color: #92d788;
}

.fa-trash-can {
  margin-inline-start: 0.4em;
  color: #c2474b;
}

.fa-trash-can:hover {
  color: darken(#c2474b, 20);
}
</style>
