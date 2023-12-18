import { defineStore } from "pinia";
import apiClient from "@/services/apiClient.js";

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: null,
  }),

  getters: {
    notesSerialized: (state) =>
      state.notes?.map((note) => ({
        title: note.title,
        content: note.content,
        id: note.id,
      })),
  },

  actions: {
    async createNote(payload) {
      try {
        await apiClient.post("/notes", payload);
      } catch (error) {
        return await Promise.reject(error);
      }
    },
    async getUserNotes() {
      try {
        const { data } = await apiClient.get("/notes");
        this.notes = data;
      } catch (error) {
        return await Promise.reject(error);
      }
    },
    async deleteNote(id) {
      try {
        await apiClient.delete(`/notes/${id}`);
      } catch (error) {
        return await Promise.reject(error);
      }
    },
  },
});
