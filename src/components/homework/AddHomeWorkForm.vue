<script setup lang="ts">
import { reactive, computed } from 'vue';
import StepNavigator from './StepNavigator.vue';
import StudentSelector from './StudentSelector.vue';
import TrainerSelector from './TrainerSelector.vue';
import DeadlinePicker from './DeadlinePicker.vue';
import successImage from '@/assets/backgrounds/certification/success.png';

// Import images for trainers
import trainer1 from '@/assets/backgrounds/trainers/1.png';
import trainer2 from '@/assets/backgrounds/trainers/2.png';
import trainer3 from '@/assets/backgrounds/trainers/3.png';
import trainer4 from '@/assets/backgrounds/trainers/4.png';
import trainer5 from '@/assets/backgrounds/trainers/5.png';
import trainer6 from '@/assets/backgrounds/trainers/6.png';
import trainer7 from '@/assets/backgrounds/trainers/7.png';
import trainer8 from '@/assets/backgrounds/trainers/8.png';
import trainer9 from '@/assets/backgrounds/trainers/9.png';
import trainer10 from '@/assets/backgrounds/trainers/10.png';
import trainer11 from '@/assets/backgrounds/trainers/11.png';
import trainer12 from '@/assets/backgrounds/trainers/12.png';
import trainer13 from '@/assets/backgrounds/trainers/13.png';
import trainer14 from '@/assets/backgrounds/trainers/14.png';
import trainer15 from '@/assets/backgrounds/trainers/15.png';
import trainer16 from '@/assets/backgrounds/trainers/16.png';

const currentStep = reactive({ value: 1 });
const steps = [
  { id: 1, name: 'Мої учні, тренажери' },
  { id: 2, name: 'Тренажер' },
  { id: 3, name: 'Термін виконання' },
  { id: 4, name: 'Завдання додане' },
];

const students = [
  { id: 1, name: 'Олег Петренко' },
  // ... остальные студенты остаются без изменений
  { id: 50, name: 'Юрій Шевчук' },
];

const trainers = [
  { id: 1, name: 'Знайди пару', image: trainer1, iframeUrl: import.meta.env.VITE_ABACUS_URL },
  { id: 2, name: 'Техніка швидкості читання', image: trainer2, iframeUrl: import.meta.env.VITE_ALPHABET_URL },
  { id: 3, name: 'Таблиця Шульте', image: trainer3, iframeUrl: import.meta.env.VITE_SCHULTE_TABLE_URL },
  { id: 4, name: 'Splitz', image: trainer4, iframeUrl: import.meta.env.VITE_SPRITZ_URL },
  { id: 5, name: 'Ментальний рахунок', image: trainer5, iframeUrl: import.meta.env.VITE_SPEED_MATH_URL },
  { id: 6, name: 'Філворди', image: trainer6, iframeUrl: import.meta.env.VITE_FILLWORDS_URL },
  { id: 7, name: 'Тест Струпа', image: trainer7, iframeUrl: import.meta.env.VITE_STROOP_TEST_URL },
  { id: 8, name: 'Алфавіт', image: trainer8, iframeUrl: import.meta.env.VITE_ALPHABET_URL },
  { id: 9, name: 'Знайди слово', image: trainer9, iframeUrl: import.meta.env.VITE_FIND_THE_WORD_URL },
  { id: 10, name: 'Тексти', image: trainer10, iframeUrl: import.meta.env.VITE_TEXTS_URL },
  { id: 11, name: 'Кіберкішка', image: trainer11, iframeUrl: import.meta.env.VITE_DINO_URL },
  { id: 12, name: 'Флешкартки', image: trainer12, iframeUrl: import.meta.env.VITE_FLASH_CARDS_URL },
  { id: 13, name: 'Абакус', image: trainer13, iframeUrl: import.meta.env.VITE_ABACUS_URL },
  { id: 14, name: 'Знайди кіберкішка', image: trainer14, iframeUrl: import.meta.env.VITE_FIND_THE_CYBER_CAT_URL },
  { id: 15, name: 'Мнемотехніка', image: trainer15, iframeUrl: import.meta.env.VITE_MNEMONICS_URL },
  { id: 16, name: 'Стовпчики', image: trainer16, iframeUrl: import.meta.env.VITE_COLUMNS_URL },
];

const selectedStudents = reactive({ value: [] as number[] });
const selectedTrainer = reactive({ value: null as { id: number; name: string; image?: string; iframeUrl: string } | null });
const deadline = reactive({ value: '' });

const isStep1Valid = computed(() => {
  return selectedStudents.value.length > 0 && selectedTrainer.value !== null;
});

const isStep3Valid = computed(() => {
  return deadline.value !== '';
});

const selectedStudentsNames = computed(() => {
  return selectedStudents.value
      .map(id => students.find(student => student.id === id)?.name)
      .filter(name => name !== undefined)
      .join(', ');
});

const resetForm = () => {
  selectedStudents.value = [];
  selectedTrainer.value = null;
  deadline.value = '';
  currentStep.value = 1;
};

const addHomework = () => {
  if (isStep3Valid.value) {
    currentStep.value = 4;
    resetForm();
  }
};

const addMoreHomework = () => {
  resetForm();
};

const nextStep = () => {
  if (currentStep.value === 1 && !isStep1Valid.value) return;
  if (currentStep.value === 3 && !isStep3Valid.value) return;
  if (currentStep.value < steps.length - 1) {
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
    <div class="homework-form__header" v-if="currentStep.value > 1">
      <span class="homework-form__back-arrow" @click="prevStep">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <h1 class="homework-form__header-title">{{ steps[currentStep.value - 1].name }}</h1>
    </div>

    <div v-if="currentStep.value === 1" class="step-content">
      <StudentSelector
          :items="students"
          v-model="selectedStudents.value"
          title="Мої учні"
          search-placeholder="Шукати учня"
          no-items-text="Учнів не знайдено"
          select-all-text="Вибрати всіх"
      />
      <TrainerSelector
          :items="trainers"
          v-model="selectedTrainer.value"
          title="Тренажери"
          search-placeholder="Шукати тренажер"
          no-items-text="Тренажерів не знайдено"
      >
        <template #option="{ item }">
          <div class="trainer-option">
            <img
                v-if="item.image"
                :src="item.image"
                alt="Trainer Image"
                class="trainer-image"
            />
            <span>{{ item.name }}</span>
          </div>
        </template>
      </TrainerSelector>
    </div>

    <div v-if="currentStep.value === 2" class="step-content">
      <div class="selected-students">
        <h2 class="selected-students__title">Вибрані учні</h2>
        <p>{{ selectedStudentsNames }}</p>
      </div>
      <iframe
          v-if="selectedTrainer.value?.iframeUrl"
          :src="selectedTrainer.value.iframeUrl"
          class="trainer-iframe"
          frameborder="0"
          allowfullscreen
      ></iframe>
    </div>

    <div v-if="currentStep.value === 3" class="step-content">
      <DeadlinePicker v-model="deadline.value" />
    </div>

    <div v-if="currentStep.value === 4" class="step-content step-success">
      <div class="success-step">
        <img :src="successImage" alt="Success" class="success-image" />
        <h2>Завдання успішно додане!</h2>
        <button class="add-more-button" @click="addMoreHomework">
          Додати ще більше
        </button>
      </div>
    </div>

    <StepNavigator
        :steps="steps"
        :current-step="currentStep.value"
        :is-next-disabled="currentStep.value === 1 ? !isStep1Valid : currentStep.value === 3 ? !isStep3Valid.value : false"
        :is-button-visible="currentStep.value < steps.length - 1"
        @next="nextStep"
        @prev="prevStep"
    />
  </div>
</template>

<style scoped>
.homework-form {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.homework-form__header {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
}

.homework-form__back-arrow {
  cursor: pointer;
  margin-right: 10px;
}

.homework-form__header-title {
  font-family: 'Onest', sans-serif;
  font-weight: bold 500;
  font-size: 32px;
  color: #333;
}

.step-content {
  display: grid;
  grid-column-gap: 20px;
  margin-bottom: 32px;
}

.selected-students {
  margin-bottom: 20px;
}

.selected-students__title {
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
}

.selected-students p {
  font-family: 'Onest', sans-serif;
  font-size: 16px;
  color: #333;
}

.trainer-iframe {
  width: 100%;
  height: 600px;
  border-radius: 8px;
}

.step-success {
  grid-column: 1 / 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.trainer-option {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
}

.trainer-image {
  width: 60px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
}

.success-image {
  width: 633px;
  height: 350px;
  object-fit: contain;
  margin-bottom: 16px;
}

.success-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.success-step h2 {
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #333;
  text-align: center;
}

.add-more-button {
  background: #0066FF;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 16px;
  cursor: pointer;
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-top: 16px;
}

.add-more-button:hover {
  background: #0056b3;
}
</style>