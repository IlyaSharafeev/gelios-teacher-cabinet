<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, required, numeric } from '@vuelidate/validators';
import { notify } from '@kyvg/vue3-notification';
import CustomCheckbox from '@/components/inputs/CustomCheckbox.vue';
import EditIcon from '@/assets/images/inputs/edit.svg';
import SaveIcon from '@/assets/images/inputs/save.svg';

// Данные формы с начальными значениями
const form = ref({
  language: 'uk',
  email: 'example@domain.com',
  phone: '1234567890',
  notifications: {
    lessonCancel: false,
    lessonReschedule: false,
    lessonFeedback: false,
    homeworkNotDone: false,
  },
});

// Флаг для состояния уведомлений
const areNotificationsEnabled = ref(localStorage.getItem('notificationsEnabled') !== 'false');

// Состояние выпадающего меню
const showDropdown = ref(false);

// Текущий выбранный период отключения уведомлений
const selectedDuration = ref<string | undefined>(undefined);

// Состояние фокуса для select
const isSelectFocused = ref(false);

// Правила валидации
const rules = {
  email: { required, email },
  phone: { required, numeric },
};

const v$ = useVuelidate(rules, form);

// Состояния редактирования
const isEditingEmail = ref(false);
const isEditingPhone = ref(false);

// Флаг для предотвращения повторных кликов
const isProcessing = ref(false);

// Переключение режима редактирования
const toggleEdit = async (field: 'email' | 'phone', inputRef: string, isSave: boolean) => {
  if (isProcessing.value) return;
  isProcessing.value = true;

  console.log(`Переключение редактирования для ${field}, isSave: ${isSave}`);

  if (field === 'email') {
    if (isSave) {
      isEditingEmail.value = false;
      v$.value.email.$touch();
      if (!v$.value.email.$errors.length) {
        notify({
          title: 'Успех',
          text: 'Почта успешно сохранена!',
          type: 'success',
        });
      }
    } else {
      isEditingEmail.value = true;
      await nextTick();
      const input = document.getElementById(inputRef) as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
        console.log(`Фокус на ${inputRef}`);
      } else {
        console.error(`Элемент ${inputRef} не найден`);
        notify({
          title: 'Ошибка',
          text: 'Не удалось отредактировать поле почты',
          type: 'error',
        });
      }
    }
  } else {
    if (isSave) {
      isEditingPhone.value = false;
      v$.value.phone.$touch();
      if (!v$.value.phone.$errors.length) {
        notify({
          title: 'Успех',
          text: 'Телефон успешно сохранен!',
          type: 'success',
        });
      }
    } else {
      isEditingPhone.value = true;
      await nextTick();
      const input = document.getElementById(inputRef) as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
        console.log(`Фокус на ${inputRef}`);
      } else {
        console.error(`Элемент ${inputRef} не найден`);
        notify({
          title: 'Ошибка',
          text: 'Не удалось отредактировать поле телефона',
          type: 'error',
        });
      }
    }
  }

  isProcessing.value = false;
};

// Обработка потери фокуса
const handleBlur = (field: 'email' | 'phone') => {
  console.log(`Событие потери фокуса для ${field}`);
  if (field === 'email') {
    isEditingEmail.value = false;
    v$.value.email.$touch();
    if (!v$.value.email.$errors.length) {
      notify({
        title: 'Успех',
        text: 'Почта успешно сохранена!',
        type: 'success',
      });
    }
  } else {
    isEditingPhone.value = false;
    v$.value.phone.$touch();
    if (!v$.value.phone.$errors.length) {
      notify({
        title: 'Успех',
        text: 'Телефон успешно сохранен!',
        type: 'success',
      });
    }
  }
};

// Переключение уведомлений
const toggleNotifications = (duration?: '15 хв' | '30 хв' | '1 год' | '2 год' | '4 год') => {
  if (areNotificationsEnabled.value) {
    form.value.notifications.lessonCancel = false;
    form.value.notifications.lessonReschedule = false;
    form.value.notifications.lessonFeedback = false;
    form.value.notifications.homeworkNotDone = false;
    areNotificationsEnabled.value = false;
    localStorage.setItem('notificationsEnabled', 'false');
    selectedDuration.value = duration;

    if (duration) {
      console.log(`Уведомления отключены на ${duration}`);
      notify({
        title: 'Уведомления',
        text: `Все уведомления отключены на ${duration}`,
        type: 'info',
      });

      let timeoutMs: number;
      if (duration === '15 хв') timeoutMs = 15 * 60 * 1000;
      else if (duration === '30 хв') timeoutMs = 30 * 60 * 1000;
      else if (duration === '1 год') timeoutMs = 60 * 60 * 1000;
      else if (duration === '2 год') timeoutMs = 2 * 60 * 60 * 1000;
      else timeoutMs = 4 * 60 * 60 * 1000;

      setTimeout(() => {
        toggleNotifications();
        notify({
          title: 'Уведомления',
          text: 'Все уведомления снова включены!',
          type: 'success',
        });
      }, timeoutMs);
    }
  } else {
    form.value.notifications.lessonCancel = true;
    form.value.notifications.lessonReschedule = true;
    form.value.notifications.lessonFeedback = true;
    form.value.notifications.homeworkNotDone = true;
    areNotificationsEnabled.value = true;
    localStorage.setItem('notificationsEnabled', 'true');
    selectedDuration.value = undefined;
    notify({
      title: 'Уведомления',
      text: 'Все уведомления включены!',
      type: 'success',
    });
  }
  showDropdown.value = false;
};

// Показать/скрыть выпадашку
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// Обработка фокуса select
const handleSelectFocus = () => {
  isSelectFocused.value = true;
};

const handleSelectBlur = () => {
  isSelectFocused.value = false;
};

const handleSelectChange = () => {
  isSelectFocused.value = false;
};

// Закрытие выпадашки при клике вне
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const dropdown = document.querySelector('.dropdown');
    const button = document.querySelector('.toggle-notifications');
    if (dropdown && button && !dropdown.contains(event.target as Node) && !button.contains(event.target as Node)) {
      showDropdown.value = false;
    }
  };
  document.addEventListener('click', handleClickOutside);
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
});

// Вычисляемые свойства для ошибок валидации
const emailErrors = computed(() => {
  if (v$.value.email.$dirty && v$.value.email.$errors.length) {
    return v$.value.email.$errors.map(error => {
      if (error.$validator === 'required') return 'Поле почты обязательно';
      if (error.$validator === 'email') return 'Неверный формат почты';
      return '';
    });
  }
  return [];
});

const phoneErrors = computed(() => {
  if (v$.value.phone.$dirty && v$.value.phone.$errors.length) {
    return v$.value.phone.$errors.map(error => {
      if (error.$validator === 'required') return 'Поле телефона обязательно';
      if (error.$validator === 'numeric') return 'Телефон должен содержать только цифры';
      return '';
    });
  }
  return [];
});
</script>

<template>
  <div class="general-settings">
    <div class="title">Общие параметры</div>
    <div class="settings-section">
      <div class="form-group">
        <label for="language">Язык</label>
        <select
            v-model="form.language"
            id="language"
            @focus="handleSelectFocus"
            @blur="handleSelectBlur"
            @change="handleSelectChange"
        >
          <option value="uk">Українська</option>
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>
      </div>

      <div class="form-group">
        <label for="email">Почта</label>
        <div class="input-wrapper">
          <input
              id="email-input"
              v-model="form.email"
              :disabled="!isEditingEmail"
              @blur="handleBlur('email')"
              :class="{ 'error': emailErrors.length, 'editable': isEditingEmail }"
          />
          <span class="edit-button" @click="toggleEdit('email', 'email-input', isEditingEmail)">
            <img
                :src="isEditingEmail ? SaveIcon : EditIcon"
                :alt="isEditingEmail ? 'Save' : 'Edit'"
                class="edit-icon"
            />
          </span>
        </div>
        <div v-if="emailErrors.length" class="error-message">
          {{ emailErrors[0] }}
        </div>
      </div>

      <div class="form-group">
        <label for="phone">Телефон</label>
        <div class="input-wrapper">
          <input
              id="phone-input"
              v-model="form.phone"
              :disabled="!isEditingPhone"
              @blur="handleBlur('phone')"
              :class="{ 'error': phoneErrors.length, 'editable': isEditingPhone }"
          />
          <span class="edit-button" @click="toggleEdit('phone', 'phone-input', isEditingPhone)">
            <img
                :src="isEditingPhone ? SaveIcon : EditIcon"
                :alt="isEditingPhone ? 'Save' : 'Edit'"
                class="edit-icon"
            />
          </span>
        </div>
        <div v-if="phoneErrors.length" class="error-message">
          {{ phoneErrors[0] }}
        </div>
      </div>
    </div>

    <div class="title">Уведомления</div>
    <div class="notifications-section">
      <div class="notifications-section-left">
        <CustomCheckbox
            id="lesson-cancel"
            v-model="form.notifications.lessonCancel"
            label="Скасування уроку"
            :disabled="!areNotificationsEnabled"
        />
        <CustomCheckbox
            id="lesson-reschedule"
            v-model="form.notifications.lessonReschedule"
            label="Перенесення уроку"
            :disabled="!areNotificationsEnabled"
        />
        <CustomCheckbox
            id="lesson-feedback"
            v-model="form.notifications.lessonFeedback"
            label="Зворотний зв'язок про урок"
            :disabled="!areNotificationsEnabled"
        />
        <CustomCheckbox
            id="homework-not-done"
            v-model="form.notifications.homeworkNotDone"
            label="Домашнє завдання не виконане"
            :disabled="!areNotificationsEnabled"
        />
      </div>
      <div class="notifications-section-right">
        <div class="notifications-header">
          <button
              class="toggle-notifications"
              :class="{ 'toggle-notifications-stop': !areNotificationsEnabled }"
              @click="toggleDropdown"
              :aria-expanded="showDropdown"
              aria-controls="notifications-dropdown"
              :aria-label="areNotificationsEnabled ? 'Призупинити всі повідомлення' : 'Увімкнути всі повідомлення'"
          >
            {{ areNotificationsEnabled ? 'Призупинити всі повідомлення' : 'Увімкнути всі повідомлення' }}
          </button>
          <div v-if="showDropdown" class="dropdown" id="notifications-dropdown">
            <div
                v-for="duration in areNotificationsEnabled ? ['15 хв', '30 хв', '1 год', '2 год', '4 год'] : ['Увімкнути зараз']"
                :key="duration"
                class="dropdown-item"
                :class="{ 'selected': duration === selectedDuration || (!areNotificationsEnabled && duration === 'Увімкнути зараз') }"
                @click="toggleNotifications(duration === 'Увімкнути зараз' ? undefined : duration as '15 хв' | '30 хв' | '1 год' | '2 год' | '4 год')"
                tabindex="0"
                @keydown.enter="toggleNotifications(duration === 'Увімкнути зараз' ? undefined : duration as '15 хв' | '30 хв' | '1 год' | '2 год' | '4 год')"
            >
              {{ duration }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.general-settings {
  max-width: 600px;

  .title {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 36px;
    color: #333;
  }

  .settings-section {
    margin-bottom: 40px;

    .form-group {
      margin-bottom: 20px;
      width: 320px;

      label {
        display: block;
        margin-bottom: 6px;
        font-weight: 500;
        color: #30303D;
        font-family: Onest;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0%;
      }

      select,
      input {
        width: 100%;
        padding: 10px;
        border: 1.5px solid #30303D26;
        border-radius: 12px;
        font-size: 16px;
        transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
        outline: none;
      }

      select {
        appearance: none;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="%23333" d="M7 10l5 5 5-5z"/></svg>') no-repeat right 10px center;
        background-size: 12px;
        transition: transform 0.2s;
      }

      select:focus {
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="%23333" d="M7 14l5-5 5 5z"/></svg>') no-repeat right 10px center;
        background-size: 12px;
        border-color: #4a90e2;
        box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
      }

      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        input {
          padding-right: 40px;
        }

        input:disabled {
          background-color: #f9f9f9;
          cursor: not-allowed;
        }

        input.editable {
          background-color: #fff;
          border-color: #4a90e2;
          box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
        }

        .edit-button {
          position: absolute;
          right: 10px;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: background-color 0.2s;

          &:hover {
            background-color: #e6f0fa;
          }
        }

        .edit-icon {
          width: 20px;
          height: 20px;
          display: block;
        }
      }

      .error-message {
        color: #e74c3c;
        font-size: 12px;
        margin-top: 5px;
      }

      .error {
        border-color: #e74c3c;
      }
    }
  }

  .notifications-section {
    display: flex;
    gap: 40px;

    .notifications-section-left {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .notifications-header {
      position: relative;
    }

    .toggle-notifications {
      width: 320px;
      padding: 12px 38px;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      background-color: #0066FF;
      border: none;
      border-radius: 16px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #024ebf;
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }

    .toggle-notifications-stop {
      background: #0066FF1A;
      color: #0066FF;

      &:hover {
        color: white;
        background-color: #024ebf;
      }
    }

    .dropdown {
      position: absolute;
      top: 120%;
      left: 0;
      background-color: #fff;
      border-radius: 4px 4px 12px 12px;
      border: 1px solid #ddd;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      z-index: 100;
      min-width: 320px;
      max-height: 200px;
      overflow-y: auto;
    }

    .dropdown-item {
      padding: 10px 10px 10px 30px;
      font-size: 14px;
      font-weight: 400;
      color: #333;
      cursor: pointer;
      transition: background-color 0.2s;
      position: relative;

      &.selected::before {
        content: '';
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="%234a90e2" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>') no-repeat center;
        background-size: contain;
      }

      &:hover,
      &:focus {
        background-color: #e6f0fa;
      }
    }
  }

  @media (max-width: 600px) {
    .dropdown {
      min-width: 100%;
      left: 0;
      right: 0;
    }
  }
}
</style>