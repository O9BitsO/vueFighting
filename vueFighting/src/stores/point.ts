import { defineStore } from "pinia";

export const usePointStore = defineStore({
  id: "point",
  state: () => ({
    point: 0,
  }),
  actions: {
    win() {
      this.point++;
    },
    lose() {
      this.point--;
    },
  },
});
