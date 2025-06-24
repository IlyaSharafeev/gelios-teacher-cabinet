<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

interface Direction {
  id: number;
  name_key: string;
  abbreviation: string;
}

interface Student {
  id: number;
  name: string;
  lessonsLeft: number;
  direction: string;
  progress?: { completed: number; total: number };
}

interface Skill {
  name: string;
  value: number;
}

interface SkillsData {
  [key: string]: Skill[];
}

const { t } = useI18n();

const students: Student[] = [
  { id: 1, name: 'Олег Петренко', lessonsLeft: 32, direction: 'speed_reading', progress: { completed: 20, total: 50 } },
  { id: 2, name: 'Марія Іваненко', lessonsLeft: 5, direction: 'mental_arithmetic', progress: { completed: 45, total: 50 } },
  { id: 3, name: 'Іван Коваленко', lessonsLeft: 3, direction: 'ukrainian_language', progress: { completed: 10, total: 50 } },
  { id: 4, name: 'Анна Сидоренко', lessonsLeft: 15, direction: 'speech_therapy', progress: { completed: 30, total: 50 } },
  { id: 5, name: 'Павло Шевченко', lessonsLeft: 2, direction: 'mathematics', progress: { completed: 5, total: 50 } },
  { id: 6, name: 'Софія Гриценко', lessonsLeft: 10, direction: 'it_gelios_start', progress: { completed: 15, total: 50 } },
  { id: 7, name: 'Дмитро Лисенко', lessonsLeft: 8, direction: 'multiplication_division', progress: { completed: 25, total: 50 } },
  { id: 8, name: 'Олена Бондаренко', lessonsLeft: 12, direction: 'school_preparation', progress: { completed: 35, total: 50 } },
];

const directions: Direction[] = [
  { id: 1, name_key: 'all', abbreviation: t('homework.directions.abbreviations.all') },
  { id: 2, name_key: 'speed_reading', abbreviation: t('homework.directions.abbreviations.speed_reading') },
  { id: 3, name_key: 'mental_arithmetic', abbreviation: t('homework.directions.abbreviations.mental_arithmetic') },
  { id: 4, name_key: 'ukrainian_language', abbreviation: t('homework.directions.abbreviations.ukrainian_language') },
  { id: 5, name_key: 'speech_therapy', abbreviation: t('homework.directions.abbreviations.speech_therapy') },
  { id: 6, name_key: 'mathematics', abbreviation: t('homework.directions.abbreviations.mathematics') },
  { id: 7, name_key: 'it_gelios_start', abbreviation: t('homework.directions.abbreviations.it_gelios_start') },
  { id: 8, name_key: 'multiplication_division', abbreviation: t('homework.directions.abbreviations.multiplication_division') },
  { id: 9, name_key: 'school_preparation', abbreviation: t('homework.directions.abbreviations.school_preparation') },
];

const selectedDirection = ref('all');
const searchQuery = ref('');
const selectedStudent = ref<Student | null>(null);
const sidebarOpen = ref(false);
const activeTab = ref('МА');

const skillsData = ref<SkillsData>({
  speed_reading: [
    { name: 'Кіберкішка', value: 32 },
    { name: 'Флеш карти', value: 10 },
    { name: 'Знайди пару', value: 6 },
    { name: 'Splitz', value: -12 },
    { name: 'Таблиця Шульте', value: 15 },
    { name: 'Тексти', value: -16 },
  ],
  mental_arithmetic: [
    { name: 'Швидкий рахунок', value: 28 },
    { name: 'Ментальні карти', value: 14 },
    { name: 'Логічні задачі', value: -5 },
    { name: 'Арифметика', value: 20 },
  ],
  ukrainian_language: [
    { name: 'Граматика', value: 25 },
    { name: 'Орфографія', value: 18 },
    { name: 'Синтаксис', value: -8 },
  ],
  speech_therapy: [
    { name: 'Артикуляція', value: 30 },
    { name: 'Дихання', value: 12 },
    { name: 'Фонетика', value: 15 },
  ],
  mathematics: [
    { name: 'Алгебра', value: 22 },
    { name: 'Геометрія', value: -10 },
    { name: 'Задачі', value: 18 },
  ],
  it_gelios_start: [
    { name: 'Кодинг', value: 35 },
    { name: 'Алгоритми', value: 20 },
    { name: 'Дебагінг', value: -15 },
  ],
  multiplication_division: [
    { name: 'Таблиця множення', value: 27 },
    { name: 'Ділення', value: 16 },
    { name: 'Фракції', value: -7 },
  ],
  school_preparation: [
    { name: 'Читання', value: 33 },
    { name: 'Письмо', value: 19 },
    { name: 'Лічба', value: 10 },
  ],
});

const filteredStudents = computed(() => {
  return students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesDirection = selectedDirection.value === 'all' || student.direction === selectedDirection.value;
    return matchesSearch && matchesDirection;
  });
});

const currentSkills = computed(() => {
  const direction = directions.find(d => d.abbreviation === activeTab.value)?.name_key
      || selectedStudent.value?.direction
      || 'speed_reading';
  return skillsData.value[direction];
});

const openSidebar = (student: Student, viaTag: boolean = false, tagAbbreviation: string | null = null) => {
  selectedStudent.value = student;
  sidebarOpen.value = true;
  const direction = directions.find(d => d.name_key === student.direction);
  activeTab.value = viaTag && tagAbbreviation ? tagAbbreviation : direction?.abbreviation || 'МА';
};

const closeSidebar = () => {
  sidebarOpen.value = false;
  selectedStudent.value = null;
};
</script>

<template>
  <div class="students-page-wrapper">
    <div class="students-page">
      <div class="content-wrapper" :class="{ 'sidebar-open': sidebarOpen }">
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
        <div class="table-container">
          <table>
            <tbody>
            <tr v-for="student in filteredStudents" :key="student.id">
              <td class="name-cell">
                <v-tooltip v-if="student.lessonsLeft <= 5" :text="`${student.lessonsLeft} ${student.lessonsLeft === 1 ? t('students_page.lesson_singular') : t('students_page.lesson_plural')} ${t('students_page.remaining')}`" location="top">
                  <template v-slot:activator="{ props }">
                    <span v-bind="props" class="info-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="7" stroke="#30303D" stroke-width="1.5"/>
                        <path d="M8 12V7M8 5V4" stroke="#30303D" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                    </span>
                  </template>
                </v-tooltip>
                {{ student.name }}
              </td>
              <td class="progress-direction">
                <span
                    class="direction-tag"
                    :class="`direction-${student.direction}`"
                    @click="openSidebar(student, true, directions.find(d => d.name_key === student.direction)?.abbreviation)"
                >
                  {{ directions.find(d => d.name_key === student.direction)?.abbreviation || '' }}
                </span>
              </td>
              <td class="progress-td">
                <button class="progress-button" @click="openSidebar(student)">
                  {{ t('students_page.student_progress') }}
                  <div class="external-link-icon"></div>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <aside class="sidebar" v-if="sidebarOpen" :class="{ 'sidebar-open': sidebarOpen }">
      <div class="dashboard-card">
        <div class="dashboard__header">
          <button class="dashboard__close-btn" @click="closeSidebar()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L14 14M14 2L2 14" stroke="#333333" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div class="dashboard__name">{{ selectedStudent?.name || 'N/A' }}</div>
          <div class="dashboard__switcher">
            <button
                v-for="dir in directions.filter(d => d.name_key !== 'all' && (d.name_key === selectedStudent?.direction || d.abbreviation === activeTab))"
                :key="dir.id"
                :class="['switch-btn', { active: activeTab === dir.abbreviation }]"
                @click="activeTab = dir.abbreviation"
            >
              {{ dir.abbreviation }}
            </button>
          </div>
        </div>

        <div class="dashboard__stats">
          <div class="stat">
            <div class="stat__num">{{ selectedStudent?.progress?.completed || 0 }}</div>
            <div class="stat__desc" v-html="t('students_page.lessons_completed')"></div>
          </div>
          <div class="stat">
            <div class="stat__num">{{ selectedStudent?.progress?.total || 0 }}</div>
            <div class="stat__desc" v-html="t('students_page.homework_assignments')"></div>
          </div>
          <div class="stat">
            <div class="stat__num stat__num--blue">{{ selectedStudent?.lessonsLeft || 0 }}</div>
            <div class="stat__desc" v-html="t('students_page.lessons_remaining_desc')"></div>
          </div>
        </div>

        <div class="dashboard__hw">
          <div class="hw__title">{{ t('students_page.homework_title') }}</div>
          <div class="progress-bar">
            <div class="progress-bar__done"
                 :style="{ width: selectedStudent?.progress?.total ? `${(selectedStudent.progress.completed / selectedStudent.progress.total) * 100}%` : '0%' }">
              <span class="hw__done-num">{{ selectedStudent?.progress?.completed || 0 }}</span>
            </div>
            <div class="progress-bar__fail"
                 :style="{ width: selectedStudent?.progress?.total ? `${((selectedStudent.progress.total - selectedStudent.progress.completed) / selectedStudent.progress.total) * 100}%` : '0%' }">
              <span class="hw__fail-num">{{
                  selectedStudent?.progress?.total ? selectedStudent.progress.total - selectedStudent.progress.completed : 0
                }}</span>
            </div>
          </div>
          <div class="hw__legend">
            <div class="hw__dot-container">
              <span class="hw__dot hw__dot--done"></span> <span class="hw__dot-text">{{ t('students_page.completed') }}</span>
            </div>
            <div class="hw__dot-container">
              <span class="hw__dot hw__dot--fail"></span> <span class="hw__dot-text">{{ t('students_page.not_completed') }}</span>
            </div>
          </div>
        </div>

        <div class="dashboard__skills">
          <div class="skills__title">{{ t('students_page.skills_title') }}</div>
          <div class="skills__list">
            <div class="skill-row" v-for="skill in currentSkills" :key="skill.name">
              <div class="skill-text">
                <div class="skill__name">{{ skill.name }}</div>
                <div class="skill__value" :class="{ minus: skill.value < 0 }">
                  {{ skill.value > 0 ? '+' : '' }}{{ skill.value }}%
                </div>
              </div>
              <div class="skill__progress">
                <div class="skill__bar-bg">
                  <div
                      class="skill__bar-fg"
                      :style="{ width: Math.abs(skill.value) + '%', background: skill.value >= 0 ? '#2377FC' : '#FF5050' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped lang="scss">
$color-speed-reading: rgba(36, 124, 255, 0.15);
$color-mental-arithmetic: rgba(255, 132, 197, 0.15);
$color-ukrainian-language: rgba(247, 220, 1, 0.15);
$color-speech-therapy: #f4e0b2;
$color-mathematics: rgba(255, 132, 197, 0.15);
$color-it-gelios-start: #ddeaf6;
$color-multiplication-division: #b5f89b;
$color-school-preparation: #d5b1f4;

.students-page-wrapper {
  position: relative;
  display: flex;
}

.students-page {
  padding: 52px;
  background-color: #FFFFFF;
  border-radius: 32px;
  position: relative;
  overflow: hidden;
  flex: 1;
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
  box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.3);
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

.content-wrapper.sidebar-open {
  width: calc(100% - 552px);
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

.name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-icon {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #f0f0f0;
  transition: background 0.2s;
}

.info-icon:hover {
  background: #e0e0e0;
}

.progress-td {
  display: flex;
  gap: 20px;
  align-items: center;
}

.direction-tag {
  display: inline-block;
  border-radius: 29px;
  padding: 5px 9px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.2s;
}

.direction-tag:hover {
  opacity: 0.8;
}

.direction-speed_reading {
  background: $color-speed-reading;
  color: #1875FF;
}

.direction-mental_arithmetic {
  background: $color-mental-arithmetic;
  color: #FF54AE;
}

.direction-ukrainian_language {
  background: $color-ukrainian-language;
  color: #DE7600;
}

.direction-speech_therapy {
  background: $color-speech-therapy;
  color: #DE7600;
}

.direction-mathematics {
  background: $color-mathematics;
  color: #FF54AE;
}

.direction-it_gelios_start {
  background: $color-it-gelios-start;
  color: #007bff;
}

.direction-multiplication_division {
  background: $color-multiplication-division;
  color: #4e754e;
}

.direction-school_preparation {
  background: $color-school-preparation;
  color: purple;
}

.progress-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-family: 'Onest', sans-serif;
  color: #0066FF;
  cursor: pointer;
  transition: background 0.2s;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.external-link-icon {
  background-image: url("@/assets/images/icons/external-link.png");
  background-position: center;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
}

.progress-button:hover {
  background: #D1E0F0;
}

.sidebar {
  width: 552px;
  background: #f7fafd;
  border-radius: 20px;
  padding: 32px;
  font-family: 'Inter', sans-serif;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.sidebar-open {
  transform: translateX(0);
}

.dashboard-card {
  width: 100%;
}

.dashboard__header {
  position: relative;
}

.dashboard__name {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 44px;
  font-family: Onest;
  font-weight: 500;
  font-size: 32px;
  line-height: 24px;
  letter-spacing: -2%;
}

.dashboard__close-btn {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.dashboard__switcher {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
}

.switch-btn {
  padding: 10px 57px;
  border-radius: 12px;
  border: none;
  background: #eaeef2;
  color: #2377fc;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.switch-btn.active {
  background: #2377fc;
  color: #fff;
}

.dashboard__stats {
  display: flex;
  gap: 24px;
  background: #F2F2F2;
  border-radius: 18px;
  padding: 20px 0;
  margin-bottom: 36px;
  justify-content: space-around;
}

.stat__num {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 2px;
  font-family: Onest;
  font-weight: 500;
  font-size: 50px;
  line-height: 100%;
  letter-spacing: -2%;
}

.stat__num--blue {
  color: #2377fc;
}

.stat__desc {
  font-size: 13px;
  color: #999;
  font-weight: 400;
  line-height: 1.2;
  font-family: Onest;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
}

.hw__title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  font-family: Onest;
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0%;
}

.progress-bar {
  width: 100%;
  height: 24px;
  border-radius: 9px;
  display: flex;
  gap: 8px;
  overflow: hidden;
}

.progress-bar__done {
  background: #42c848;
  height: 100%;
  border-radius: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Onest;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
}

.progress-bar__fail {
  background: #ff5050;
  height: 100%;
  border-radius: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Onest;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
}

.hw__legend {
  display: flex;
  gap: 24px;
  font-size: 13px;
  margin-top: 16px;
}

.hw__dot-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hw__dot {
  display: flex;
  flex-direction: row;
  width: 22px;
  height: 22px;
  border-radius: 50%;
}

.hw__dot-text {
  font-family: Onest;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0%;
  color: #30303D;
}

.hw__dot--done {
  background: #42c848;
}

.hw__dot--fail {
  background: #ff5050;
}

.hw__stats {
  font-size: 14px;
  font-weight: 500;
  display: flex;
  gap: 10px;
  margin-top: 3px;
}

.hw__done-num {
  color: #fff;
}

.hw__fail-num {
  color: #fff;
}

.dashboard__skills {
  margin-top: 36px;
}

.skills__title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  font-family: Onest;
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0%;
}

.skill-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Onest", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0%;
  color: #30303D;
}

.skills__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
}

.skill-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  gap: 12px;
}

.skill__name {
  flex: 0 0 120px;
  font-family: Onest;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0%;
}

.skill__progress {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8px;
}

.skill__bar-bg {
  width: 100%;
  height: 24px;
  border-radius: 44px;
  background: #eaeef2;
  overflow: hidden;
  position: relative;
}

.skill__bar-fg {
  height: 100%;
  border-radius: 44px;
}

.skill__value {
  min-width: 50px;
  text-align: right;
  font-size: 14px;
  font-weight: 500;
}

.skill__value.minus {
  color: #ff5050;
}

.homework__filter-select ::v-deep .v-field.v-field {
  border: 1.5px solid #30303D26 !important;
  border-radius: 12px;
}
</style>