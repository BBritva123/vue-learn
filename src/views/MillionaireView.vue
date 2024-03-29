<script setup>
import { ref, reactive, computed } from "vue";

const stage = ref(1);
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
  15: 1_000_000,
};

const helpers = reactive({
  half: {
    name: "50 на 50",
    isActive: true,
    isRun: false,
    activate() {
      this.isRun = true;
    },
    disactive() {
      this.isActive = false;
      this.isRun = false;
    },
  },
  phone: {
    name: "Звонок другу",
    isActive: true,
    isRun: false,
    answer: null,
    activate() {
      this.isRun = true;
      let levelDifficult = stage.value < 5 ? "light" : stage.value < 10 ? "medium" : "hard"
      if (randomCount(0, 100) < { light: 20, medium: 50, hard: 80 }[levelDifficult]) {
        this.answer = currentQuestion.value.variants[1]
      } else {
        let random = randomCount(2, 4)
        this.answer = currentQuestion.value.variants[random]
      }
    },
    disactive() {
      this.isActive = false;
      this.isRun = false;
      this.answer = null;
    },
  },
  audience: {
    name: "Помощь зала",
    isActive: true,
    isRun: false,
    answer: null,
    disactive() {
      this.isActive = false;
      this.isRun = false;
      this.answer = null;
    },
    activate() {
      this.isRun = true;
      let levelDifficult = stage.value < 5 ? "light" : stage.value < 10 ? "medium" : "hard"
      if (randomCount(0, 100) < { light: 80, medium: 50, hard: 20 }[levelDifficult]) {
        this.answer = currentQuestion.value.variants[1]
      } else {
        let random = randomCount(2, 4)
        this.answer = currentQuestion.value.variants[random]
      }
    },
  }
});

const randomArr = (arr = [1, 2, 3, 4]) =>
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

const randomAnswer = (obj) => {
  let arr = randomArr([1, 2, 3, 4]);
  return arr;
};

const questions = {
  light: [
    {
      question: "Как вызвать джина из лампы?",
      // может быть потом добавим isCorrect
      variants: {
        1: "Потереть лампу",
        2: "Прокричать Ау",
        3: "Щелкнуть пальцами",
        4: "Щелкнуть каблуками",
      },
    },
    {
      question: "Кто любил играть на гармошке?",
      variants: {
        1: "Крокодил Гена",
        2: "Шапокляк",
        3: "Чебурашка",
        4: "Ослик Иа",
      },
    },
    {
      question: "Какая фамилия у почтальона, который работал в Простоквашино?",
      variants: {
        1: "Печкин",
        2: "Речкин",
        3: "Матрроскин",
        4: "Дядя Федор",
      },
    },
    {
      question: "Какого цвета елка?",
      variants: {
        1: "Зеленая",
        2: "Красная",
        3: "Синяя",
        4: "Желтая",
      },
    },
    {
      question: "Сколько лап у паука?",
      variants: {
        1: "8",
        2: "6",
        3: "4",
        4: "10",
      },
    },
    {
      question: "Какое имя у кота из Простоквашино?",
      variants: {
        1: "Матроскин",
        2: "Дядя Федор",
        3: "Том",
        4: "Леопольд",
      },
    },
  ],
  medium: [
    {
      question: "Чем Малыш лечил Карлсона от болезни?",
      variants: {
        1: "Вареньем",
        2: "Коньяком",
        3: "Сигареты",
        4: "Активированным углем",
      },
    },
    {
      question: "Какой герой катался на печке? ()",
      variants: {
        1: "Емеля",
        2: "Алеша Попович",
        3: "Тугарин",
        4: "Иванушка",
      },
    },
  ],
  hard: [
    {
      question: "Какое животное носила с собой Шапокляк?",
      variants: {
        1: "Крысу Лариску",
        2: "Кота Леопольда",
        3: "Змея Горыныча",
        4: "Соловья Разбойника",
      },
    },
    {
      question: "Что несла Красная Шапочка своей бабушке?",
      variants: {
        1: "Пирожки",
        2: "Коньяк",
        3: "Белые тапочки",
        4: "Пирожные",
      },
    },
  ],
};
const randomCount = (min, max) => Math.floor(Math.random() * max) + min;
// вычисляем рандомный вопрос по уровню сложности, в зависимости от stage
const currentQuestion = computed(() => {
  const currentDifficult =
    stage.value < 5 ? "light" : stage.value < 10 ? "medium" : "hard";
  return questions[currentDifficult][
    randomCount(0, questions[currentDifficult].length)
  ];
});
// получаем перемешанные варианты ответов к текущему выисленному вопросу
const currentQuestionVariants = computed(() => {
  return randomArr().map((el) => currentQuestion.value.variants[el]);
});

// выводимые варианты ответов при подсказке 50 на 50
const fiftyFiftyQuestionVariants = computed(() => {
  let incorrectVariant = currentQuestionVariants.value.filter(
    (variant) => variant !== currentQuestion.value.variants[1]
  );
  let correctVariant = currentQuestionVariants.value.find(
    (variant) => variant == currentQuestion.value.variants[1]
  );
  let indexRandom = randomCount(0, 2);
  let randomIncorrectVariant = incorrectVariant[indexRandom];
  return currentQuestionVariants.value.map((variant) => {
    if (variant == correctVariant || variant == randomIncorrectVariant) {
      return variant;
    } else return "";
  });
});

const doAnswer = (variant) => {
  if (variant == currentQuestion.value.variants[1]) {
    stage.value++;
  }
  Object.values(helpers).forEach(element => {
    element.isRun ? element.disactive() : null
  });
};
</script>

<template>
  <main>
    <h1 class="header">VueJs Millionaire</h1>
    <div class="flex">
      <div>
        <section class="stages">
          <div class="stages__line" :class="{ active: stage == i }" v-for="(st, i, index) in stages">
            <span>{{ i }}</span>
            <span>{{ st }}</span>
          </div>
        </section>
        <section class="helpers__wrapper">
          <button @click="help.activate()" :disabled="!help.isActive" v-for="help in helpers">
            {{ help.name }}
          </button>
        </section>
      </div>

      <section class="question__wrapper">
        <article>
          <div class="helpers__wrapp">
            <h2 v-if="helpers.phone.isRun">Я считаю, что ответ: {{ helpers.phone.answer }}</h2>
            <h2 v-if="helpers.audience.isRun">Зал считает, что ответ:
              {{ helpers.audience.answer }}</h2>

          </div>
          <h2>
            {{ currentQuestion.question }}
          </h2>
          <button @click="doAnswer(variant)" class="question__variant"
            v-for="(variant, variantKey) in currentQuestionVariants" :disabled="fiftyFiftyQuestionVariants[variantKey] == '' && helpers.half.isRun
              " :key="variant">
            <span v-if="fiftyFiftyQuestionVariants[variantKey] !== '' || !helpers.half.isRun">{{
              variant
            }}</span>
            <span v-else>&nbsp;</span>
          </button>
        </article>
      </section>
    </div>
  </main>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.stages {
  width: 30%;
  display: flex;
  flex-direction: column-reverse;
}

.stages .active {
  background-color: #a7a3a3;
}

.stages__line {
  display: flex;
  justify-content: space-between;
}

.helpers__wrapper {
  margin-top: 20px;
}
</style>
