import { defineStore } from "pinia";

export const store = defineStore({
  id: "store",
  state: () => ({
    msalConfig: {
      auth: {
        clientId: "9d5d0ee7-3faa-4a0e-b062-e79ff5d78ed1",
        authority:
          "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a",
      },
      cache: {
        cacheLocation: "localStorage",
      },
    },
    accessToken: "",
  }),
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token;
    },
  },
});
