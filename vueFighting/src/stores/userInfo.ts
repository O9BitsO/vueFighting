import { defineStore } from "pinia";

export const useUserInfoStore = defineStore({
  id: "userInfo",
  state: () => ({
    email: '',
    displayName: '',
    photoURL: '',
  }),
  getters: {
    getUserInfo: (state) => state,
    getUserPhoto: (state) => state.photoURL,
  },
  actions: {
    setUserInfo({email, displayName, photoURL} : {email: string, displayName: string, photoURL: string}) {
      this.email = email;
      this.displayName = displayName;
      this.photoURL = photoURL;
    },
  },
});
