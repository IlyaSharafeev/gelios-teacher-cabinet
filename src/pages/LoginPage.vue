<script setup lang="ts">
import SelectInput from "@/components/SelectInput.vue";
import ukrainianLanguageIcon from "@/assets/images/language-icons/UA.svg";
import englishLanguageIcon from "@/assets/images/language-icons/GB.svg";
import { ref, watch, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

const selectOptions = [
  { value: "ua", label: "Українська", icon: ukrainianLanguageIcon },
  { value: "en", label: "English", icon: englishLanguageIcon },
];

const selectedValueLanguage = ref<string>(
    localStorage.getItem("selectedLanguage") || "ua"
);

const isPasswordRecoveryVisible = ref<boolean>(false);
const isRecoverySuccess = ref<boolean>(false);

const loginForm = ref({
  email: "",
  password: "",
});

const loginRules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(6) },
}));

const vLogin = useVuelidate(loginRules, loginForm);

const recoveryForm = ref({
  email: "",
});

const recoveryRules = computed(() => ({
  email: { required, email },
}));

const vRecovery = useVuelidate(recoveryRules, recoveryForm);

const onLoginSubmit = async () => {
  const isValid = await vLogin.value.$validate();
  if (isValid) {
    console.log("Login form submitted:", loginForm.value);
  } else {
    console.log("Login form validation failed");
  }
};

const onRecoverySubmit = async () => {
  const isValid = await vRecovery.value.$validate();
  if (isValid) {
    console.log("Recovery form submitted:", recoveryForm.value);
    isRecoverySuccess.value = true;
  } else {
    console.log("Recovery form validation failed");
  }
};

const showPasswordRecovery = () => {
  isPasswordRecoveryVisible.value = true;
  isRecoverySuccess.value = false;
  recoveryForm.value.email = "";
  vLogin.value.$reset();
  vRecovery.value.$reset();
};

const showLoginForm = () => {
  isPasswordRecoveryVisible.value = false;
  isRecoverySuccess.value = false;
  recoveryForm.value.email = "";
  vRecovery.value.$reset();
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
            Вітаємо ваc<br />у кабінеті вчителя!
          </div>
          <div class="description">
            Тут ви зможете легко керувати навчальним<br />процесом: призначати домашні завдання,<br />видавати сертифікати
            та стежити за прогресом учнів.<br />
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
              <input
                  class="input"
                  :class="{ 'input-error': vLogin.email.$error }"
                  type="email"
                  placeholder="Електронний адрес"
                  v-model="loginForm.email"
                  @blur="vLogin.email.$touch"
              />
              <div class="error-message" v-if="vLogin.email.$error">
                {{ vLogin.email.$errors[0].$message || 'Це поле обов’язкове або некоректний email' }}
              </div>
            </div>
          </div>
          <div class="form-password">
            <div class="label">Введіть ваш пароль</div>
            <div class="field-password">
              <input
                  class="input"
                  :class="{ 'input-error': vLogin.password.$error }"
                  type="password"
                  placeholder="Пароль"
                  v-model="loginForm.password"
                  @blur="vLogin.password.$touch"
              />
              <div class="error-message" v-if="vLogin.password.$error">
                {{ vLogin.password.$errors[0].$message || 'Пароль має бути не менше 6 символів' }}
              </div>
            </div>
          </div>
        </div>
        <div class="button login-button" @click="onLoginSubmit">Увійти</div>
        <div class="forgot-password">
          Забули пароль?
          <div class="refresh" @click="showPasswordRecovery">Відновити</div>
        </div>
      </div>
      <div class="registration-button">Реєстрація</div>
    </div>

    <div class="password-recovery" v-else>
      <div class="title">Відновлення пароля</div>
      <div class="form">
        <template v-if="!isRecoverySuccess">
          <div class="description">
            <span class="second-description">Введіть пошту,</span> прив'язану до вашого профілю
          </div>
          <div class="form-email">
            <div class="label">Адрес електронний пошти</div>
            <div class="field-email">
              <input
                  class="input"
                  :class="{ 'input-error': vRecovery.email.$error }"
                  type="email"
                  placeholder="Електронний адрес"
                  v-model="recoveryForm.email"
                  @blur="vRecovery.email.$touch"
              />
              <div class="error-message" v-if="vRecovery.email.$error">
                {{ vRecovery.email.$errors[0].$message || 'Це поле обов’язкове або некоректний email' }}
              </div>
            </div>
          </div>
          <div class="button recovery-button" @click="onRecoverySubmit">Відновити</div>
          <div class="back-to-login" @click="showLoginForm">Увiйти</div>
        </template>
        <template v-else>
          <div class="success-message">
            Посилання для відновлення пароля надіслано на вашу пошту
          </div>
          <div class="button" @click="showLoginForm">Увiйти</div>
        </template>
      </div>
    </div>

    <SelectInput
        class="select-language"
        v-model="selectedValueLanguage"
        :options="selectOptions"
        :isSelectFirstOptionDefault="true"
    />
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
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(147.31deg, #2d9aff 18.95%, #0066ff 121.1%);
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
        background-image: url("@/assets/images/logo/logo.svg");
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
          color: #ffffff;
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
          color: #ffffff;

          .second-description {
            font-family: "Onest", sans-serif;
            font-optical-sizing: auto;
            font-weight: 300;
            font-size: 16px;
            line-height: 100%;
            color: #ffffff;
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
        background-image: url("@/assets/images/lego-models/woman-with-roses.png");
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
      box-shadow: 0px 25px 42.9px -18px #0066ff5c;
      background-color: #ffffff;
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
          color: #0066ff;
        }
      }

      .form {
        margin-top: 53px;
        display: flex;
        flex-direction: column;
        gap: 22px;

        .form-email,
        .form-password {
          .label {
            font-family: Onest;
            font-weight: 400;
            font-size: 16px;
            line-height: 100%;
            letter-spacing: 0%;
            color: #30303d;
            margin-bottom: 17px;
          }

          .field-email,
          .field-password {
            .input {
              width: 100%;
              padding: 12px 16px;
              border: 1px solid #d0d0d0;
              border-radius: 8px;
              font-family: Onest;
              font-size: 16px;
              line-height: 100%;
              color: #30303d;
              outline: none;
              transition: border-color 0.3s;

              &:focus {
                border-color: #0066ff;
              }
            }

            .input-error {
              border-color: #ff0000;
            }

            .error-message {
              color: #ff0000;
              font-family: Onest;
              font-size: 14px;
              margin-top: 8px;
            }
          }
        }

        .form-password {
          .label {
            margin-bottom: 9px;
          }
        }
      }

      .login-button {
        margin-top: 35px;
        background-color: #0066ff;
        color: #ffffff;
        padding: 16px;
        border-radius: 16px;
        text-align: center;
        cursor: pointer;
        font-family: Onest;
        font-weight: 600;
        font-size: 18px;

        &:hover {
          background-color: #0055cc;
        }
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
        color: #30303d;

        .refresh {
          cursor: pointer;
          color: #0066ff;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .registration-button {
      display: flex;
      justify-content: center;
      background-color: #454a53;
      border-radius: 16px;
      padding: 16px;
      font-weight: 600;
      font-size: 18px;
      color: #ffffff;
      width: 100%;
      cursor: pointer;
      font-family: Onest;

      &:hover {
        background-color: #3a3f47;
      }
    }
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

      &:hover {
        text-decoration: underline;
      }
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
        color: #0066ff;
      }
    }

    .form {
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
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #d0d0d0;
            border-radius: 8px;
            font-family: Onest;
            font-size: 16px;
            line-height: 100%;
            color: #30303d;
            outline: none;
            transition: border-color 0.3s;

            &:focus {
              border-color: #0066ff;
            }
          }

          .input-error {
            border-color: #ff0000;
          }

          .error-message {
            color: #ff0000;
            font-family: Onest;
            font-size: 14px;
            margin-top: 8px;
          }
        }
      }

      .success-message {
        color: #30303d;
        margin-bottom: 53px;
        margin-top: 53px;
        font-family: "Onest" sans-serif;
        font-weight: 400;
        font-size: 21px;
        line-height: 150%;
        letter-spacing: 0%;
      }
    }

    .recovery-button {
      margin-top: 35px;
      background-color: #0066ff;
      color: #ffffff;
      padding: 16px;
      border-radius: 16px;
      text-align: center;
      cursor: pointer;
      font-family: Onest;
      font-weight: 600;
      font-size: 18px;

      &:hover {
        background-color: #0055cc;
      }
    }
  }

  .select-language {
    margin: 60px;
  }
}
</style>