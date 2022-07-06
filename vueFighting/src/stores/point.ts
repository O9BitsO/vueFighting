import { defineStore } from "pinia";

export const usePointStore = defineStore({
  id: "point",
  state: () => ({
    winP: 0,
    loseP:0,
  }),
  getters: {
    getPlayerPoint: (state) => state.winP - state.loseP,
    getEnemyPoint: (state) => state.loseP - state.winP,
  },
  actions: {
    win() {
      this.winP++;
    },
    lose() {
      this.loseP++;
    },
  },
});
