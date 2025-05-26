<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('homework');

import HomeworkForm from '@/components/AddHomeWorkForm.vue'; // Предполагаемый компонент для формы домашнего задания
import CertificateForm from '@/components/AddSertificateForm.vue'; // Предполагаемый компонент для формы сертификата

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="add-homework-page">
    <div class="tabs">
      <button
          :class="{ active: activeTab === 'homework' }"
          @click="setActiveTab('homework')"
      >
        Домашнє завдання
      </button>
      <button
          :class="{ active: activeTab === 'certificate' }"
          @click="setActiveTab('certificate')"
      >
        Сертификат
      </button>
    </div>

    <!-- Условное отображение контента -->
    <div class="content">
      <HomeworkForm v-if="activeTab === 'homework'" />
      <CertificateForm v-if="activeTab === 'certificate'" />
    </div>
  </div>
</template>

<style scoped>
.add-homework-page {
  padding-top: 0;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: fit-content;
  background-color: #FFFFFF;
  border-radius: 16px;
}

button {
  padding: 12px 26px;
  border: none;
  background: #FFFFFF;
  cursor: pointer;
  border-radius: 16px;
  font-size: 16px;
  font-family: "Onest" sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
}

button.active {
  background: #0066FF;
  border-radius: 16px;
  padding: 12px 26px;
  font-family: "Onest" sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: white;
}

button.active:hover {
  background: #0056b3;
}

.content {
  padding: 42px;
  background-color: #FFFFFF;
  border-radius: 32px;
}
</style>