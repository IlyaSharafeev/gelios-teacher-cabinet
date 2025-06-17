<script setup lang="ts">
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, sameAs } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { notify } = useNotification();
const authStore = useAuthStore();
const router = useRouter();

const changePasswordForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const changePasswordRules = computed(() => ({
  oldPassword: { required, minLength: minLength(6) },
  newPassword: { required, minLength: minLength(6) },
  confirmNewPassword: { required, sameAs: sameAs(changePasswordForm.value.newPassword) },
}));

const vChangePassword = useVuelidate(changePasswordRules, changePasswordForm);

const errorMessage = ref<string | null>(null);

const onChangePasswordSubmit = async () => {
  const isValid = await vChangePassword.value.$validate();
  if (isValid) {
    const { success, error } = await authStore.changePassword(changePasswordForm.value);
    if (success) {
      notify({
        title: t("change_password.notifications.success.title"),
        text: t("change_password.notifications.success.text"),
        type: "success",
      });
      router.push("/dashboard");
    } else {
      errorMessage.value = error || t("change_password.notifications.error.text");
      notify({
        title: t("change_password.notifications.error.title"),
        text: errorMessage.value,
        type: "error",
      });
    }
  } else {
    errorMessage.value = t("change_password.notifications.validation.text");
    notify({
      title: t("change_password.notifications.validation.title"),
      text: errorMessage.value,
      type: "error",
    });
  }
};
</script>

<template>
  <div class="change-password-page">
    <div class="change-password-form">
      <h2 class="title">{{ t("change_password.form.title") }}</h2>
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      <div class="form">
        <div class="form-old-password">
          <div class="label">{{ t("change_password.form.old_password.label") }}</div>
          <div class="field-old-password">
            <input
                class="input"
                :class="{ 'input-error': vChangePassword.oldPassword.$error }"
                type="password"
                :placeholder="t('change_password.form.old_password.placeholder')"
                v-model="changePasswordForm.oldPassword"
                @blur="vChangePassword.oldPassword.$touch"
            />
            <div class="error-message" v-if="vChangePassword.oldPassword.$error">
              {{ vChangePassword.oldPassword.$errors[0].$message || t("change_password.validation.password") }}
            </div>
          </div>
        </div>
        <div class="form-new-password">
          <div class="label">{{ t("change_password.form.new_password.label") }}</div>
          <div class="field-new-password">
            <input
                class="input"
                :class="{ 'input-error': vChangePassword.newPassword.$error }"
                type="password"
                :placeholder="t('change_password.form.new_password.placeholder')"
                v-model="changePasswordForm.newPassword"
                @blur="vChangePassword.newPassword.$touch"
            />
            <div class="error-message" v-if="vChangePassword.newPassword.$error">
              {{ vChangePassword.newPassword.$errors[0].$message || t("change_password.validation.password") }}
            </div>
          </div>
        </div>
        <div class="form-confirm-new-password">
          <div class="label">{{ t("change_password.form.confirm_new_password.label") }}</div>
          <div class="field-confirm-new-password">
            <input
                class="input"
                :class="{ 'input-error': vChangePassword.confirmNewPassword.$error }"
                type="password"
                :placeholder="t('change_password.form.confirm_new_password.placeholder')"
                v-model="changePasswordForm.confirmNewPassword"
                @blur="vChangePassword.newPassword.$touch"
            />
            <div class="error-message" v-if="vChangePassword.confirmNewPassword.$error">
              {{ vChangePassword.confirmNewPassword.$errors[0].$message || t("change_password.validation.confirm_password") }}
            </div>
          </div>
        </div>
      </div>
      <div class="button change-password-button" @click="onChangePasswordSubmit">{{ t("change_password.form.submit") }}</div>
    </div>

    <notifications />
  </div>
</template>

<style scoped lang="scss">
.change-password-page {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;

  .change-password-form {
    width: 320px;
    border-radius: 20px;
    background-color: #ffffff;

    .title {
      font-family: "Onest", sans-serif;
      font-weight: 600;
      font-size: 36px;
      line-height: 100%;
      letter-spacing: -2%;
      color: #30303d;
      margin-bottom: 20px;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 30px;

      .form-old-password,
      .form-new-password,
      .form-confirm-new-password {
        .label {
          font-family: Onest;
          font-weight: 400;
          font-size: 16px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #30303d;
          margin-bottom: 12px;
        }

        .field-old-password,
        .field-new-password,
        .field-confirm-new-password {
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
    }

    .change-password-button {
      margin-top: 30px;
      background-color: #0066ff;
      color: #ffffff;
      padding: 16px;
      border-radius: 16px;
      text-align: center;
      cursor: pointer;
      font-family: Onest;
      font-weight: 600;
      font-size: 18px;
      width: 118px;

      &:hover {
        background-color: #0055cc;
      }
    }

    .back-to-dashboard {
      display: block;
      text-align: center;
      margin-top: 15px;
      color: #0066ff;
      font-family: Onest;
      font-weight: 500;
      font-size: 16px;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .error-message {
    color: #ff0000;
    font-family: Onest;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>