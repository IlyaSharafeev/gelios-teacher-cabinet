<script setup lang="ts">
defineModel<string>({ required: true });
</script>

<template>
  <div class="deadline-picker">
    <input
        v-model="$model"
        type="date"
        class="deadline-picker__date-input"
        placeholder="Оберіть дату"
    />
  </div>
</template>

<style lang="scss" scoped>
.deadline-picker {
  grid-column: 1 / 2;

  .deadline-picker__title {
    font-family: 'Onest', sans-serif;
    font-weight: 500;
    font-size: 32px;
    line-height: 24px;
    letter-spacing: -2%;
    margin-bottom: 32px;
  }

  .deadline-picker__date-input {
    width: 100%;
    padding: 12px 42px;
    border: 1.5px solid #30303d26;
    border-radius: 12px;
    font-family: 'Onest', sans-serif;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: #0066ff;
    }
  }
}
</style>