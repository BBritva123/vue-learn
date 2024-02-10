<script setup>
import { ref, reactive } from 'vue'

const stage = ref(1)

const stages = {
  1: 100,
  2: 200,
  3: 300,
  4: 500,
  5: 1_000,
  6: 2_000,
  7: 4_000,
  8: 8_000,
  9: 16_000,
  10: 32_000,
  11: 64_000,
  12: 125_000,
  13: 250_000,
  14: 500_000,
  15: 1_000_000
}

const helpers = reactive({
  half: {
    name: '50 на 50',
    isActive: true,
  },
  phone: {
    name: 'Звонок другу',
    isActive: true,
  },
  audience: {
    name: 'Помощь зала',
    isActive: true,
  }
})
const questions = {
  light: [
    {
      question: 'Какого цвета елка?',
      variants: {
        1: "Зеленая",
        2: "Красная",
        3: "Синяя",
        4: "Желтая",
      }
    },
    {
      question: 'Сколько лап у паука?',
      variants: {
        1: "8",
        2: "6",
        3: "4",
        4: "10",
      }
    },
    {
      question: 'Сколько мне лет?',
      variants: {
        1: "34",
        2: "43",
        3: "12",
        4: "28",
      }
    },
  ],
  medium: [],
  hard: [],
}

const doAnswer = (variantKey) => {
  if (variantKey == 1) {
    stage.value++
  }
}



</script>

<template>
  <main>
    <h1 class="header">VueJs Millionaire</h1>
    <section class="stages">
      <span :class="{ active: stage == i }" v-for="st, i, index in stages">{{ i }}</span>
    </section>
    <section class="helpers__wrapper">
      <button v-for="help in helpers">{{ help.name }}</button>
    </section>
    <section class="question__wrapper">
      <article>
        <h2>
          {{ questions.light[(stage - 1) % 3].question }}
        </h2>
        <button @click="doAnswer(variantKey)" class="question__variant"
          v-for="variant, variantKey in questions.light[(stage - 1) % 3].variants" :key="variant">{{ variant
          }}
        </button>
      </article>
    </section>
  </main>
</template>

<style scoped>
.stages {
  display: flex;
  flex-direction: column-reverse;
}

.stages .active {
  background-color: #a7a3a3
}
</style>
