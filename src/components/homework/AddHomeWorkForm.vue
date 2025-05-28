<script setup lang="ts">
import {ref, computed, watch} from 'vue';
import StepNavigator from './StepNavigator.vue';
import StudentSelector from './StudentSelector.vue';
import TrainerSelector from './TrainerSelector.vue';
import SelectedStudents from './SelectedStudents.vue';
import DeadlinePicker from './DeadlinePicker.vue';
import type {Step, Student, Trainer, Direction} from '@/types';

// Stepper state:
const currentStep = ref<number>(1);
const steps: Step[] = [
  {id: 1, name: 'Мої учні, тренажери'},
  {id: 2, name: 'Налаштування'},
  {id: 3, name: 'Термін виконання'},
];

// Data:
const students: Student[] = [
  { id: 1, name: 'Олег Петренко' },
  { id: 2, name: 'Марія Іваненко' },
  { id: 3, name: 'Іван Коваленко' },
  { id: 4, name: 'Анна Сидоренко' },
  { id: 5, name: 'Павло Шевченко' },
  { id: 6, name: 'Софія Грищенко' },
  { id: 7, name: 'Михайло Лисенко' },
  { id: 8, name: 'Олена Кравець' },
  { id: 9, name: 'Дмитро Ткаченко' },
  { id: 10, name: 'Юлія Бондаренко' },
  { id: 11, name: 'Артем Мельник' },
  { id: 12, name: 'Катерина Зайцева' },
  { id: 13, name: 'Василь Поліщук' },
  { id: 14, name: 'Наталія Козак' },
  { id: 15, name: 'Сергій Романенко' },
  { id: 16, name: 'Аліна Шевчук' },
  { id: 17, name: 'Олександр Кравченко' },
  { id: 18, name: 'Вікторія Дубровська' },
  { id: 19, name: 'Максим Гончар' },
  { id: 20, name: 'Тетяна Литвин' },
  { id: 21, name: 'Роман Скрипка' },
  { id: 22, name: 'Ірина Власенко' },
  { id: 23, name: 'Богдан Марчук' },
  { id: 24, name: 'Оксана Левченко' },
  { id: 25, name: 'Андрій Дорошенко' },
  { id: 26, name: 'Людмила Савчук' },
  { id: 27, name: 'Володимир Гнатюк' },
  { id: 28, name: 'Єлизавета Соколова' },
  { id: 29, name: 'Денис Білоус' },
  { id: 30, name: 'Світлана Кравець' },
  { id: 31, name: 'Ярослав Олійник' },
  { id: 32, name: 'Христина Підлісецька' },
  { id: 33, name: 'Євгеній Ковальчук' },
  { id: 34, name: 'Валерія Степаненко' },
  { id: 35, name: 'Зоряна Михайлюк' },
  { id: 36, name: 'Назар Вовк' },
  { id: 37, name: 'Дарина Пономаренко' },
  { id: 38, name: 'Орест Клименко' },
  { id: 39, name: 'Мирослава Гаврилюк' },
  { id: 40, name: 'Тарас Довгаль' },
  { id: 41, name: 'Лілія Сеньків' },
  { id: 42, name: 'Ігор Яворський' },
  { id: 43, name: 'Ангеліна Романів' },
  { id: 44, name: 'Святослав Кушнір' },
  { id: 45, name: 'Марта Лозинська' },
  { id: 46, name: 'Віталій Семенюк' },
  { id: 47, name: 'Олеся Турчин' },
  { id: 48, name: 'Ростислав Бойко' },
  { id: 49, name: 'Соломія Данилюк' },
  { id: 50, name: 'Юрій Шевчук' }
];

const directions: Direction[] = [
  { id: 1, name: 'Математика' },
  { id: 2, name: 'Фізика' },
  { id: 3, name: 'Хімія' },
  { id: 4, name: 'Біологія' },
  { id: 5, name: 'Географія' },
  { id: 6, name: 'Історія' },
  { id: 7, name: 'Література' },
  { id: 8, name: 'Англійська мова' },
  { id: 9, name: 'Українська мова' },
  { id: 10, name: 'Інформатика' },
  { id: 11, name: 'Програмування' },
  { id: 12, name: 'Економіка' },
  { id: 13, name: 'Філософія' },
  { id: 14, name: 'Право' },
  { id: 15, name: 'Соціологія' },
  { id: 16, name: 'Психологія' },
  { id: 17, name: 'Мистецтво' },
  { id: 18, name: 'Музика' },
  { id: 19, name: 'Фізична культура' },
  { id: 20, name: 'Хореографія' },
  { id: 21, name: 'Французька мова' },
  { id: 22, name: 'Німецька мова' },
  { id: 23, name: 'Іспанська мова' },
  { id: 24, name: 'Астрономія' },
  { id: 25, name: 'Екологія' },
  { id: 26, name: 'Логіка' },
  { id: 27, name: 'Етика' },
  { id: 28, name: 'Культурологія' },
  { id: 29, name: 'Журналістика' },
  { id: 30, name: 'Дизайн' },
  { id: 31, name: 'Архітектура' },
  { id: 32, name: 'Медицина' },
  { id: 33, name: 'Маркетинг' },
  { id: 34, name: 'Фотографія' },
  { id: 35, name: 'Театральне мистецтво' },
  { id: 36, name: 'Китайська мова' },
  { id: 37, name: 'Фінанси' },
  { id: 38, name: 'Геологія' },
  { id: 39, name: 'Робототехніка' },
  { id: 40, name: 'Кінематографія' }
];

const trainers: Trainer[] = [
  { id: 1, name: 'Тренажер 1' },
  { id: 2, name: 'Тренажер 2' },
  { id: 3, name: 'Тренажер 3' },
  { id: 4, name: 'Тренажер 4' },
  { id: 5, name: 'Тренажер 5' },
  { id: 6, name: 'Тренажер 6' },
  { id: 7, name: 'Тренажер 7' },
  { id: 8, name: 'Математичний Квест' },
  { id: 9, name: 'Фізичний Експеримент' },
  { id: 10, name: 'Хімічна Лабораторія' },
  { id: 11, name: 'Біологічний Аналіз' },
  { id: 12, name: 'Географічна Вікторина' },
  { id: 13, name: 'Історичний Тур' },
  { id: 14, name: 'Літературний Аналіз' },
  { id: 15, name: 'Англійський Діалог' },
  { id: 16, name: 'Програмний Челендж' },
  { id: 17, name: 'Економічна Стратегія' },
  { id: 18, name: 'Психологічний Тест' },
  { id: 19, name: 'Музичний Тренажер' },
  { id: 20, name: 'Спортивний Випроб' }
];

// State for selections:
const selectedStudents = ref<number[]>([]);
const selectedDirections = ref<number[]>([]);
const selectedTrainer = ref<Trainer | null>(null);
const deadline = ref<string>('');

// Debug state changes:
watch(selectedStudents, (newValue) => {
  console.log('AddHomeWorkForm: selectedStudents updated:', newValue);
}, {deep: true});

watch(selectedTrainer, (newValue) => {
  console.log('AddHomeWorkForm: selectedTrainer updated:', newValue);
});

// Validation for Step 1:
const isStep1Valid = computed(() => {
  const isValid = selectedStudents.value.length > 0 && selectedTrainer.value !== null;
  console.log('isStep1Valid:', isValid, {students: selectedStudents.value, trainer: selectedTrainer.value});
  return isValid;
});

// Step navigation:
const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};
</script>

<template>
  <div class="homework-form">
    <!-- Page Header -->
    <div class="homework-form__header" v-if="currentStep > 1">
      <span class="homework-form__back-arrow" @click="prevStep">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </span>
      <h1 class="homework-form__header-title">{{ steps[currentStep - 1].name }}</h1>
    </div>

    <!-- Step 1: Мої учні, Тренажери -->
    <div v-if="currentStep === 1" class="step-content">
      <StudentSelector
          :items="students"
          v-model="selectedStudents"
          title="Мої учні"
          search-placeholder="Шукати учня"
          no-items-text="Учнів не знайдено"
          select-all-text="Вибрати всіх"
      />
      <TrainerSelector
          :items="trainers"
          v-model="selectedTrainer"
          title="Тренажери"
          search-placeholder="Шукати тренажер"
          no-items-text="Тренажерів не знайдено"
      />
    </div>

    <!-- Step 2: Налаштування -->
    <div v-if="currentStep === 2" class="step-content">
      <SelectedStudents
          :students="students"
          v-model="selectedStudents"
      />
    </div>

    <!-- Step 3: Термін виконання -->
    <div v-if="currentStep === 3" class="step-content">
      <DeadlinePicker v-model="deadline"/>
    </div>

    <StepNavigator
        :steps="steps"
        :current-step="currentStep"
        :is-next-disabled="currentStep === steps.length || (currentStep === 1 && !isStep1Valid)"
        @next="nextStep"
        @prev="prevStep"
    />
  </div>
</template>

<style lang="scss" scoped>
.homework-form {
  display: flex;
  flex-direction: column;
}

.homework-form__header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.homework-form__back-arrow {
  cursor: pointer;
  margin-right: 12px;
}

.homework-form__header-title {
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 32px;
  line-height: 24px;
  letter-spacing: -2%;
  color: #000;
}

.step-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 116px;
  grid-row-gap: 20px;
  margin-bottom: 20px;
}
</style>