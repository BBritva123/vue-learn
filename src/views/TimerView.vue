<script setup>
// import { useLocalStorage } from '@vueuse/core'

import { ref, computed } from 'vue';
import { useInterval } from '@vueuse/core'

const hours = ref('')
const minutes = ref(null)
const seconds = ref(null)
const i = ref(0)

const isStarted = ref(false)
const isRunning = ref(false)
const timerWork = ref(0)

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

const resumeTimer = () => {
  isRunning.value = true
  resume()
}

const pauseTimer = () => {
  isRunning.value = false
  pause()
}

const startTimer = () => {
  resumeTimer()
  timerWork.value = Date.UTC(1970, 0, 1, hours.value, minutes.value, seconds.value, 0)
  isStarted.value = true
  clearInputs()
}

const resetTimer = () => {
  pauseTimer()
  reset()
  timerWork.value = 0
  isStarted.value = false
}

</script>

<template>
  <main>

    <h1 class="header">VueJs Timer</h1>

    <div class="timer__wrapp">
      <label class="timer__label">
        <span>Часов</span>
        <input type="number" :disabled="isStarted" v-model.number="hours">
      </label>
      <label class="timer__label">
        <span>Минут</span>
        <input type="number" :disabled="isStarted" v-model.number="minutes">
      </label>
      <label class="timer__label">
        <span>Секунд</span>
        <input type="number" :disabled="isStarted" v-model.number="seconds">
      </label>
      <label class="timer__label">
        <span>Таймер</span>
        <input type="time" step="1" :disabled="isStarted" v-model="timesOfTimerInput">
      </label>
      <div class="timer__result">
{{ timesOfTimerInput }}
        <button :disabled="timesOfTimerInput==='00:00:00'" v-if="!isStarted" @click="startTimer">Start</button>
        <button v-else @click="resetTimer">Reset</button>
        <template v-if="isStarted">
          <button v-if="!isRunning" @click="resumeTimer">Resume</button>
          <button v-else @click="pauseTimer">Pause</button>
        </template>
      </div>
    </div>

    <div>
      {{ nowDateFormat(timerWork) }}
    </div>
  </main>
</template>

<style scoped>
.timer__label {
  display: flex;
  margin-bottom: 20px;
}

.timer__wrapp {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
