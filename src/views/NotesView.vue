<script>
import VButton from "@/components/UI/VButton.vue";
import VAddNoteModal from "@/components/VAddNoteModal.vue";
import { useCommonStore } from "@/stores/common.js";
import { storeToRefs } from "pinia";
import { useNotesStore } from "@/stores/notes.js";
import { onMounted, ref } from "vue";

export default {
  name: "NotesView",
  components: {
    VButton,
    VAddNoteModal,
  },

  setup() {
    const commonStore = useCommonStore();
    const notesStore = useNotesStore();

    const { showAddNoteModal } = storeToRefs(commonStore);
    const { notesSerialized } = storeToRefs(notesStore);

    onMounted(async () => {
      await notesStore.getUserNotes();
    });

    const deleteNote = async (id) => {
      try {
        await notesStore.deleteNote(id);
        await notesStore.getUserNotes();
      } catch (error) {}
    };

    return {
      showAddNoteModal,
      notesSerialized,
      deleteNote,
    };
  },
};
</script>

<template>
  <div class="notes">
    <div class="note" v-for="(note, idx) in notesSerialized" :key="idx">
      <h4 class="note-title">{{ note.title }}</h4>
      <div class="note-content">{{ note.content }}</div>
      <div class="note-actions">
        <VButton
          class="note-btn"
          @click="deleteNote(note.id)"
          :showCloseIcon="true"
          >Удалить</VButton
        >
      </div>
    </div>
    <VButton
      class="add-note-btn"
      @click="showAddNoteModal = !showAddNoteModal"
      :showAddIcon="true"
    />
    <VAddNoteModal />
  </div>
</template>

<style lang="scss">
.notes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 1.25rem;
  @include media-breakpoint-down(sm) {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
}

.note {
  box-shadow: 0px 15px 15px -10px rgba(0, 0, 0, 0.40);
}

.note-title {
  position: relative;
  padding: 1.25rem 3.5rem 1.25rem 1.75rem;
  background-color: $green-light;
  margin: 0;
  border-top-left-radius: 1rem;
  border-bottom: 1px solid $gray;
  word-wrap: break-word;

  &::before {
    content: "";
    position: absolute;
    height: 40px;
    width: 40px;
    background-color: $dark;
    top: 0;
    right: 0;
    border: 20px solid transparent;
    border-bottom: 20px solid $green;
    border-left: 20px solid $green;
    border-bottom-left-radius: 0.5rem;
  }
}

.note-content {
  padding: 1.25rem 1.75rem 1.75rem 1.75rem;
  font-size: 20px;
  background-color: $green-light;
  word-wrap: break-word;
}

.note-actions {
  background-color: $green-light;
  padding: 0.5rem 0.5rem 0.5rem;
  display: flex;
  justify-content: flex-end;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.add-note-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
