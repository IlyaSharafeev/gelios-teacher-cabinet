<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

// Student interface
interface Student {
  id: number
  name: string
  lessonsLeft: number
  directions: string[]
}

// Mock student data
const students: Student[] = [
  { id: 1, name: 'John Doe', lessonsLeft: 3, directions: ['Math', 'Physics'] },
  { id: 2, name: 'Jane Smith', lessonsLeft: 7, directions: ['Chemistry', 'Biology'] },
  { id: 3, name: 'Bob Johnson', lessonsLeft: 5, directions: ['History', 'Literature'] },
  { id: 4, name: 'Alice Brown', lessonsLeft: 10, directions: ['Math', 'Computer Science'] },
]

// Reactive state
const searchQuery: Ref<string> = ref('')
const selectedStudent: Ref<Student | null> = ref(null)
const isSidebarOpen: Ref<boolean> = ref(false)

// Computed property for filtered students
const filteredStudents = computed(() => {
  if (!searchQuery.value) return students
  const query = searchQuery.value.toLowerCase()
  return students.filter(student =>
      student.name.toLowerCase().includes(query) ||
      student.directions.some(dir => dir.toLowerCase().includes(query))
  )
})

// Toggle sidebar and select student
const toggleSidebar = (student: Student) => {
  if (selectedStudent.value?.id === student.id && isSidebarOpen.value) {
    isSidebarOpen.value = false
    selectedStudent.value = null
  } else {
    selectedStudent.value = student
    isSidebarOpen.value = true
  }
}
</script>

<template>
  <div class="students-page flex h-full">
    <!-- Main content -->
    <div :class="['main-content', { 'w-3/4': isSidebarOpen, 'w-full': !isSidebarOpen }]">
      <!-- Search bar (styled like TrainerSelector) -->
      <div class="selector__search-container">
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
            placeholder="Search students..."
            class="selector__search-input"
        />
      </div>

      <!-- Students table -->
      <div class="overflow-x-auto mt-4">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
          <tr class="bg-gray-50">
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Student Name</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Lessons Left</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 w-1/3">Directions & Progress</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="student in filteredStudents" :key="student.id" class="border-t">
            <td class="px-6 py-4 text-sm text-gray-900">{{ student.name }}</td>
            <td class="px-6 py-4 text-sm" :class="{ 'text-red-500': student.lessonsLeft <= 5 }">
              {{ student.lessonsLeft }} {{ student.lessonsLeft === 1 ? 'lesson' : 'lessons' }} left
            </td>
            <td class="px-6 py-4 text-sm flex items-center gap-4">
              <div class="flex flex-wrap gap-2">
                <span
                    v-for="direction in student.directions"
                    :key="direction"
                    class="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                >
                  {{ direction }}
                </span>
              </div>
              <button
                  @click="toggleSidebar(student)"
                  class="flex items-center gap-1 text-blue-500 hover:text-blue-700 ml-auto"
              >
                <span>Progress</span>
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Sidebar -->
    <div
        v-if="isSidebarOpen"
        class="sidebar fixed top-0 right-0 h-full w-1/3 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto transform transition-transform duration-300"
        :class="{ 'translate-x-0': isSidebarOpen, 'translate-x-full': !isSidebarOpen }"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">{{ selectedStudent?.name }}'s Progress</h2>
        <button @click="isSidebarOpen = false" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div v-if="selectedStudent">
        <p class="text-sm text-gray-600 mb-2">
          Lessons Remaining: {{ selectedStudent.lessonsLeft }}
        </p>
        <p class="text-sm text-gray-600 mb-4">
          Directions: {{ selectedStudent.directions.join(', ') }}
        </p>
        <div class="progress-details">
          <h3 class="text-sm font-medium mb-2">Progress Overview</h3>
          <p class="text-sm text-gray-500 mb-4">
            Detailed progress information for {{ selectedStudent.name }} would be displayed here.
          </p>
          <!-- Additional space for progress information -->
          <div class="progress-content space-y-4">
            <div class="bg-white p-4 rounded-md shadow-sm">
              <h4 class="text-sm font-medium">Recent Achievements</h4>
              <p class="text-sm text-gray-500">
                Placeholder for achievements or milestones (e.g., completed lessons, grades).
              </p>
            </div>
            <div class="bg-white p-4 rounded-md shadow-sm">
              <h4 class="text-sm font-medium">Upcoming Goals</h4>
              <p class="text-sm text-gray-500">
                Placeholder for upcoming tasks or objectives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.students-page {
  height: 100%;
}

.main-content {
  transition: width 0.3s ease;
  padding: 1.5rem;
}

.sidebar {
  transition: transform 0.3s ease;
}

table {
  border-collapse: collapse;
}

th,
td {
  text-align: left;
}

.selector__search-container {
  position: relative;
  margin-top: 16px;
}

.selector__search-icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  padding: 12px 8px;
}

.selector__search-input {
  width: 100%;
  padding: 12px 42px;
  border: 1.5px solid #30303d26;
  border-radius: 12px;
  font-family: 'Onest', sans-serif;
  font-size: 16px;
}

.selector__search-input::placeholder {
  color: #aaa;
}

.selector__search-input:focus {
  outline: none;
}
</style>