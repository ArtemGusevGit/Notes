<script>
import VButton from "@/components/UI/VButton.vue";
import VInput from "@/components/UI/VInput.vue";
import VLink from "@/components/UI/VLink.vue";
import VTextArea from "@/components/UI/VTextArea.vue";
import { useCommonStore } from "@/stores/common.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useNotesStore } from "@/stores/notes.js";

export default {
  name: "HomeView",
  components: {
    VButton,
    VInput,
    VLink,
    VTextArea,
  },
  setup() {
    const commonStore = useCommonStore();
    const notesStore = useNotesStore();
    const { showAddNoteModal } = storeToRefs(commonStore);

    const noteName = ref("");
    const noteText = ref("");
    const isLoading = ref(false);

    const onSubmit = async () => {
      isLoading.value = true;
      const payload = {
        title: noteName.value,
        content: noteText.value,
      };

      try {
        await notesStore.createNote(payload);
        await notesStore.getUserNotes();
      } catch (error) {
      } finally {
        isLoading.value = false;
        showAddNoteModal.value = false;
        noteName.value = "";
        noteText.value = "";
      }
    };

    return {
      showAddNoteModal,
      onSubmit,
      noteName,
      noteText,
      isLoading,
    };
  },
};
</script>

<template>
  <transition name="modal">
    <div class="modal-mask" v-if="showAddNoteModal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h2 class="modal-title">Добавление заметки</h2>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <ValidationProvider
                name="noteName"
                rules="required|max:64"
                v-slot="{ errors }"
              >
                <VInput
                  label="Название заметки"
                  v-model="noteName"
                  placeholder="Введите название"
                  type="text"
                  :error-message="errors"
                  :show-counter="true"
                  :max-length="64"
                />
              </ValidationProvider>
              <ValidationProvider
                rules="required|max:255"
                name="noteText"
                v-slot="{ errors }"
              >
                <VTextArea
                  v-model="noteText"
                  label="Текст заметки"
                  placeholder="Введите текст"
                  type="text"
                  :error-message="errors"
                  :show-counter="true"
                  :max-length="255"
                />
              </ValidationProvider>
              <div class="modal-actions">
                <div class="modal-links">
                  <!-- <span>У вас есть аккаунт?</span>
                  <VLink @click="showRegModal = false">Войдите</VLink> -->
                </div>
                <div class="modal-button">
                  <VButton
                    :fullWidth="true"
                    :disabled="isLoading"
                    :showLoadIcon="isLoading"
                    type="submit"
                    >Добавить</VButton
                  >
                </div>
              </div>
            </form>
          </ValidationObserver>
          <VButton
            class="modal-close-button"
            :showCloseIcon="true"
            @click="showAddNoteModal = false"
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
  transition: all 0.3s ease;

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
  float: right;

  @include media-breakpoint-down(sm) {
    width: 100%;
    margin-bottom: 1rem;
  }
}

.modal-links {
  display: flex;
  align-items: start;

  @include media-breakpoint-down(xxl) {
    // flex-direction: column;
  }

  @include media-breakpoint-down(sm) {
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
