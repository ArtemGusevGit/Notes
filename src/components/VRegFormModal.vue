<script>
import VButton from "@/components/UI/VButton.vue";
import VInput from "@/components/UI/VInput.vue";
import VLink from "@/components/UI/VLink.vue";
import VErrorText from "@/components/UI/VErrorText.vue";
import { useCommonStore } from "@/stores/common.js";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router/composables";

export default {
  name: "HomeView",
  components: {
    VButton,
    VInput,
    VLink,
    VErrorText,
  },
  setup() {
    const commonSotre = useCommonStore();
    const authStore = useAuthStore();
    const router = useRouter();

    const { showLoginModal, showRegModal } = storeToRefs(commonSotre);
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errors = ref("");
    const isLoading = ref(false);

    const onSubmit = async () => {
      isLoading.value = true;
      const RegPayload = {
        email: email.value,
        password: password.value,
        confirm_password: confirmPassword.value,
      };
      const LogPayload = {
        email: email.value,
        password: password.value,
      };
      try {
        await authStore.signUpUser(RegPayload);
        await authStore.signInUser(LogPayload);
        await authStore.getUserData();
        showLoginModal.value = false;
        showRegModal.value = false;
        await router.push({ name: "NotesView" });
      } catch (error) {
        errors.value = error.response.data.message;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      showRegModal,
      onSubmit,
      email,
      password,
      confirmPassword,
      showLoginModal,
      isLoading,
      errors,
    };
  },
};
</script>

<template>
  <transition name="modal">
    <div class="modal-mask" v-if="showRegModal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h2 class="modal-title">Регистрация</h2>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <ValidationProvider
                name="Email"
                rules="required|email"
                v-slot="{ errors }"
              >
                <VInput
                  label="Email"
                  v-model="email"
                  placeholder="Email"
                  v-bind:error-message="errors"
                />
              </ValidationProvider>
              <ValidationProvider
                rules="required|min:5|max:12"
                name="password"
                v-slot="{ errors }"
              >
                <VInput
                  v-model="password"
                  label="Пароль"
                  placeholder="Пароль"
                  type="password"
                  :error-message="errors"
                />
              </ValidationProvider>
              <ValidationProvider
                name="password_2"
                rules="required|confirmed:password|min:5|max:12"
                v-slot="{ errors }"
              >
                <VInput
                  v-model="confirmPassword"
                  label="Пароль еще раз"
                  placeholder="Пароль"
                  type="password"
                  :error-message="errors"
                />
              </ValidationProvider>
              <div class="modal-actions">
                <div class="modal-links">
                  <span>У вас есть аккаунт?</span>
                  <VLink @click="showRegModal = false">Войдите</VLink>
                </div>
                <div class="modal-button">
                  <VButton
                    :disabled="isLoading"
                    :showLoadIcon="isLoading"
                    :fullWidth="true"
                    type="submit"
                  >
                    Зарегистрироваться
                  </VButton>
                </div>
              </div>
            </form>
          </ValidationObserver>
          <VErrorText v-if="errors">{{ errors.toString() }}</VErrorText>
          <VButton
            class="modal-close-button"
            :showCloseIcon="true"
            @click="showRegModal = false"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: $transition-base;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  border-radius: 2.5rem !important;
  position: relative;
  max-width: 48.7rem;
  margin: 0 auto;
  padding: 5rem;
  background-color: $dark-light;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: $transition-base;

  @include media-breakpoint-down(xxl) {
    max-width: 37rem;
    padding: 3.5rem;
  }

  @include media-breakpoint-down(sm) {
    padding: 1.5rem;
  }
}

.modal-title {
  @include media-breakpoint-down(sm) {
    margin-top: 5rem;
  }
}

.modal-close-button {
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
}

.modal-actions {
  margin-top: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include media-breakpoint-down(sm) {
    flex-direction: column-reverse;
  }
}

.modal-button {
  @include media-breakpoint-down(sm) {
    width: 100%;
    margin-bottom: 1rem;
  }
}

.modal-links {
  display: flex;
  align-items: start;
  gap: 0.5rem;

  @include media-breakpoint-down(xxl) {
    // flex-direction: column;
    gap: 0;
  }

  @include media-breakpoint-down(sm) {
    gap: 0.5rem;
    font-size: 14px;
    flex-direction: row;
  }
}

.actions-link {
  display: flex;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
