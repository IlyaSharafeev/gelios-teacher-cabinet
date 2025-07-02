<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const model = defineModel<string>({ required: true });

const selectedDate = ref('');
const selectedTime = ref('00:00'); // Default time to midnight

// When the model changes externally, update internal refs
watch(model, (newValue) => {
  if (newValue) {
    const dateTime = new Date(newValue);
    selectedDate.value = dateTime.toISOString().split('T')[0]; // YYYY-MM-DD
    selectedTime.value = dateTime.toTimeString().substring(0, 5); // HH:MM
  }
}, { immediate: true });

// When internal refs change, update the model
watch([selectedDate, selectedTime], ([date, time]) => {
  if (date && time) {
    // Combine date and time into a single ISO string for consistent backend submission
    model.value = new Date(`${date}T${time}:00`).toISOString();
  } else {
    model.value = ''; // Or handle cases where date/time might be incomplete
  }
});

// Generate time options for hours and minutes
const hoursOptions = computed(() => {
  return Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
});

const minutesOptions = computed(() => {
  return Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
});
</script>

<template>
  <div class="deadline-picker">
    <div class="deadline-picker__inputs">
      <input
          v-model="selectedDate"
          type="date"
          class="deadline-picker__date-input"
          placeholder="Оберіть дату"
      />
      <div class="deadline-picker__time-inputs">
        <select v-model="selectedTime.split(':')[0]" @change="selectedTime = `${$event.target.value}:${selectedTime.split(':')[1]}`" class="deadline-picker__time-select">
          <option v-for="hour in hoursOptions" :key="hour" :value="hour">{{ hour }}</option>
        </select>
        <span>:</span>
        <select v-model="selectedTime.split(':')[1]" @change="selectedTime = `${selectedTime.split(':')[0]}:${$event.target.value}`" class="deadline-picker__time-select">
          <option v-for="minute in minutesOptions" :key="minute" :value="minute">{{ minute }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.deadline-picker {
  grid-column: 1 / 2;
  margin-top: 34px;

  .deadline-picker__inputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .deadline-picker__date-input,
  .deadline-picker__time-select {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #30303d26;
    border-radius: 12px;
    font-family: 'Onest', sans-serif;
    font-size: 16px;
    appearance: none; /* Remove default select arrow */
    background-color: white;

    &:focus {
      outline: none;
      border-color: #0066ff;
    }
  }

  .deadline-picker__time-inputs {
    display: flex;
    align-items: center;
    gap: 8px; /* Gap between hours, colon, and minutes */

    .deadline-picker__time-select {
      flex: 1; /* Distribute width equally */
      text-align: center;
      padding-right: 30px; /* Make space for custom arrow if needed */
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 12px;
    }

    span {
      font-family: 'Onest', sans-serif;
      font-size: 18px;
      font-weight: 500;
      color: #333;
    }
  }
}
</style>