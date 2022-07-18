import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import axios from "axios";
import { usePurchaseStore } from "@/stores/purchase";

import type { User } from "@/entities/user";

const purchaseStore = usePurchaseStore();

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

  actions: {
    async login(email: string, password: string) {
      await axios
        .post("http://localhost:4000/login", {
          email,
          password,
        })
        .then(async (data) => {
          this.loggedIn = true;
          this.user = data.data.user;

          await purchaseStore.getFinishedPurchases(this.user.id);
          await purchaseStore.getPendingPurchases(this.user.id);
          await purchaseStore.getShoppingCart(this.user.id);

          console.log("aaaa", this.user.id);
          return Promise.resolve();
        })
        .catch(() => {
          console.log("deu merda");
          return Promise.reject();
        });
    },
    async logout() {
      this.loggedIn = false as boolean;
      this.user = {} as User;
      purchaseStore.pendingPurchases = [];
      purchaseStore.finishedPurchases = [];
      purchaseStore.shoppingCart = [];

      purchaseStore.currentPurchase = [];
    },
  },
});
