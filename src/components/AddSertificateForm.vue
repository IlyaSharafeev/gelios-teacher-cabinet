<script setup lang="ts">
</script>

<template>
  <div>
    <h2>Форма для добавления сертификата</h2>
    <form>
      <input type="text" placeholder="Название сертификата" />
      <input type="text" placeholder="Номер сертификата" />
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #218838;
}
</style>