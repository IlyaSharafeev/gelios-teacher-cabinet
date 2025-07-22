<script setup lang="ts">
import { reactive, computed, watch, onMounted } from 'vue';
import { useCertificatesStore, type CertificateDirection, type CertificateLevel } from "@/stores/certificates.ts";
import { storeToRefs } from 'pinia';
import { jsPDF } from 'jspdf';

// Импорт компонентов
import StudentSelector from './StudentSelector.vue';
import SelectedStudentsCertification from './SelectedStudentsCertification.vue';
import SelectedLevelCertification from './SelectedLevelCertification.vue';
import SelectedDirection from './SelectedDirection.vue';
import LanguageSelector from './LanguageSelector.vue';

// Импорт ассетов (изображения, шрифты)...
import successImage from '@/assets/backgrounds/certification/success.png';
import NunitoFont from '@/assets/fonts/Nunito-VariableFont_wght.ttf';
import MarckScriptFont from '@/assets/fonts/MarckScript-Regular.ttf';
// ... все остальные импорты картинок остаются без изменений
import itGeliosStartEn from "@/assets/backgrounds/certificate-level-en/IT Gelios Start.png";
import SchooolPreparationEn from "@/assets/backgrounds/certificate-level-en/Підготовка до школи.png";
import SpeechTherapyEn from "@/assets/backgrounds/certificate-level-en/Логопедія.png";
import MentalArithmeticEn from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика.png";
import MentalArithmeticEn1 from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика - 1.png";
import MentalArithmeticEn2 from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика - 2.png";
import MentalArithmeticEn3 from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика - 3.png";
import MentalArithmeticEn4 from "@/assets/backgrounds/certificate-level-en/Ментальна арифметика - 4.png";
import MultiplicationandDivisionEn from "@/assets/backgrounds/certificate-level-en/Множення і ділення.png";
import SpeedReadingEn from "@/assets/backgrounds/certificate-level-en/Швидкочитання.png";
import SpeedReadingEn1 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 1.png";
import SpeedReadingEn2 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 2.png";
import SpeedReadingEn3 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 3.png";
import SpeedReadingEn4 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 4.png";
import SpeedReadingEn5 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 5.png";
import SpeedReadingEn6 from "@/assets/backgrounds/certificate-level-en/Швидкочитання - 6.png";
import SpeedReadingSpeechTherapyEn1 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 1.png";
import SpeedReadingSpeechTherapyEn2 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 2.png";
import SpeedReadingSpeechTherapyEn3 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 3.png";
import SpeedReadingSpeechTherapyEn4 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 4.png";
import SpeedReadingSpeechTherapyEn5 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 5.png";
import SpeedReadingSpeechTherapyEn6 from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія - 6.png";
import SpeedReadingSpeechTherapyEn from "@/assets/backgrounds/certificate-level-en/Швидкочитання+Логопедія.png";
import itGeliosStartUk from "@/assets/backgrounds/certificate-level-uk/IT Gelios Start.png";
import SpeechTherapyUk from "@/assets/backgrounds/certificate-level-uk/Логопедія.png";
import MentalArithmeticUk from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика.png";
import MentalArithmeticUk1 from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика - 1.png";
import MentalArithmeticUk2 from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика - 2.png";
import MentalArithmeticUk3 from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика - 3.png";
import MentalArithmeticUk4 from "@/assets/backgrounds/certificate-level-uk/Ментальна арифметика - 4.png";
import MultiplicationandDivisionUkr from "@/assets/backgrounds/certificate-level-uk/Множення і ділення.png";
import SpeedReadingUk from "@/assets/backgrounds/certificate-level-uk/Швидкочитання.png";
import SpeedReadingUk1 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 1.png";
import SpeedReadingUk2 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 2.png";
import SpeedReadingUk3 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 3.png";
import SpeedReadingUk4 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 4.png";
import SpeedReadingUk5 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 5.png";
import SpeedReadingUk6 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання - 6.png";
import SpeedReadingSpeechTherapyUk1 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 1.png";
import SpeedReadingSpeechTherapyUk2 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 2.png";
// import SpeedReadingSpeechTherapyUk3 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 3.png";
import SpeedReadingSpeechTherapyUk4 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 4.png";
import SpeedReadingSpeechTherapyUk5 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 5.png";
import SpeedReadingSpeechTherapyUk6 from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія - 6.png";
import SpeedReadingSpeechTherapyUk from "@/assets/backgrounds/certificate-level-uk/Швидкочитання+Логопедія.png";


// Карта изображений...
const imageMap: Record<string, string> = {
  itGeliosStartEn, SpeechTherapyEn, MentalArithmeticEn, MentalArithmeticEn1, MentalArithmeticEn2, MentalArithmeticEn3, MentalArithmeticEn4,
  MultiplicationandDivisionEn, SpeedReadingEn, SpeedReadingEn1, SpeedReadingEn2, SpeedReadingEn3, SpeedReadingEn4, SpeedReadingEn5, SpeedReadingEn6,
  SpeedReadingSpeechTherapyEn, SpeedReadingSpeechTherapyEn1, SpeedReadingSpeechTherapyEn2, SpeedReadingSpeechTherapyEn3, SpeedReadingSpeechTherapyEn4,
  SpeedReadingSpeechTherapyEn5, SpeedReadingSpeechTherapyEn6, itGeliosStartUk, SpeechTherapyUk, MentalArithmeticUk, MentalArithmeticUk1, MentalArithmeticUk2,
  MentalArithmeticUk3, MentalArithmeticUk4, MultiplicationandDivisionUkr, SpeedReadingUk, SpeedReadingUk1, SpeedReadingUk2, SpeedReadingUk3, SpeedReadingUk4,
  SpeedReadingUk5, SpeedReadingUk6, SpeedReadingSpeechTherapyUk, SpeedReadingSpeechTherapyUk1, SpeedReadingSpeechTherapyUk2,
  SpeedReadingSpeechTherapyUk4, SpeedReadingSpeechTherapyUk5, SpeedReadingSpeechTherapyUk6, SchooolPreparationEn
};


// --- ИНТЕГРАЦИЯ PINIA STORE ---
const certificateStore = useCertificatesStore();
// Получаем студентов вместе с другими данными
const { languages: availableLanguages, directions: directionsData, students: backendStudents } = storeToRefs(certificateStore);

onMounted(() => {
  // Загружаем все необходимые данные
  certificateStore.fetchCertificateDirections();
  certificateStore.fetchCertificateLanguages();
  certificateStore.fetchStudents();
});
// ---------------------------------


// --- ЛОКАЛЬНОЕ СОСТОЯНИЕ КОМПОНЕНТА ---
const currentStep = reactive({ value: 1 });
const selectedDirection = reactive({ value: null as number | null });
const selectedLevel = reactive({ value: [] as number[] });
const selectedLanguage = reactive({ value: null as string | null });
const selectedStudents = reactive({ value: [] as number[] });
const levels = reactive<CertificateLevel[]>([]);
const emit = defineEmits(['has-unsaved-changes']);
// ------------------------------------


// --- КОМПЬЮТЕД СВОЙСТВА ---
const availableDirections = computed((): CertificateDirection[] => {
  if (!selectedLanguage.value || !directionsData.value) return [];
  const langInfo = availableLanguages.value.find(lang => lang.id === selectedLanguage.value);
  if (!langInfo) return [];
  return directionsData.value[langInfo.direction] || [];
});

// Форматируем студентов для селектора
const formattedStudents = computed(() => {
  return backendStudents.value.map(student => ({
    id: parseInt(student.student_id, 10),
    name: `${student.first_name} ${student.last_name}`
  }));
});


const isFormValid = computed(() => (
    selectedDirection.value !== null &&
    selectedLevel.value.length > 0 &&
    selectedLanguage.value !== null &&
    selectedStudents.value.length > 0
));

// ... остальная часть computed-свойств ...
const hasUnsavedChanges = computed(() => (
    selectedDirection.value !== null ||
    selectedLevel.value.length > 0 ||
    selectedLanguage.value !== null ||
    selectedStudents.value.length > 0
));


// --- WATCHers ---
// ... без изменений
watch([() => selectedDirection.value, () => selectedLanguage.value],
    ([newDirectionId, newLanguageId]) => {
      levels.splice(0, levels.length);
      if (newDirectionId !== null && newLanguageId !== null) {
        const direction = availableDirections.value.find(d => d.id === newDirectionId);
        if (direction?.levels) levels.push(...direction.levels);
      }
      selectedLevel.value = selectedLevel.value.filter(levelId =>
          levels.some(level => level.id === levelId)
      );
    }, { deep: true }
);

watch(hasUnsavedChanges, (value) => {
  emit('has-unsaved-changes', value);
});

// --- ЛОГИКА НАВИГАЦИИ И ГЕНЕРАЦИИ PDF ---
// ... остальная логика (steps, nextStep, prevStep, resetForm, formatDate, generateCertificate) без изменений
const steps = [
  { id: 1, name: 'Вибір напрямку, рівня, мови та учнів' },
  { id: 2, name: 'Ваш вибір' },
  { id: 3, name: 'Сертифікати додані' }
];

const nextStep = () => { if (isFormValid.value) currentStep.value++; };
const prevStep = () => { if (currentStep.value > 1) currentStep.value--; };
const resetForm = () => {
  selectedDirection.value = null;
  selectedLevel.value = [];
  selectedLanguage.value = null;
  selectedStudents.value = [];
  currentStep.value = 1;
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}\n${year}`;
};

const generateCertificate = async (studentName: string, levelId: number): Promise<void> => {
  const level = levels.find((l) => l.id === levelId);
  if (!level || !imageMap[level.image]) {
    const errorMsg = `Не найден уровень с ID: ${levelId} или изображение: ${level?.image}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageMap[level.image]; // Используем imageMap для получения пути к изображению

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Failed to get canvas context'));

      ctx.drawImage(img, 0, 0);

      const marckScriptFont = new FontFace('MarckScript', `url(${MarckScriptFont})`);
      const nunitoFont = new FontFace('Nunito', `url(${NunitoFont})`);

      Promise.all([marckScriptFont.load(), nunitoFont.load()]).then(([loadedMarckScript, loadedNunito]) => {
        document.fonts.add(loadedMarckScript);
        document.fonts.add(loadedNunito);

        ctx.font = 'italic bold 100px MarckScript, sans-serif';
        ctx.fillStyle = '#800080';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(studentName, canvas.width / 2 + 500, canvas.height / 2 - 15);

        ctx.font = 'bold 55px Nunito, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        const currentDate = new Date('2025-07-22'); // Текущая дата
        const dateText = formatDate(currentDate);
        const dateLines = dateText.split('\n');
        const dateX = canvas.width - 480;
        const dateY = canvas.height - 235;
        ctx.fillText(dateLines[0], dateX, dateY - 65);
        ctx.fillText(dateLines[1], dateX, dateY);

        const pdf = new jsPDF({
          orientation: img.width > img.height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [img.width, img.height]
        });

        pdf.addFont(MarckScriptFont, 'MarckScript', 'normal');
        pdf.addFont(NunitoFont, 'Nunito', 'normal');
        pdf.setFont('MarckScript');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, img.width, img.height);
        pdf.save(`Certificate_${studentName}_${level.name}.pdf`);
        resolve();
      }).catch(reject);
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${level.image}`));
  });
};


const addCertificates = async () => {
  if (!isFormValid.value) return;
  try {
    for (const studentId of selectedStudents.value) {
      // Ищем студента в отформатированном списке
      const student = formattedStudents.value.find((s) => s.id === studentId);
      if (!student) continue;
      for (const levelId of selectedLevel.value) {
        await generateCertificate(student.name, levelId);
      }
    }
    currentStep.value = 3;
    setTimeout(resetForm, 2000);
  } catch (error) {
    console.error('Ошибка при генерации сертификатов:', error);
  }
};
</script>

<template>
  <div class="certificate-form">
    <div class="certificate-form__header" v-if="currentStep.value > 1">
      <span class="certificate-form__back-arrow" @click="prevStep">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <h1 class="certificate-form__header-title">{{ steps[currentStep.value - 1].name }}</h1>
    </div>

    <div v-if="currentStep.value === 1" class="certificate-form__content">
      <LanguageSelector
          :items="availableLanguages"
          v-model="selectedLanguage.value"
          title="Мова"
          no-items-text="Мови не знайдено"
      />
      <StudentSelector
          :items="availableDirections"
          v-model="selectedDirection.value"
          title="Напрямок"
          no-items-text="Спочатку виберіть мову"
          :single-select="true"
          :show-checkbox="false"
      />
      <StudentSelector
          :items="levels"
          v-model="selectedLevel.value"
          title="Рівень"
          no-items-text="Спочатку виберіть напрямок"
          select-all-text="Вибрати всі рівні"
      />
      <StudentSelector
          :items="formattedStudents"
          v-model="selectedStudents.value"
          title="Мої учні"
          select-all-text="Вибрати всіх"
          no-items-text="Студенти не знайдені"
      />
    </div>

    <div v-if="currentStep.value === 2" class="certificate-form__content step-confirmation">
      <div class="confirmation-step">
        <SelectedDirection :directions="availableDirections" v-model="selectedDirection.value" />
        <div class="confirmation-item">
          <strong>Мова сертифіката</strong>
          <span>{{ availableLanguages.find(l => l.id === selectedLanguage.value)?.name || 'N/A' }}</span>
        </div>
        <SelectedLevelCertification :levels="levels" v-model="selectedLevel.value" :image-map="imageMap" />
        <SelectedStudentsCertification :students="formattedStudents" v-model="selectedStudents.value" />
      </div>
    </div>

    <div v-if="currentStep.value === 3" class="certificate-form__content step-success">
      <div class="success-step">
        <img :src="successImage" alt="Success" class="success-image" />
        <h2 class="success-title">Сертифікати успішно додані</h2>
      </div>
    </div>

    <div class="button-group" v-if="currentStep.value < 3">
      <button v-if="currentStep.value === 2" class="rounded-button button large-button" @click="prevStep">Назад</button>
      <button class="button large-button next-button" :disabled="!isFormValid" @click="currentStep.value === 1 ? nextStep() : addCertificates()">
        {{ currentStep.value === 1 ? 'Далі' : 'Додати' }}
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