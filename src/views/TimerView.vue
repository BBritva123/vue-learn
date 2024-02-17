<script setup>
import "@fontsource/dseg7-modern/700.css"
import "@fontsource-variable/roboto-flex"

import { ref, computed } from "vue"
import { useInterval } from "@vueuse/core"

const hours = ref(null)
const minutes = ref(null)
const seconds = ref(null)

const isStarted = ref(false)
const isRunning = ref(false)
const timerWork = ref(0)

const nowDateFormat = new Intl.DateTimeFormat("ru-Ru", {
  timeZone: "GMT",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
}).format

const { counter, reset, pause, resume } = useInterval(1000, {
  controls: true,
  immediate: false,
  callback: () => (timerWork.value > 0 ? (timerWork.value -= 1000) : resetTimer()),
})
counter.value = 10
const clearInputs = () => {
  hours.value = ""
  minutes.value = ""
  seconds.value = ""
}
const timesOfTimerInput = computed({
  get() {
    return [
      hours.value?.toString()?.padStart(2, "0"),
      minutes.value?.toString()?.padStart(2, "0"),
      seconds.value?.toString()?.padStart(2, "0"),
    ].join(":")
  },
  set(value) {
    const [hoursFunc, minutesFunc, secondsFunc] = value.split(":")
    hours.value = hoursFunc
    minutes.value = minutesFunc
    seconds.value = secondsFunc
  },
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
  timerWork.value = Date.UTC(
    1970,
    0,
    1,
    hours.value,
    minutes.value,
    seconds.value,
    0
  )
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
    <div class="timer__wrapp">
      <h1 class="header">VueJs Timer</h1>
      <label class="timer__label">
        <input
          v-if="!isStarted"
          type="time"
          v-model="timesOfTimerInput"
          step="1"
        />
        <input
          v-else
          type="time"
          :value="nowDateFormat(timerWork)"
          inert
          step="1"
        />
      </label>
      <div class="timer__result">
        <button
          type="button"
          v-if="!isStarted"
          :disabled="timesOfTimerInput === '00:00:00'"
          @click="startTimer"
        >
          Start
        </button>
        <button v-else type="button" @click="resetTimer">Reset</button>
        <template v-if="isStarted">
          <button v-if="!isRunning" type="button" @click="resumeTimer">
            Resume
          </button>
          <button v-else type="button" @click="pauseTimer">Pause</button>
        </template>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #2c2c2c;
  padding: 5em;
}

.header {
  font-family: "Roboto Flex Variable", sans-serif;
  font-size: 32px;
  color: #b3b3b3;
}

.timer__label {
  display: flex;
  margin-bottom: 2em;
  margin-right: -8.5em;
}

.timer__wrapp {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.timer__result {
  display: flex;
  gap: 2em;
  font-family: "DSEG7 Modern", sans-serif;
}

input[type="time"] {
  font-family: "DSEG7 Modern", sans-serif;
  font-size: 120px;
  color: #b3b3b3;
  border: none;
  background-color: #2c2c2c;
}

input[type="time"]::-webkit-datetime-edit-hour-field:focus,
input[type="time"]::-webkit-datetime-edit-minute-field:focus,
input[type="time"]::-webkit-datetime-edit-second-field:focus {
  background-color: grey;
  color: #2c2c2c;
}

input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(66%) sepia(0%) saturate(7414%) hue-rotate(30deg)
    brightness(119%) contrast(69%);
}

button[type="button"] {
  cursor: pointer;
  border: none;
  padding: 0px 12px;
  border-radius: 4px;
  box-shadow: #a1a1a1 0px 6px 0px;
  font-family: "Roboto Flex Variable", sans-serif;
  font-size: 22px;
  height: 55px;
  color: #2c2c2c;
  font-weight: bold;
  width: 200px;
  background-color: #b3b3b3;
  transition: color 0.5s ease-in-out 0s;
}

button[type="button"]:active {
  transform: translateY(6px);
  box-shadow: none;
}
</style>
