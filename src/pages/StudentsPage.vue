<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

// Define Direction interface
interface Direction {
  id: number;
  name_key: string;
  abbreviation: string;
}

// Define Student interface
interface Student {
  id: number;
  name: string;
  lessonsLeft: number;
  direction: string;
  progress?: { completed: number; total: number }; // Optional progress data
}

// Mock data for students and directions
const students: Student[] = [
  { id: 1, name: 'Олег Петренко', lessonsLeft: 32, direction: 'speed_reading', progress: { completed: 20, total: 50 } },
  { id: 2, name: 'Марія Іваненко', lessonsLeft: 5, direction: 'mental_arithmetic', progress: { completed: 45, total: 50 } },
  { id: 3, name: 'Іван Коваленко', lessonsLeft: 3, direction: 'it', progress: { completed: 10, total: 50 } },
  { id: 4, name: 'Анна Сидоренко', lessonsLeft: 15, direction: 'speed_reading', progress: { completed: 30, total: 50 } },
  { id: 5, name: 'Павло Шевченко', lessonsLeft: 2, direction: 'mental_arithmetic', progress: { completed: 5, total: 50 } },
];

const directions: Direction[] = [
  { id: 1, name_key: 'all', abbreviation: 'ВСІ' },
  { id: 2, name_key: 'speed_reading', abbreviation: 'ШЧ' },
  { id: 3, name_key: 'mental_arithmetic', abbreviation: 'МА' },
  { id: 4, name_key: 'it', abbreviation: 'IT' },
];

const { t } = useI18n();

// Initialize selectedDirection to the value 'all'
const selectedDirection = ref('all');

const searchQuery = ref('');

const selectedStudent = ref<Student | null>(null);
const sidebarOpen = ref(false);

const filteredStudents = computed(() => {
  return students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesDirection = selectedDirection.value === 'all' || student.direction === selectedDirection.value;
    return matchesSearch && matchesDirection;
  });
});

const openSidebar = (student: Student) => {
  selectedStudent.value = student;
  sidebarOpen.value = true;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
  selectedStudent.value = null;
};
</script>

<template>
  <div class="students-page">
    <div class="header">
      <h1>{{ t('students_page.title') }}</h1>
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
          :placeholder="t('students_page.search_placeholder')"
          class="search-input"
      />
    </div>
    <div class="content-wrapper" :class="{ 'sidebar-open': sidebarOpen }">
      <div class="table-container">
        <table>
          <tbody>
          <tr v-for="student in filteredStudents" :key="student.id">
            <td>{{ student.name }}</td>
            <td :class="{ 'low-lessons': student.lessonsLeft <= 5 }">
              {{ t('students_page.lessons_remaining') }}: {{ student.lessonsLeft }} {{ student.lessonsLeft <= 5 ? t('students_page.lesson_singular') : t('students_page.lesson_plural') }}
            </td>
            <td>
              <span class="direction-tag">
                {{ t(`homework.directions.${student.direction}`) }}
              </span>
            </td>
            <td>
              <button class="progress-button" @click="openSidebar(student)">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8H14M8 2V14" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                {{ t('students_page.progress') }}
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="sidebarOpen" class="sidebar" :class="{ 'sidebar-open': sidebarOpen }">
        <div class="sidebar-content">
          <button class="close-sidebar" @click="closeSidebar">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L14 14M14 2L2 14" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <h2>{{ selectedStudent?.name }}</h2>
          <p>{{ t('students_page.direction') }}: {{ t(`homework.directions.${selectedStudent?.direction}`) }}</p>
          <p>{{ t('students_page.lessons_remaining') }}: {{ selectedStudent?.lessonsLeft }}</p>
          <p>{{ t('students_page.progress') }}: {{ selectedStudent?.progress?.completed }} / {{ selectedStudent?.progress?.total }} ({{ ((selectedStudent?.progress?.completed || 0) / (selectedStudent?.progress?.total || 1) * 100).toFixed(0) }}%)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.students-page {
  padding: 52px;
  background-color: #FFFFFF;
  border-radius: 32px;
  position: relative;
  overflow: hidden;
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
  box-shadow: 0 0 0 2px rgba(0, 102, 255, 25576);
}

.content-wrapper {
  position: relative;
  transition: width 0.3s ease;
}

.table-container {
  background: #FFFFFF;
  border-radius: 16px;
  transition: width 0.3s ease;
}

.sidebar-open .table-container {
  width: calc(100% - 300px);
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

.progress-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #E3ECF5;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-family: 'Onest', sans-serif;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background 0.2s;
}

.progress-button:hover {
  background: #D1E0F0;
}

.sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: #FFFFFF;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.sidebar-open {
  transform: translateX(0);
}

.sidebar-content {
  padding: 32px;
  font-family: 'Onest', sans-serif;
  color: #333;
}

.sidebar-content h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.sidebar-content p {
  font-size: 16px;
  margin-bottom: 8px;
}

.close-sidebar {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.homework__filter-select ::v-deep .v-field.v-field {
  border: 1.5px solid #30303D26 !important;
  border-radius: 12px;
}
</style>