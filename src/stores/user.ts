import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import type { User } from "@/entities/user";

interface IState {
  loggedIn: boolean;
  user?: User;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): IState => ({
    loggedIn: useLocalStorage("auth/loggedIn", false) as unknown as boolean,
    user: useLocalStorage("auth/user", {}) as unknown as User,
  }),

  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    login() {
      this.loggedIn = true;
    },
  },
});
