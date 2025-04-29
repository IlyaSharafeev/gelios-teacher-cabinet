<script setup lang="ts">
import { ref, computed } from 'vue';
import { VDataTable, VBtn, VBtnToggle } from 'vuetify/components';
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
      <!-- Completed/Incomplete Toggle Button -->
      <v-btn-toggle
          v-model="isCompleted"
          mandatory
          class="homework__filter-toggle"
          color="primary"
      >
        <v-btn :value="false">Не виконані</v-btn>
        <v-btn :value="true">Виконані</v-btn>
      </v-btn-toggle>

      <!-- Student Dropdown -->
      <v-select
          v-model="selectedStudent"
          :items="students.map((s) => ({ title: s.name, value: s.name === 'Всі учні' ? 'all' : s.name }))"
          class="homework__filter-select"
          variant="outlined"
      >
        <template v-slot:append-inner="{ isActive }">
          <v-icon :class="{ 'rotate-icon': isActive }">mdi-chevron-down</v-icon>
        </template>
      </v-select>

      <!-- Direction Dropdown -->
      <v-select
          v-model="selectedDirection"
          :items="directions.map((d) => ({ title: d.name, value: d.name === 'Всі напрямки' ? 'all' : d.name }))"
          class="homework__filter-select"
          variant="outlined"
      >
        <template v-slot:append-inner="{ isActive }">
          <v-icon :class="{ 'rotate-icon': isActive }">mdi-chevron-down</v-icon>
        </template>
      </v-select>

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
        :disable-sort="true"
        :hide-default-footer="true"
        :hide-default-header="true"
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
  padding: 40px 48px;
  border-radius: 32px;
  background-color: #FFFFFF;

  &__title {
    margin-bottom: 40px;
    font-family: "Onest" sans-serif;
    font-weight: 500;
    font-size: 48px;
    line-height: 130%;
    letter-spacing: -2%;
  }

  &__filters {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  &__filter-toggle {
    :deep(.v-btn) {
      height: 44px !important;
      min-height: 44px !important;
    }
  }

  &__filter-select {
    max-width: 232px;

    :deep(.v-field) {
      height: 44px !important;
      border-radius: 12px;
      border: 1.5px solid #30303D26;
      outline: none;
    }

    :deep(.v-field__input) {
      height: 44px !important;
      padding: 0 12px !important;
      display: flex;
      align-items: center;
    }

    :deep(.v-field--focused) {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }

    /* Скрываем стандартную иконку */
    :deep(.v-field__append) {
      display: none !important; /* Скрываем весь контейнер дефолтной иконки */
    }

    /* Стили для новой иконки внутри инпута */
    :deep(.v-field__append-inner) {
      display: flex;
      align-items: center;
      padding-right: 12px;
    }

    :deep(.v-icon) {
      font-size: 20px;
      color: #30303D;
      transition: transform 0.2s ease; /* Плавная анимация вращения */
    }

    /* Переворот иконки при открытии селекта */
    :deep(.rotate-icon) {
      transform: rotate(180deg);
    }
  }

  &__filter-date {
    :deep(.v-field) {
      height: 44px !important;
    }

    :deep(.v-field__input) {
      height: 44px !important;
      padding: 0 12px !important;
      display: flex;
      align-items: center;
    }

    :deep(.v-field--focused) {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }

  &__date-picker-wrapper {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    width: 286px;
  }

  &__clear-date-btn {
    height: 44px !important;
    margin-top: 8px;
  }

  &__table {
    background-color: transparent;
  }

  :deep(.v-data-table-header) {
    display: none;
  }

  :deep(.v-data-table__tr:not(:first-child):not(:last-child)) {
    border-bottom: 1px solid #e0e0e0;
  }

  :deep(.v-data-table__td) {
    vertical-align: middle;
    padding: 20px 0;
  }

  &__direction-abbr {
    color: #1976d2;
    text-transform: uppercase;
    font-weight: 500;
  }

  &__progress-link {
    display: inline-flex;
    align-items: center;
    color: #1976d2;
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