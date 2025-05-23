<script setup lang="ts">
import { ref, computed } from 'vue';
import Multiselect from 'vue-multiselect'

// Пример данных учеников
const students = ref([
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
]);

// Пример данных направлений
const directions = ref([
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
]);

// Состояние для поискового запроса
const searchQuery = ref('');

// Состояние для выбранных учеников (массив ID)
const selectedStudents = ref<number[]>([]);

// Состояние для выбранных направлений (массив ID)
const selectedDirections = ref<number[]>([]);

// Фильтрация учеников по поисковому запросу
const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value;
  return students.value.filter(student =>
      student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Функция для выбора всех учеников
const selectAllStudents = () => {
  if (selectedStudents.value.length === students.value.length) {
    selectedStudents.value = []; // Снимаем выбор, если все уже выбраны
  } else {
    selectedStudents.value = students.value.map(student => student.id);
  }
};

// Функция для выбора/снятия выбора с одного ученика
const toggleStudent = (studentId: number) => {
  if (selectedStudents.value.includes(studentId)) {
    selectedStudents.value = selectedStudents.value.filter(id => id !== studentId);
  } else {
    selectedStudents.value.push(studentId);
  }
};

// Функция для выбора всех направлений
const selectAllDirections = () => {
  if (selectedDirections.value.length === directions.value.length) {
    selectedDirections.value = []; // Снимаем выбор, если все уже выбраны
  } else {
    selectedDirections.value = directions.value.map(direction => direction.id);
  }
};

// Функция для выбора/снятия выбора с одного направления
const toggleDirection = (directionId: number) => {
  if (selectedDirections.value.includes(directionId)) {
    selectedDirections.value = selectedDirections.value.filter(id => id !== directionId);
  } else {
    selectedDirections.value.push(directionId);
  }
};

const trainers = ref([
  { id: 1, name: 'Тренажер 1' },
  { id: 2, name: 'Тренажер 2' },
  { id: 3, name: 'Тренажер 3' },
  { id: 4, name: 'Тренажер 4' },
  { id: 5, name: 'Тренажер 5' },
  { id: 6, name: 'Тренажер 6' },
  { id: 7, name: 'Тренажер 7' },
]);

const selectedTrainers = ref<number[]>([]);

const selectAllTrainers = () => {
  if (selectedTrainers.value.length === trainers.value.length) {
    selectedTrainers.value = [];
  } else {
    selectedTrainers.value = trainers.value.map(trainer => trainer.id);
  }
};

const toggleTrainer = (trainerId: number) => {
  if (selectedTrainers.value.includes(trainerId)) {
    selectedTrainers.value = selectedTrainers.value.filter(id => id !== trainerId);
  } else {
    selectedTrainers.value.push(trainerId);
  }
};

const selectTrainer = ref(null);
const options = ref([
  { value: '1', label: 'Тренажер 1' },
  { value: '2', label: 'Тренажер 2' },
  { value: '3', label: 'Тренажер 3' },
  { value: '4', label: 'Тренажер 4' },
  { value: '5', label: 'Тренажер 5' },
]);
</script>

<template>
  <div class="homework-form">
    <div class="homework-form__my-students">
      <div class="homework-form__title">Мої учні</div>
      <!-- Поле поиска с иконкой лупы -->
      <div class="homework-form__search-container">
        <span class="homework-form__search-icon">
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
            class="homework-form__search-input"
        />
      </div>
      <!-- Список учеников -->
      <div class="homework-form__students-list">
        <template v-if="filteredStudents.length > 0">
          <div
              class="homework-form__student-item homework-form__student-item--select-all"
              :class="{ 'homework-form__student-item--selected': selectedStudents.length === students.length }"
              @click="selectAllStudents"
          >
            Вибрати всіх
            <span v-if="selectedStudents.length === students.length" class="homework-form__checkmark"></span>
          </div>
          <div
              v-for="student in filteredStudents"
              :key="student.id"
              class="homework-form__student-item"
              :class="{ 'homework-form__student-item--selected': selectedStudents.includes(student.id) }"
              @click="toggleStudent(student.id)"
          >
            {{ student.name }}
            <span v-if="selectedStudents.includes(student.id)" class="homework-form__checkmark"></span>
          </div>
        </template>
        <div v-else class="homework-form__no-students">
          Учнів не знайдено
        </div>
      </div>
    </div>
    <div class="homework-form__trainers">
      <div class="homework-form__title">Тренажери</div>
      <multiselect
          v-model="selectTrainer"
          :options="options"
          :multiple="false"
          placeholder="Выберите тренажер"
          track-by="value"
          label="value"
      >
        <template #option="{ option }">
          <div class="multiselect-option" :class="{ 'multiselect-option--selected': selectTrainer === option }">
            {{ option }}
            <span v-if="selectTrainer === option" class="homework-form__checkmark"></span>
          </div>
        </template>
      </multiselect>
    </div>
    <div class="homework-form__direction">
      <div class="homework-form__title">Напрямок</div>
      <!-- Список направлений -->
      <div class="homework-form__directions-list">
        <template v-if="directions.length > 0">
          <div
              class="homework-form__direction-item homework-form__direction-item--select-all"
              :class="{ 'homework-form__direction-item--selected': selectedDirections.length === directions.length }"
              @click="selectAllDirections"
          >
            Вибрати всіх
            <span v-if="selectedDirections.length === directions.length" class="homework-form__checkmark"></span>
          </div>
          <div
              v-for="direction in directions"
              :key="direction.id"
              class="homework-form__direction-item"
              :class="{ 'homework-form__direction-item--selected': selectedDirections.includes(direction.id) }"
              @click="toggleDirection(direction.id)"
          >
            {{ direction.name }}
            <span v-if="selectedDirections.includes(direction.id)" class="homework-form__checkmark"></span>
          </div>
        </template>
        <div v-else class="homework-form__no-directions">
          Напрямків не знайдено
        </div>
      </div>
    </div>
    <div class="homework-form__deadline">
      <div class="homework-form__title">Термін виконання</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homework-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 116px;
  grid-row-gap: 20px;

  &__my-students {
    grid-area: 1 / 1 / 2 / 2;

    .homework-form__title {
      font-family: 'Onest', sans-serif;
      font-weight: 500;
      font-size: 32px;
      line-height: 24px;
      letter-spacing: -2%;
      margin-bottom: 32px;
    }

    .multiselect-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      font-family: 'Onest', sans-serif;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0%;

      &:hover {
        background-color: #f0f0f0;
      }

      &--selected {
        background-color: #e6f0ff;
      }
    }

    .homework-form__search-container {
      position: relative;
      margin-top: 16px;

      .homework-form__search-icon {
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 18px;
        padding: 12px 8px;
      }

      .homework-form__search-input {
        width: 100%;
        padding: 12px 42px;
        border: 1.5px solid #30303d26;
        border-radius: 12px;
        font-family: 'Onest', sans-serif;
        font-size: 16px;

        &::placeholder {
          color: #aaa;
        }

        &:focus {
          outline: none;
        }
      }
    }

    .homework-form__students-list {
      max-height: 480px;
      overflow-y: auto;
      margin-top: 16px;
      border-radius: 4px;

      .homework-form__student-item {
        padding: 12px;
        font-family: 'Onest', sans-serif;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.2s;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0%;

        &:hover {
          background-color: #f0f0f0;
        }

        &--selected {
          background-color: #e6f0ff;
        }

        &--select-all {
          font-weight: 600;
          color: #0066ff;
        }
      }

      .homework-form__no-students {
        padding: 12px;
        font-family: 'Onest', sans-serif;
        font-size: 16px;
        color: #666;
        text-align: center;
      }
    }
  }

  &__trainers {
    grid-area: 1 / 2 / 2 / 3;

    .homework-form__title {
      font-family: 'Onest', sans-serif;
      font-weight: 500;
      font-size: 32px;
      line-height: 24px;
      letter-spacing: -2%;
      margin-bottom: 32px;
    }

    .homework-form__trainers-select {
      .homework-form__select-input {
        width: 100%;
        padding: 12px 42px;
        border: 1.5px solid #30303d26;
        border-radius: 12px;
        font-family: 'Onest', sans-serif;
        font-size: 16px;
        appearance: none;
        background: url("@/assets/images/icons/check.svg") no-repeat right 12px center;
        background-color: #fff;
        cursor: pointer;

        &:focus {
          outline: none;
          border-color: #0066ff;
        }

        option {
          padding: 8px;
        }
      }
    }
  }

  &__direction {
    grid-area: 2 / 1 / 3 / 2;

    .homework-form__title {
      font-family: 'Onest', sans-serif;
      font-weight: 500;
      font-size: 32px;
      line-height: 24px;
      letter-spacing: -2%;
      margin-bottom: 32px;
    }

    .homework-form__directions-list {
      max-height: 480px;
      overflow-y: auto;
      margin-top: 16px;
      border-radius: 4px;

      .homework-form__direction-item {
        padding: 12px 14px;
        font-family: 'Onest', sans-serif;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.2s;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0%;

        &:hover {
          background-color: #f0f0f0;
        }

        &--selected {
          background-color: #e6f0ff;
        }

        &--select-all {
          font-weight: 600;
          color: #0066ff;
        }
      }

      .homework-form__no-directions {
        padding: 12px;
        font-family: 'Onest', sans-serif;
        font-size: 16px;
        color: #666;
        text-align: center;
      }
    }
  }

  &__deadline {
    grid-area: 2 / 2 / 3 / 3;

    .homework-form__title {
      font-family: 'Onest', sans-serif;
      font-weight: 500;
      font-size: 32px;
      line-height: 24px;
      letter-spacing: -2%;
      margin-bottom: 32px;
    }
  }

  &__checkmark {
    background-image: url("@/assets/images/icons/check.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
  }
}
</style>