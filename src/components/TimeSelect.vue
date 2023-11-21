<template>
  <div class="time-select">
    <!-- 时间选择组件的内容 -->
    <label for="time-select">Select a time:</label>
    <select id="time-select" v-model="selectedTime">
      <option v-for="time in times" :key="time">{{ time }}</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTime: 'Time 1', // The selected time will be stored here
      times: ['Time 1', 'Time 2','Time 3'], // List of available times
    };
  },
  watch: {
    selectedTime(newValue) {
      this.$emit('timeChange', newValue);
    },
  },
};
</script>

<style scoped>
.time-select {
  position: absolute;
  z-index: 2;
  top: 50px;
  left: 25px;
}
</style>
