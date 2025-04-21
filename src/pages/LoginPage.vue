<script setup lang="ts">

</script>

<template>
  <div class="login-page">
    <div class="background-gradient">
      <div class="content">
        <div class="logo"></div>
        <div class="text">
          <div class="title">
            Вітаємо ваc<br>у кабінеті вчителя!
          </div>
          <div class="description">
            Тут ви зможете легко керувати навчальним<br>процесом: призначати домашні завдання,<br>видавати сертифікати
            та стежити за прогресом учнів.<br>
            <div class="second-description">
              Разом ми відкриваємо нові горизонти освіти — рушаймо вперед!
            </div>
          </div>
        </div>
      </div>
      <div class="woman-lego-wrapper">
        <div class="woman-lego"></div>
      </div>
    </div>
    <div class="login-form">
      <div class="title">Увiйти</div>
      <div class="description">
        Ласкаво просимо до Gelios School
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap');

.login-page {
  .background-gradient {
    position: relative;
    height: 450px;
    padding: 60px 35px;
    z-index: 1;
    display: flex;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(147.31deg, #2D9AFF 18.95%, #0066FF 121.1%);
      opacity: 0.7;
      z-index: -1;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 30px;
      max-width: 435px;
      z-index: 2;

      .logo {
        background-image: url('@/assets/images/logo/logo.svg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 64px;
        height: 64px;
      }

      .text {
        display: flex;
        flex-direction: column;
        gap: 30px;

        .title {
          font-size: 40px;
          color: #FFFFFF;
          font-family: "Onest", sans-serif;
          font-optical-sizing: auto;
          font-weight: 600;
          font-style: normal;
        }

        .description {
          font-family: "Onest", sans-serif;
          font-optical-sizing: auto;
          font-weight: 300;
          font-size: 16px;
          line-height: 100%;
          color: #FFFFFF;

          .second-description {
            font-family: "Onest", sans-serif;
            font-optical-sizing: auto;
            font-weight: 300;
            font-size: 16px;
            line-height: 100%;
            color: #FFFFFF;
            margin-top: 30px;
          }
        }
      }
    }

    .woman-lego-wrapper {
      position: relative;

      .woman-lego {
        position: absolute;
        bottom: -60px;
        background-image: url('@/assets/images/lego-models/woman-with-roses.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 376px;
        height: 327px;
      }
    }
  }
  
  .login-form {
    position: absolute;
    right: 69px;
    top: 50%;
    transform: translateY(-50%);
    padding: 39px 44px;
    border-radius: 40px;
    box-shadow: 0px 25px 42.9px -18px #0066FF5C;
    background-color: #FFFFFF;
    z-index: 2;
    
    .title {
      font-family: "Onest", sans-serif;
      font-weight: 600;
      font-size: 48px;
      line-height: 100%;
      letter-spacing: -2%;
    }
    
    .description {
      margin-top: 5px;
      font-family: Onest;
      font-weight: 400;
      font-size: 21px;
      line-height: 100%;
      letter-spacing: 0%;
    }
  }
}
</style>