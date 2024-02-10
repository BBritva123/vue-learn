<script setup>
// import { useLocalStorage } from '@vueuse/core'

import { ref, computed } from 'vue';
import { useInterval } from '@vueuse/core'

const hours = ref('')
const minutes = ref(null)
const seconds = ref(null)
const i = ref(0)
const isPaused = ref(false)
const isDisabled = ref(false)
const timerWork = ref(10 * 60 * 60 * 1000)

const nowDateFormat = new Intl.DateTimeFormat('ru-Ru', { timeZone: 'GMT', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }).format

const { counter, reset, pause, resume } = useInterval(1000, {
  controls: true,
  immediate: false,
  callback: count => timerWork.value > 0 ? timerWork.value -= 1000 : 0
})
counter.value = 10
const clearInputs = () => {
  hours.value = ''
  minutes.value = ''
  seconds.value = ''
}
const timesOfTimerInput = computed({
  get() {
    return [hours.value?.toString()?.padStart(2, "0"), minutes.value?.toString()?.padStart(2, "0"), seconds.value?.toString()?.padStart(2, "0")].join(':')
  },
  set(value) {
    const [hoursFunc, minutesFunc, secondsFunc] = value.split(':')
    hours.value = hoursFunc
    minutes.value = minutesFunc
    seconds.value = secondsFunc
  }
})

const startTimer = () => {
  timerWork.value = (new Date(Date.UTC(1970, 0, 1, hours.value, minutes.value, seconds.value, 0))).getTime()
  resume()
  // clearInputs()
}

</script>

<template>
  <main>
    <h1 class="header">VueJs Timer</h1>

    <div class="timer__wrapp">
      <label class="timer__label">
        <span>Часов</span>
        <input type="number" :disable="isDisabled" v-model="hours" @change="setTime">
      </label>
      <label class="timer__label">
        <span>Минут</span>
        <input type="number" :disable="isDisabled" v-model="minutes" @change="setTime">
      </label>
      <label class="timer__label">
        <span>Секунд</span>
        <input type="text" :disable="isDisabled" v-model="seconds" @change="setTime">
      </label>
      <label class="timer__label">
        <span>Таймер</span>
        <input type="time" step="1" :disable="isDisabled" v-model="timesOfTimerInput" @change="getTime">
      </label>
      <div class="timer__result">

        <button @click="startTimer()">Start</button>
        <button v-if="isPaused" @click=" resume(); isPaused=false">Resume</button>
        <button v-else @click=" pause(); isPaused=true">Pause</button>
        <button @click=" reset()">Reset</button>
      </div>
    </div>
    {{ counter }}
    {{ nowDateFormat(timerWork) }}
    <div></div>
{{ timerWork }}
  </main>
</template>

<style scoped>
.timer__label {
  display: flex;
  margin-bottom: 20px;
}
</style>
