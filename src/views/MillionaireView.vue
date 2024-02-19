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
const variantQuestionSymbols = ['A', 'B', 'C', 'D']

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

const isAcceptedVariant = ref(null)
const isCorrectVariant = ref(null)
const doAnswer = (variant, variantKey) => {
  isAcceptedVariant.value = variantKey
  return new Promise(resolve => {
    setTimeout(resolve, 1000)

  })
    .then(response => {
      isCorrectVariant.value = currentQuestion.value.variants[1]
      return new Promise(resolve => setTimeout(resolve, 1000))
    })
    .then(() => {
      if (variant == currentQuestion.value.variants[1]) {
        stage.value++;
      }
      else stage.value=1
      Object.values(helpers).forEach(element => {
        element.isRun ? element.disactive() : null
      });
      isCorrectVariant.value = null
      isAcceptedVariant.value = null
    })
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
          <transition-group name="helpers">
            <button @click="help.activate()" :class="{ helpers }" :disabled="!help.isActive" v-for="help in helpers"
              :key="help.name">
              {{ help.name }}
            </button>
          </transition-group>
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
          <div class="button__wrap">
            <button @click="doAnswer(variant, variantKey)" class="question__variant"
              :class="{ 'question__variant--accepted': isAcceptedVariant === variantKey, 'question__variant--correctly': isCorrectVariant === variant }"
              v-for="(variant, variantKey) in currentQuestionVariants" :disabled="fiftyFiftyQuestionVariants[variantKey] == '' && helpers.half.isRun
                " :key="variant">
              <span v-if="fiftyFiftyQuestionVariants[variantKey] !== '' || !helpers.half.isRun">
                {{ variantQuestionSymbols[variantKey] }} :{{ index }}
                {{
                  variant
                }}</span>
              <span v-else>&nbsp;</span>
            </button>
          </div>
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

.question__wrapper {
  width: 50%;
}

.button__wrap {
  display: grid;
  grid-template-columns: 45% 45%;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  justify-items: stretch;
}

.question__variant {
  margin: 10px;
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 15px;
  color: #f9f9f9;
  background-color: rgb(7, 8, 70);
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

button {
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #18306d;
  color: #c6bfbf;
  transition: color .3s ease;
}

button:hover {
  color: #fff;
  outline: 1px solid rgb(192, 83, 43);
  background-color: rgb(192, 83, 43);

}

.helpers {
  margin: 5px;
  padding: 5px;
  transition: color .3s ease, outline .3s ease;
}

.question__variant--accepted {
background-color: rgb(255, 69, 0);
}

.question__variant--correctly {
  background-color: rgb(4, 133, 4);
}

.helpers-enter-active,
.helpers-leave-active {
  transition: all 0.3s ease-in-out;
}

.helpers-enter-from,
.helpers-leave-to {
  transform: translateX(30px);
  opacity: 0;
}</style>
