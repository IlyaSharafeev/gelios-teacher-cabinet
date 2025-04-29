<script setup lang="ts">
import { ref, computed } from 'vue';
import { VDataTable, VBtn } from 'vuetify/components';
import { RouterLink } from 'vue-router';
import { students } from '@/data/homework-page/students';

// Interface for directions
interface Direction {
  id: number;
  name: string;
  abbreviation: string;
}

// Filter states
const isCompleted = ref(false);
const selectedStudent = ref('all');
const selectedDirection = ref('all');
const dateRange = ref<string[]>(['', '']);

// Directions data
const directions: Direction[] = [
  { id: 1, name: 'Всі напрямки', abbreviation: 'ВСІ' },
  { id: 2, name: 'Швидкочитання', abbreviation: 'ШЧ' },
  { id: 3, name: 'Ментальна Арифметика', abbreviation: 'МА' },
  { id: 4, name: 'IT', abbreviation: 'IT' },
];

// Format date for display in DD/MM/YYYY
const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Ukrainian date formatter for table
const formatDate = (dateStr: string): string => {
  if (!dateStr) return ''; // Handle empty date for 'Всі учні'
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return ''; // Handle invalid dates
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('uk-UA', { month: 'long' }).format(date);
  const time = date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  return `${day} ${month} ${time}`;
};

// Clear date range
const clearDateRange = () => {
  dateRange.value = ['', ''];
};

// Table headers
const headers = [
  {
    title: 'Напрямок',
    key: 'direction',
    formatter: (value: string) => {
      const direction = directions.find((d) => d.name === value);
      return direction ? direction.abbreviation : value;
    },
  },
  { title: 'Учень', key: 'name' },
  { title: 'Завдання', key: 'task' },
  {
    title: 'Дата',
    key: 'date',
    formatter: (value: string) => formatDate(value),
  },
  { title: 'Прогрес', key: 'progress' },
];

// Computed filtered items
const filteredItems = computed(() => {
  return students.filter((item) => {
    // Skip 'Всі учні' for table display
    if (item.name === 'Всі учні') return false;
    const matchesCompleted = isCompleted.value ? item.completed : !item.completed;
    const matchesStudent = selectedStudent.value === 'all' || item.name === selectedStudent.value;
    const matchesDirection = selectedDirection.value === 'all' || item.direction === selectedDirection.value;
    const itemDate = item.date ? new Date(item.date) : null;
    const matchesDate =
        dateRange.value[0] === '' ||
        (itemDate &&
            !isNaN(itemDate.getTime()) &&
            dateRange.value[1] !== '' &&
            new Date(dateRange.value[0]) <= itemDate &&
            itemDate <= new Date(dateRange.value[1]));
    return matchesCompleted && matchesStudent && matchesDirection && matchesDate;
  });
});
</script>

<template>
  <div class="homework">
    <h1 class="homework__title">Домашня робота</h1>

    <!-- Filters -->
    <div class="homework__filters">
      <!-- Completed/Incomplete Switch -->
      <v-switch
          v-model="isCompleted"
          :label="isCompleted ? 'Виконані' : 'Не виконані'"
          class="homework__filter-switch"
          color="primary"
      ></v-switch>

      <!-- Student Dropdown -->
      <v-select
          v-model="selectedStudent"
          :items="students.map((s) => ({ title: s.name, value: s.name === 'Всі учні' ? 'all' : s.name }))"
          label="Учень"
          class="homework__filter-select"
          variant="outlined"
      ></v-select>

      <!-- Direction Dropdown -->
      <v-select
          v-model="selectedDirection"
          :items="directions.map((d) => ({ title: d.name, value: d.name === 'Всі напрямки' ? 'all' : d.name }))"
          label="Напрямок"
          class="homework__filter-select"
          variant="outlined"
      ></v-select>

      <!-- Date Range Picker -->
      <div class="homework__date-picker-wrapper">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-text-field
                v-bind="props"
                :model-value="dateRange[0] && dateRange[1] ? `${formatDisplayDate(dateRange[0])} - ${formatDisplayDate(dateRange[1])}` : ''"
                label="Період"
                class="homework__filter-date"
                variant="outlined"
                readonly
                placeholder="Оберіть період"
                :error-messages="dateRange[0] && !dateRange[1] ? ['Оберіть кінцеву дату'] : []"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="dateRange"
              range
              title="Оберіть період"
              class="homework__date-picker"
              :max="new Date().toISOString().split('T')[0]"
          ></v-date-picker>
        </v-menu>
        <v-btn
            v-if="dateRange[0] || dateRange[1]"
            color="primary"
            class="homework__clear-date-btn"
            @click="clearDateRange"
        >
          Очистити
        </v-btn>
      </div>
    </div>

    <!-- Homework Table -->
    <v-data-table
        :headers="headers"
        :items="filteredItems"
        class="homework__table"
        :items-per-page="10"
    >
      <!-- Custom slot for direction column to apply blue uppercase styling -->
      <template v-slot:item.direction="{ item }">
        <span class="homework__direction-abbr">
          {{ directions.find((d) => d.name === item.direction)?.abbreviation || item.direction }}
        </span>
      </template>
      <!-- Custom slot for progress column with router-link and icon -->
      <template v-slot:item.progress="{ item }">
        <router-link :to="`/homework/${item.id}`" class="homework__progress-link">
          Переглянути
          <v-icon class="homework__progress-icon">mdi-arrow-right</v-icon>
        </router-link>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped lang="scss">
.homework {
  padding: 20px;

  &__title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  &__filters {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  &__filter-switch {
    max-width: 200px;
  }

  &__filter-select {
    max-width: 250px;
  }

  &__filter-date {
    max-width: 300px;
  }

  &__date-picker-wrapper {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  &__clear-date-btn {
    margin-top: 8px;
  }

  &__table {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }

  &__direction-abbr {
    color: #1976d2; /* Vuetify primary blue */
    text-transform: uppercase;
    font-weight: 500;
  }

  &__progress-link {
    display: inline-flex;
    align-items: center;
    color: #1976d2; /* Vuetify primary blue */
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  &__progress-icon {
    margin-left: 4px;
    font-size: 16px;
  }
}
</style>