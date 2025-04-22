<script setup lang="ts">
import SelectInput from "@/components/SelectInput.vue";
import ukrainianLanguageIcon from "@/assets/images/language-icons/UA.svg";
import englishLanguageIcon from "@/assets/images/language-icons/GB.svg";
import {ref, watch} from "vue";

const selectOptions = [
  {value: "ua", label: "Українська", icon: ukrainianLanguageIcon},
  {value: "en", label: "English", icon: englishLanguageIcon},
];

const selectedValueLanguage = ref<string>(
    localStorage.getItem("selectedLanguage") || "ua"
);

const isPasswordRecoveryVisible = ref<boolean>(false); // Реактивная переменная для управления видимостью

const showPasswordRecovery = () => {
  isPasswordRecoveryVisible.value = true;
};

const showLoginForm = () => {
  isPasswordRecoveryVisible.value = false;
};

watch(selectedValueLanguage, (newValue) => {
  localStorage.setItem("selectedLanguage", newValue);
});
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
    <div class="login-form-wrapper" v-if="!isPasswordRecoveryVisible">
      <div class="login-form">
        <div class="title">Увiйти</div>
        <div class="description">
          Ласкаво просимо до <span class="name-company cursor-pointer">Gelios School</span>
        </div>
        <div class="form">
          <div class="form-email">
            <div class="label">Адрес електронний пошти</div>
            <div class="field-email">
              <input class="input" type="text" placeholder="Електронний адрес"/>
            </div>
          </div>
          <div class="form-password">
            <div class="label">Введіть ваш пароль</div>
            <div class="field-password">
              <input class="input" type="text" placeholder="Пароль"/>
            </div>
          </div>
        </div>
        <div class="button login-button">Увійти</div>
        <div class="forgot-password">
          Забули пароль?
          <div class="refresh" @click="showPasswordRecovery">Відновити</div>
        </div>
      </div>
      <div class="registration-button">Реєстрація</div>
    </div>
    <div class="password-recovery" v-else>
      <div class="title">Відновлення пароля</div>
      <div class="description"><span class="second-description">Введіть пошту,</span> прив'язану до вашого профілю</div>
      <div class="form">
        <div class="form-email">
          <div class="label">Адрес електронний пошти</div>
          <div class="field-email">
            <input class="input" type="text" placeholder="Електронний адрес"/>
          </div>
        </div>
        <div class="button recovery-button">Відновити</div>
        <div class="back-to-login" @click="showLoginForm">Увiйти</div>
      </div>
    </div>
    <SelectInput class="select-language" v-model="selectedValueLanguage" :options="selectOptions"
                 :isSelectFirstOptionDefault="true"/>
  </div>
</template>

<style scoped lang="scss">
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

  .login-form-wrapper {
    width: 539px;
    position: absolute;
    right: 69px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 59px;

    .login-form {
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
        color: #888888;

        .name-company {
          color: #0066FF;
        }
      }

      .form {
        margin-top: 53px;
        display: flex;
        flex-direction: column;
        gap: 22px;

        .form-email {
          .label {
            font-family: Onest;
            font-weight: 400;
            font-size: 16px;
            line-height: 100%;
            letter-spacing: 0%;
            color: #30303D;
            margin-bottom: 17px;
          }

          .field-email {
            .input {

            }
          }
        }

        .form-password {
          .label {
            font-family: Onest;
            font-weight: 400;
            font-size: 16px;
            line-height: 100%;
            letter-spacing: 0%;
            color: #30303D;
            margin-bottom: 9px;
          }

          .field-password {

          }
        }
      }

      .login-button {
        margin-top: 35px;
      }

      .forgot-password {
        margin-top: 15px;
        display: flex;
        gap: 4px;
        justify-content: center;
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        letter-spacing: 0%;

        .refresh {
          cursor: pointer;
          color: #0066FF;
        }
      }
    }

    .registration-button {
      display: flex;
      justify-content: center;
      background-color: #454A53;
      border-radius: 16px;
      padding: 16px;
      font-weight: 600;
      font-size: 18px;
      color: #FFFFFF;
      width: 100%;
    }
  }

  .select-language {
    margin: 60px;
  }

  .password-recovery {
    width: 539px;
    position: absolute;
    right: 69px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    padding: 39px 44px;
    border-radius: 40px;
    box-shadow: 0px 25px 42.9px -18px #0066ff5c;
    background-color: #ffffff;

    .back-to-login {
      text-align: center;
      cursor: pointer;
      color: #0066ff;
      font-family: Onest;
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 20px;
    }

    .title {
      font-family: "Onest", sans-serif;
      font-weight: 600;
      font-size: 44px;
      line-height: 100%;
      letter-spacing: -2%;
    }

    .description {
      margin-top: 10px;
      font-family: Onest;
      font-weight: 400;
      font-size: 21px;
      line-height: 100%;
      color: #888888;
      
      .second-description {
        color: #0066FF;
      }
    }

    .form {
      margin-top: 53px;
      display: flex;
      flex-direction: column;
      gap: 22px;

      .form-email {
        .label {
          font-family: Onest;
          font-weight: 400;
          font-size: 16px;
          line-height: 100%;
          color: #30303d;
          margin-bottom: 17px;
        }

        .field-email {
          .input {
            /* Стили для input */
          }
        }
      }
    }
  }
}
</style>