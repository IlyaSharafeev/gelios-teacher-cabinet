<script setup lang="ts">
import { ref, computed } from 'vue';
// import LanguageSelect from './LanguageSelect.vue'; // Assuming LanguageSelect.vue is in the same directory

// Mock data for students and directions
const students = [
  { id: 1, name: 'Олег Петренко', lessonsLeft: 32, directions: ['Математика', 'Фізика'] },
  { id: 2, name: 'Марія Іваненко', lessonsLeft: 5, directions: ['Хімія'] },
  { id: 3, name: 'Іван Коваленко', lessonsLeft: 3, directions: ['Біологія', 'Географія'] },
  { id: 4, name: 'Анна Сидоренко', lessonsLeft: 15, directions: ['Література'] },
  { id: 5, name: 'Павло Шевченко', lessonsLeft: 2, directions: ['Англійська мова', 'Історія'] },
];

const directions = [
  { label: 'Всі напрямки', value: 'all' },
  { label: 'Математика', value: 'Математика' },
  { label: 'Фізика', value: 'Фізика' },
  { label: 'Хімія', value: 'Хімія' },
  { label: 'Біологія', value: 'Біологія' },
  { label: 'Географія', value: 'Географія' },
  { label: 'Історія', value: 'Історія' },
  { label: 'Література', value: 'Література' },
  { label: 'Англійська мова', value: 'Англійська мова' },
];

const selectedDirection = ref(directions[0]);
const searchQuery = ref('');

const filteredStudents = computed(() => {
  return students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesDirection = selectedDirection.value.value === 'all' ||
        student.directions.includes(selectedDirection.value.value);
    return matchesSearch && matchesDirection;
  });
});
</script>

<template>
  <div class="students-page">
    <div class="header">
      <h1>Мої учні</h1>
      <div class="direction-filter">
<!--        <LanguageSelect-->
<!--            v-model="selectedDirection"-->
<!--            :modelValue="selectedDirection"-->
<!--        />-->
      </div>
    </div>
    <div class="search-container">
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
                {{ direction }}
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
  padding: 32px;
  background-color: #FFFFFF;
  border-radius: 32px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
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
  margin-bottom: 20px;
}

.search-input {
  width: 490px;
  padding: 12px 16px;
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

.table-container {
  background: #FFFFFF;
  border-radius: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 13px 20px;
  text-align: left;
  font-family: 'Onest', sans-serif;
  font-size: 16px;
  color: #333;
}

th {
  font-weight: 600
  border-bottom: 1px solid #ddd;
}s

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