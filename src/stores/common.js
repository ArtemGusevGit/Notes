import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => ({
    showLoginModal: false,
    showRegModal: false,
    showAddNoteModal: false,
  }),
});
