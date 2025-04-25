<script setup lang="ts">

</script>

<template>
<div class="dashboard">
  <div class="header">
    <div class="welcome-message">Добридень, Оксана</div>
    <div class="profile">
      <div class="notification-wrapper cursor-pointer">
        <div class="notification"></div>
      </div>
      <div class="profile-image cursor-pointer"></div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.dashboard {
  .header {
    display: flex;
    justify-content: space-between;
    
    .welcome-message {
      font-family: "Onest" sans-serif;
      font-weight: 500;
      font-size: 50px;
      line-height: 114.99999999999999%;
      letter-spacing: -2%;
      color: #FFFFFF;
    }
    
    .profile {
      display: flex;
      align-items: center;
      gap: 20px;
      
      .notification-wrapper {
        background-color: #FFFFFF;
        padding: 18px;
        border-radius: 18px;
        
        .notification {
          width: 32px;
          height: 32px;
          background-image: url('@/assets/images/icons/bell.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
      
      .profile-image {
        width: 80px;
        height: 80px;
        background-image: url('@/assets/images/pages/dashboard/profile-logo.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>