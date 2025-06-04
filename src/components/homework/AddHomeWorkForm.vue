<script setup>
import { reactive, computed, watch, ref } from 'vue';
import StepNavigator from './StepNavigator.vue';
import StudentSelector from './StudentSelector.vue';
import TrainerSelector from './TrainerSelector.vue';
import SelectedStudents from './SelectedStudents.vue';
import DeadlinePicker from './DeadlinePicker.vue';
import Dropdown from '@/components/config-settings-components/Dropdown.vue';
import RangeSlider from '@/components/config-settings-components/RangeSlider.vue';
import CheckboxGroup from '@/components/config-settings-components/CheckboxGroup.vue';
import DoubleRangeSlider from '@/components/config-settings-components/DoubleRangeSlider.vue';

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
  { id: 2, name: 'Налаштування' },
  { id: 3, name: 'Термін виконання' },
];

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
  { id: 29, name: 'Денис Білоус' },
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
  { id: 48, name: 'Ростислав Бойко' },
  { id: 49, name: 'Соломія Данилюк' },
  { id: 50, name: 'Юрій Шевчук' },
];

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

const trainers = [
  { id: 1, name: 'Знайди пару', image: trainer1 },
  { id: 2, name: 'Текс швидкості читання', image: trainer2 },
  { id: 3, name: 'Таблиця шульте', image: trainer3 },
  { id: 4, name: 'Splitz', image: trainer4 },
  { id: 5, name: 'Ментальний рахунок', image: trainer5 },
  { id: 6, name: 'Філворди', image: trainer6 },
  { id: 7, name: 'Тест струпа', image: trainer7 },
  { id: 8, name: 'Алфавіт', image: trainer8 },
  { id: 9, name: 'Знайди слово', image: trainer9 },
  { id: 10, name: 'Тексти', image: trainer10 },
  { id: 11, name: 'Кіберкішка', image: trainer11 },
  { id: 12, name: 'Флешкарти', image: trainer12 },
  { id: 13, name: 'Абакус', image: trainer13 },
  { id: 14, name: 'Знайди кіберкішку', image: trainer14 },
  { id: 15, name: 'Мнемотехніка', image: trainer15 },
  { id: 16, name: 'Стовпці', image: trainer16 },
];

const selectedStudents = reactive({ value: [] });
const selectedDirections = reactive({ value: [] });
const selectedTrainer = reactive({ value: null });
const deadline = reactive({ value: '' });

const trainerSettings = ref({});

const gameConfigMap = {
  1: [
    {
      key: 'HINT_TIME',
      title: 'Підказка',
      inputType: 'RANGE_SLIDER',
      min: 0,
      max: 5,
      step: 1,
    },
    {
      key: 'CARDS_AMOUNT',
      title: 'Кількість карток',
      inputType: 'RANGE_SLIDER',
      min: 8,
      max: 20,
      step: 2,
    },
    {
      key: 'TIMER_DURATION',
      title: 'Таймер',
      inputType: 'RANGE_SLIDER',
      min: 30,
      max: 90,
      step: 5,
      disableKey: 'IS_TIMER_DISABLED',
      disableValue: true,
    },
    {
      key: 'CHECKBOXES',
      title: 'Додаткові налаштування',
      inputType: 'CHECKBOX_GROUP',
      checkboxes: [
        {
          key: 'IS_TIMER_DISABLED',
          title: 'Без таймера',
          inputType: 'CHECKBOX',
        },
        {
          key: 'IS_SOUND_ENABLED',
          title: 'Звук',
          inputType: 'CHECKBOX',
        },
      ],
    },
  ],
  2: [
    {
      key: 'RODS',
      title: 'Кількість стрижнів',
      inputType: 'RANGE_SLIDER',
      min: 1,
      max: 10,
      step: 1,
    },
  ],
  3: [
    {
      key: 'LEVELS',
      title: 'Рівень складності',
      inputType: 'RANGE_SLIDER',
      min: 1,
      max: 5,
      step: 1,
    },
  ],
  default: [
    {
      key: 'RODS',
      title: 'Кількість стрижнів',
      inputType: 'RANGE_SLIDER',
      min: 1,
      max: 13,
      step: 1,
    },
  ],
};

watch(() => selectedTrainer.value, (newTrainer) => {
  console.log('Selected trainer changed:', newTrainer); // Отладка
  // Очищаем старые настройки
  Object.keys(trainerSettings.value).forEach(key => delete trainerSettings.value[key]);

  if (newTrainer) {
    const config = gameConfigMap[newTrainer.id] || gameConfigMap.default;
    const defaultSettings = {};

    // Устанавливаем значения по умолчанию для тренажера с id: 1
    if (newTrainer.id === 1) {
      defaultSettings['HINT_TIME'] = 3;
      defaultSettings['CARDS_AMOUNT'] = 8;
      defaultSettings['TIMER_DURATION'] = 30;
      defaultSettings['IS_TIMER_DISABLED'] = false;
      defaultSettings['IS_SOUND_ENABLED'] = true;
    } else {
      // Для других тренажеров используем минимальные значения
      config.forEach((unit) => {
        if (unit.inputType === 'CHECKBOX_GROUP') {
          unit.checkboxes.forEach((checkbox) => {
            defaultSettings[checkbox.key] = false;
          });
        } else if (unit.inputType === 'DOUBLE_RANGE_SLIDER') {
          defaultSettings[unit.minKey] = unit.min;
          defaultSettings[unit.maxKey] = unit.max;
        } else if (unit.inputType === 'RANGE_SLIDER') {
          defaultSettings[unit.key] = unit.min;
        } else {
          defaultSettings[unit.key] = unit.options ? unit.options[0].value : unit.min || 0;
        }
      });
    }

    const savedSettings = localStorage.getItem(`trainer_${newTrainer.id}_settings`);
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        config.forEach((unit) => {
          if (unit.inputType === 'RANGE_SLIDER' && parsed[unit.key] === undefined) {
            parsed[unit.key] = defaultSettings[unit.key] || unit.min;
          }
        });
        // Реактивно обновляем свойства
        Object.entries({ ...defaultSettings, ...parsed }).forEach(([key, value]) => {
          trainerSettings.value[key] = value;
        });
      } catch (e) {
        console.error('Failed to load trainer settings:', e);
        Object.entries(defaultSettings).forEach(([key, value]) => {
          trainerSettings.value[key] = value;
        });
      }
    } else {
      Object.entries(defaultSettings).forEach(([key, value]) => {
        trainerSettings[key] = value;
      });
    }
  }
});

watch(trainerSettings.value, (newSettings) => {
  console.log('TrainerSettings updated:', newSettings); // Отладка
  if (selectedTrainer.value) {
    localStorage.setItem(`trainer_${selectedTrainer.value.id}_settings`, JSON.stringify(newSettings));
  }
}, { deep: true });

const isStep1Valid = computed(() => {
  return selectedStudents.value.length > 0 && selectedTrainer.value !== null;
});

const isStep2Valid = computed(() => {
  if (!selectedTrainer.value) return false;
  const config = gameConfigMap[selectedTrainer.value.id] || gameConfigMap.default;
  return config.every((unit) => {
    if (unit.inputType === 'CHECKBOX_GROUP') {
      return unit.checkboxes.every((checkbox) => checkbox.key in trainerSettings.value);
    } else if (unit.inputType === 'DOUBLE_RANGE_SLIDER') {
      return unit.minKey in trainerSettings.value && unit.maxKey in trainerSettings.value;
    }
    return unit.key in trainerSettings.value;
  });
});

const nextStep = () => {
  if (currentStep.value === 1 && !isStep1Valid.value) return;
  if (currentStep.value === 2 && !isStep2Valid.value) return;
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

    <div v-if="currentStep.value === 2" class="step-content step-settings">
      <SelectedStudents
          :students="students"
          v-model="selectedStudents.value"
      />
      <div v-if="selectedTrainer.value" class="trainer-settings">
        <h2 class="trainer-settings__title">Налаштування для {{ selectedTrainer.value.name }}</h2>
        <div class="settings-container">
          <div v-for="config in (gameConfigMap[selectedTrainer.value.id] || gameConfigMap.default)" :key="config.key" class="setting-item">
            <label>{{ config.title }}</label>
            <Dropdown
                v-if="config.inputType === 'SELECT'"
                v-model="trainerSettings.value[config.key]"
                :options="config.options"
            />
            <RangeSlider
                v-if="config.inputType === 'RANGE_SLIDER'"
                v-model="trainerSettings[config.key]"
                :min="config.min"
                :max="config.max"
                :step="config.step"
                :display-aggregator="config.displayAggregator"
                :disabled="config.disableKey && trainerSettings[config.disableKey] === config.disableValue"
            />
            <DoubleRangeSlider
                v-if="config.inputType === 'DOUBLE_RANGE_SLIDER'"
                v-model:minVal="trainerSettings[config.minKey]"
                v-model:maxVal="trainerSettings[config.maxKey]"
                :min="config.min"
                :max="config.max"
                :step="config.step"
                :disabled="config.disableKey && trainerSettings.value[config.disableKey] === config.disableValue"
            />
            <CheckboxGroup
                v-if="config.inputType === 'CHECKBOX_GROUP'"
                :checkboxes="config.checkboxes.map((checkbox) => ({
                unit: checkbox,
                value: trainerSettings[checkbox.key] || false,
                disabled: config.disableKey && trainerSettings[config.disableKey] === config.disableValue
              }))"
                @update:checkboxes="config.checkboxes.forEach((checkbox, index) => { trainerSettings[checkbox.key] = $event[index].value })"
            />
          </div>
        </div>
        <div class="saved-config">
          <h3>Збережена конфігурація</h3>
          <pre>{{ JSON.stringify(trainerSettings, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <div v-if="currentStep.value === 3" class="step-content">
      <DeadlinePicker v-model="deadline.value" />
    </div>

    <StepNavigator
        :steps="steps"
        :current-step="currentStep.value"
        :is-next-disabled="currentStep.value === steps.length || (currentStep.value === 1 && !isStep1Valid) || (currentStep.value === 2 && !isStep2Valid)"
        @next="nextStep"
        @prev="prevStep"
    />
  </div>
</template>

<style lang="scss" scoped>
.homework-form {
  display: flex;
  flex-direction: column;
  padding: 20px;
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
  color: #000;
}

.step-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 116px;
  margin-bottom: 20px;
}

.step-settings {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.trainer-settings {
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trainer-settings__title {
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #000;
}

.settings-container {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  border-radius: 8px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #e3ecf5;
  padding: 30px;
  border-radius: 26px;
}

.setting-item label {
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.saved-config {
  margin-top: 16px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 6px;
}

.saved-config h3 {
  font-family: 'Onest', sans-serif;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.saved-config pre {
  font-family: 'Onest', sans-serif;
  font-size: 14px;
  background: #fff;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #eee;
}

.trainer-option {
  display: flex;
  align-items: center;
  gap: 13px;
  font-family: "Onest" sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}

.trainer-image {
  width: 60px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
}
</style>