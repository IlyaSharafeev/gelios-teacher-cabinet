<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

// Define Direction interface
interface Direction {
  id: number;
  name_key: string;
  abbreviation: string;
}

// Mock data for students and directions
const students = [
  { id: 1, name: 'Олег Петренко', lessonsLeft: 32, directions: ['speed_reading', 'mental_arithmetic'] },
  { id: 2, name: 'Марія Іваненко', lessonsLeft: 5, directions: ['mental_arithmetic'] },
  { id: 3, name: 'Іван Коваленко', lessonsLeft: 3, directions: ['it'] },
  { id: 4, name: 'Анна Сидоренко', lessonsLeft: 15, directions: ['speed_reading'] },
  { id: 5, name: 'Павло Шевченко', lessonsLeft: 2, directions: ['it', 'mental_arithmetic'] },
];

const directions: Direction[] = [
  { id: 1, name_key: 'all', abbreviation: 'ВСІ' },
  { id: 2, name_key: 'speed_reading', abbreviation: 'ШЧ' },
  { id: 3, name_key: 'mental_arithmetic', abbreviation: 'МА' },
  { id: 4, name_key: 'it', abbreviation: 'IT' },
];

const { t } = useI18n();

// Initialize selectedDirection to the value 'all' instead of the object
const selectedDirection = ref('all');

const searchQuery = ref('');

const filteredStudents = computed(() => {
  return students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesDirection = selectedDirection.value === 'all' ||
        student.directions.includes(selectedDirection.value);
    return matchesSearch && matchesDirection;
  });
});
</script>

<template>
  <div class="students-page">
    <div class="header">
      <h1>Мої учні</h1>
      <div class="direction-filter">
        <v-select
            v-model="selectedDirection"
            :items="directions.map((d) => ({ title: t(`homework.directions.${d.name_key}`), value: d.name_key === 'all' ? 'all' : d.name_key }))"
            class="homework__filter-select"
            variant="plain"
        >
        </v-select>
      </div>
    </div>
    <div class="search-container">
      <span class="selector__search-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
              stroke="#30303D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Шукати учня"
          class="search-input"
      />
    </div>
    <div class="table-container">
      <table>
        <tbody>
        <tr v-for="student in filteredStudents" :key="student.id">
          <td>{{ student.name }}</td>
          <td :class="{ 'low-lessons': student.lessonsLeft <= 5 }">
            Залишилось: {{ student.lessonsLeft }} {{ student.lessonsLeft <= 5 ? 'уроків' : 'уроки' }}
          </td>
          <td>
              <span
                  v-for="direction in student.directions"
                  :key="direction"
                  class="direction-tag"
              >
                {{ t(`homework.directions.${direction}`) }}
              </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.students-page {
  padding: 52px;
  background-color: #FFFFFF;
  border-radius: 32px;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

h1 {
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 32px;
  color: #333;
  margin-right: 20px;
}

.direction-filter {
  width: 200px;
}

.search-container {
  position: relative;
  margin-bottom: 20px;
}

.selector__search-icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  padding: 12px 8px;
}

.search-input {
  width: 490px;
  padding: 12px 16px;
  padding-left: 42px;
  border: 1.5px solid #30303D26;
  border-radius: 12px;
  font-family: 'Onest', sans-serif;
  font-size: 16px;
  color: #333;
  background: white;
}

.search-input::placeholder {
  color: #999;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.2);
}

.table-container {
  background: #FFFFFF;
  border-radius: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 20px;
  text-align: left;
  font-family: 'Onest', sans-serif;
  font-size: 16px;
  color: #333;
}

th {
  font-weight: 600;
  border-bottom: 1px solid #ddd;
}

.low-lessons {
  color: #FF0000;
}

.direction-tag {
  display: inline-block;
  background: #E3ECF5;
  border-radius: 12px;
  padding: 4px 12px;
  margin-right: 8px;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
</style>