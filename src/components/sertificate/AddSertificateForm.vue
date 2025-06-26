<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import StudentSelector from './StudentSelector.vue';
import SelectedStudentsCertification from './SelectedStudentsCertification.vue';
import SelectedLevelCertification from './SelectedLevelCertification.vue';
import SelectedDirection from './SelectedDirection.vue';
import LanguageSelector from './LanguageSelector.vue';

// Import images for levels
import junior from '@/assets/backgrounds/certificate-level-uk/junior.png';
import base from '@/assets/backgrounds/certificate-level-uk/base.png';
import advanced from '@/assets/backgrounds/certificate-level-uk/advanced.png';
import polymath from '@/assets/backgrounds/certificate-level-uk/polymath.png';
import pro from '@/assets/backgrounds/certificate-level-uk/pro.png';
import full from '@/assets/backgrounds/certificate-level-uk/full.png';

import juniorEn from '@/assets/backgrounds/certificate-level-en/junior.png';
import baseEn from '@/assets/backgrounds/certificate-level-en/base.png';
import advancedEn from '@/assets/backgrounds/certificate-level-en/advanced.png';
import polymathEn from '@/assets/backgrounds/certificate-level-en/polymath.png';
import proEn from '@/assets/backgrounds/certificate-level-en/pro.png';
import fullEn from '@/assets/backgrounds/certificate-level-en/full.png';

// Import success image
import successImage from '@/assets/backgrounds/certification/success.png';

// Define directions
const directions = [
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
  { id: 40, name: 'Кінематографія' },
];

// Define base levels with Ukrainian images and names
const baseLevels = [
  { id: 1, name: 'Джуніор', image: junior },
  { id: 2, name: 'Основний', image: base },
  { id: 3, name: 'Просунутий', image: advanced },
  { id: 4, name: 'Ерудит', image: polymath },
  { id: 5, name: 'Профі', image: pro },
  { id: 6, name: 'Повний курс', image: full },
];

// Define English levels with English images and names
const englishLevels = [
  { id: 1, name: 'Junior', image: juniorEn },
  { id: 2, name: 'Basic', image: baseEn },
  { id: 3, name: 'Advanced', image: advancedEn },
  { id: 4, name: 'Polymath', image: polymathEn },
  { id: 5, name: 'Pro', image: proEn },
  { id: 6, name: 'Full Course', image: fullEn },
];

// Reactive levels array
const levels = reactive([...baseLevels]);

// Define languages
const languages = [
  { id: 'uk', name: 'Українська' },
  { id: 'en', name: 'English' },
];

// Define students
const students = [
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
  { id: 29, name: 'Денис Bілоус' },
  { id: 30, name: 'Світлана Кравець' },
  { id: 31, name: 'Ярослав Олійник' },
  { id: 32, name: 'Христина Підлісецька' },
  { id: 33, name: 'Євгеній Коваленко' },
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
  { id: 48, name: 'Ростислав Зварич' },
  { id: 49, name: 'Соломія Данилюк' },
  { id: 50, name: 'Юрій Остапчук' },
];

// Step navigation
const currentStep = reactive({ value: 1 });
const steps = [
  { id: 1, name: 'Вибір напрямку, рівня, мови та учнів' },
  { id: 2, name: 'Ваш вибір' },
  { id: 3, name: 'Сертифікати додані' },
];

const selectedDirection = reactive({ value: null as number | null });
const selectedLevel = reactive({ value: [] as number[] });
const selectedLanguage = reactive({ value: null as string | null });
const selectedStudents = reactive({ value: [] as number[] });

const emit = defineEmits(['has-unsaved-changes']);

const isFormValid = computed(() => {
  return (
      selectedDirection.value !== null &&
      selectedLevel.value.length > 0 &&
      selectedLanguage.value !== null &&
      selectedStudents.value.length > 0
  );
});

const hasUnsavedChanges = computed(() => {
  return (
      selectedDirection.value !== null ||
      selectedLevel.value.length > 0 ||
      selectedLanguage.value !== null ||
      selectedStudents.value.length > 0
  );
});

// Watch for language changes and update levels accordingly
watch(
    () => selectedLanguage.value,
    (newLanguage) => {
      console.log('Language changed to:', newLanguage);
      if (newLanguage === 'en') {
        // Replace levels with English versions
        levels.splice(0, levels.length, ...englishLevels);
      } else {
        // Revert to Ukrainian versions
        levels.splice(0, levels.length, ...baseLevels);
      }
      console.log('Updated levels:', JSON.stringify(levels, null, 2));
    },
    { immediate: true }
);

watch(hasUnsavedChanges, (value) => {
  emit('has-unsaved-changes', value);
});

const nextStep = () => {
  console.log('Selected Levels before moving to step 2:', selectedLevel.value);
  console.log('Selected Language before moving to step 2:', selectedLanguage.value);
  if (isFormValid.value && currentStep.value < steps.length - 1) {
    currentStep.value++;
    console.log('Proceeding to next step:', {
      step: currentStep.value,
      direction: selectedDirection.value,
      level: selectedLevel.value,
      language: selectedLanguage.value,
      students: selectedStudents.value,
    });
  } else {
    console.log('Form is invalid:', {
      direction: selectedDirection.value,
      level: selectedLevel.value,
      language: selectedLanguage.value,
      students: selectedStudents.value,
    });
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const resetForm = () => {
  selectedDirection.value = null;
  selectedLevel.value = [];
  selectedLanguage.value = null;
  selectedStudents.value = [];
};

const addCertificates = () => {
  console.log('Form state:', {
    direction: selectedDirection.value,
    level: selectedLevel.value,
    language: selectedLanguage.value,
    students: selectedStudents.value,
  });
  if (isFormValid.value) {
    currentStep.value = 3;
    console.log('Certificates added:', {
      direction: selectedDirection.value,
      level: selectedLevel.value,
      language: selectedLanguage.value,
      students: selectedStudents.value,
    });
    setTimeout(resetForm, 2000);
  } else {
    console.log('Form is invalid');
  }
};
</script>

<template>
  <div class="certificate-form">
    <div class="certificate-form__header" v-if="currentStep.value > 1">
      <span class="certificate-form__back-arrow" @click="prevStep">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M15 10H5M5 10L10 5M5 10L10 15"
              stroke="#0066FF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </span>
      <h1 class="certificate-form__header-title">{{ steps[currentStep.value - 1].name }}</h1>
    </div>

    <div v-if="currentStep.value === 1" class="certificate-form__content">
      <StudentSelector
          :items="directions"
          v-model="selectedDirection.value"
          title="Напрямок"
          search-placeholder="Шукати напрямок"
          no-items-text="Напрямків не знайдено"
          :single-select="true"
          :is-visible-search="false"
          :show-checkbox="false"
      />
      <StudentSelector
          :items="levels"
          v-model="selectedLevel.value"
          title="Рівень"
          search-placeholder="Шукати рівень"
          no-items-text="Рівнів не знайдено"
          :single-select="false"
          select-all-text="Вибрати всі рівні"
      />
      <StudentSelector
          :items="students"
          v-model="selectedStudents.value"
          title="Мої учні"
          search-placeholder="Шукати учня"
          no-items-text="Учнів не знайдено"
          select-all-text="Вибрати всіх"
      />
      <LanguageSelector
          :items="languages"
          v-model="selectedLanguage.value"
          title="Мова"
          no-items-text="Мови не знайдено"
      />
    </div>

    <div v-if="currentStep.value === 2" class="certificate-form__content step-confirmation">
      <div class="confirmation-step">
        <SelectedDirection :directions="directions" v-model="selectedDirection.value" />
        <div class="confirmation-item">
          <strong>Мова сертифіката</strong>
          <span>{{ languages.find(l => l.id === selectedLanguage.value)?.name || 'Мова не вибрана' }}</span>
        </div>
        <SelectedLevelCertification :levels="levels" v-model="selectedLevel.value" />
        <SelectedStudentsCertification :students="students" v-model="selectedStudents.value" />
      </div>
    </div>

    <div v-if="currentStep.value === 3" class="certificate-form__content step-success">
      <div class="success-step">
        <img :src="successImage" alt="Success" class="success-image" />
        <h2 class="success-title">Сертифікати успішно додані</h2>
      </div>
    </div>

    <div class="button-group" v-if="currentStep.value < 3">
      <button v-if="currentStep.value === 2" class="rounded-button button large-button" @click="prevStep">
        <span class="arrow-left"></span>
        Назад
      </button>
      <button
          class="button large-button next-button"
          :disabled="!isFormValid"
          @click="currentStep.value === 1 ? nextStep() : addCertificates()"
      >
        {{ currentStep.value === 1 ? 'Далі' : 'Додати' }}
        <span class="arrow-right" v-if="currentStep.value === 1"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.certificate-form {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.certificate-form__header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.certificate-form__back-arrow {
  cursor: pointer;
  margin-right: 12px;
}

.certificate-form__header-title {
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 32px;
  color: #000;
}

.certificate-form__content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  margin-bottom: 20px;
}

.step-confirmation,
.step-success {
  grid-column: 1 / 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.confirmation-step,
.success-step {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.confirmation-step h2,
.success-step h2 {
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #000;
  text-align: center;
}

.confirmation-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: #e3ecf5;
  border-radius: 12px;
}

.confirmation-item strong {
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.confirmation-item span {
  font-family: 'Onest', sans-serif;
  font-size: 16px;
  color: #333;
}

.level-option {
  display: flex;
  align-items: center;
  gap: 13px;
}

.level-image {
  width: 60px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
}

.success-image {
  width: 633px;
  height: 350px;
  object-fit: contain;
  margin: 0 auto;
  margin-bottom: 16px;
}

.success-title {
  font-family: Onest;
  font-weight: 500;
  font-size: 48px;
  line-height: 120%;
  letter-spacing: -2%;
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  grid-column: 1 / 4;
  margin-top: 20px;
}

.next-button {
  background: #0066FF;
  color: white;
}

.next-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.next-button:hover:not(:disabled) {
  background: #0056b3;
}

.back-button {
  background: #ffffff;
  color: #0066FF;
  border: 1.5px solid #0066FF;
}

.back-button:hover {
  background: #f0f0f0;
}
</style>