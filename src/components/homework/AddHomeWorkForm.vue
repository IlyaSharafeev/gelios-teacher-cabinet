<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import StepNavigator from './StepNavigator.vue';
import StudentSelector from './StudentSelector.vue';
import TrainerSelector from './TrainerSelector.vue';
import DeadlinePicker from './DeadlinePicker.vue';
import StudentTag from './StudentTag.vue';
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
  { id: 1, name: 'Вибір тренажера' },
  { id: 2, name: 'Налаштування' },
  { id: 3, name: 'Термін виконання' },
  // Step 4 (Success) is handled separately and doesn't need a name here for the navigator
];

const students = [
  { id: 1, name: 'Олег Петренко' },
  { id: 2, name: 'Анна Ковальчук' },
  { id: 3, name: 'Іван Мельник' },
  { id: 4, name: 'Марія Сидоренко' },
  { id: 5, name: 'Віктор Бондаренко' },
  { id: 6, name: 'Наталія Мороз' },
  { id: 7, name: 'Андрій Ткаченко' },
  { id: 8, name: 'Олена Савченко' },
  { id: 9, name: 'Сергій Кравчук' },
  { id: 10, name: 'Юлія Поліщук' },
  { id: 11, name: 'Дмитро Шевченко' },
  { id: 12, name: 'Ірина Марченко' },
  { id: 13, name: 'Володимир Коваленко' },
  { id: 14, name: 'Тетяна Лисенко' },
  { id: 15, name: 'Олексій Клименко' },
  { id: 16, name: 'Ольга Іванова' },
  { id: 17, name: 'Михайло Гончаренко' },
  { id: 18, name: 'Людмила Федорова' },
  { id: 19, name: 'Павло Руденко' },
  { id: 20, name: 'Галина Степаненко' },
  { id: 21, name: 'Євген Колесник' },
  { id: 22, name: 'Валентина Кузьменко' },
  { id: 23, name: 'Роман Бойко' },
  { id: 24, name: 'Софія Самойленко' },
  { id: 25, name: 'Артем Василенко' },
  { id: 26, name: 'Вікторія Демченко' },
  { id: 27, name: 'Максим Соколов' },
  { id: 28, name: 'Катерина Прокопенко' },
  { id: 29, name: 'Денис Литвиненко' },
  { id: 30, name: 'Христина Романенко' },
  { id: 31, name: 'Богдан Коробко' },
  { id: 32, name: 'Зоряна Мельник' },
  { id: 33, name: 'Тарас Савчук' },
  { id: 34, name: 'Надія Пасічник' },
  { id: 35, name: 'Остап Гнатюк' },
  { id: 36, name: 'Яна Левченко' },
  { id: 37, name: 'Юрій Бондар' },
  { id: 38, name: 'Людмила Костюк' },
  { id: 39, name: 'Андріана Іванченко' },
  { id: 40, name: 'Олег Садовий' },
  { id: 41, name: 'Христина Козак' },
  { id: 42, name: 'Віталій Семенюк' },
  { id: 43, name: 'Марта Білоус' },
  { id: 44, name: 'Ігор Ткачук' },
  { id: 45, name: 'Дарина Коваль' },
  { id: 46, name: 'Анатолій Вознюк' },
  { id: 47, name: 'Лариса Бондарчук' },
  { id: 48, name: 'Григорій Морозюк' },
  { id: 49, 'name': 'Світлана Олійник' },
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
  // DeadlinePicker now ensures a valid ISO string if date and time are selected
  return deadline.value !== '';
});

const selectedStudentsWithNames = computed(() => {
  return selectedStudents.value
      .map(id => {
        const student = students.find(s => s.id === id);
        return student ? { id: student.id, name: student.name } : undefined;
      })
      .filter((student): student is { id: number; name: string } => student !== undefined);
});

const removeStudent = (studentId: number) => {
  selectedStudents.value = selectedStudents.value.filter(id => id !== studentId);
};

const resetForm = () => {
  selectedStudents.value = [];
  selectedTrainer.value = null;
  deadline.value = '';
  currentStep.value = 1;
};

// New computed property for the backend object
const homeworkDataForBackend = computed(() => {
  if (isStep1Valid.value && isStep3Valid.value) {
    return {
      studentIds: selectedStudents.value,
      trainerId: selectedTrainer.value?.id,
      deadline: deadline.value, // This will be the ISO string from DeadlinePicker
    };
  }
  return null;
});

const addHomework = () => {
  if (isStep3Valid.value) {
    currentStep.value = 4; // Move to the success screen
  }
};

// Watch for currentStep becoming 4 to log the data
watch(() => currentStep.value, (newVal) => {
  if (newVal === 4 && homeworkDataForBackend.value) {
    console.log('Homework Data for Backend:', homeworkDataForBackend.value);
  }
});

const addMoreHomework = () => {
  resetForm();
};

const nextStep = () => {
  // For the final step (Step 3), the "Next" button should trigger addHomework
  if (currentStep.value === 3) {
    addHomework();
  } else if (currentStep.value === 1 && !isStep1Valid.value) {
    return;
  } else if (currentStep.value < 3) { // Only increment up to step 3
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
    <div class="homework-form__header" v-if="currentStep.value > 1 && currentStep.value < 4">
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
      <div class="selected-students-tags">
        <StudentTag
            v-for="student in selectedStudentsWithNames"
            :key="student.id"
            :student="student"
            @remove="removeStudent"
        />
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
        v-if="currentStep.value < 4"
        :steps="steps"
        :current-step="currentStep.value"
        :is-next-disabled="currentStep.value === 1 ? !isStep1Valid : currentStep.value === 3 ? !isStep3Valid.value : false"
        :is-button-visible="currentStep.value < 3"
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

.selected-students-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  margin-top: 38px;
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