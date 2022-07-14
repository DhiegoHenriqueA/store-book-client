import { defineStore } from "pinia";
import axios from "axios";

export const usePurchaseStore = defineStore({
  id: "purchase",
  state: () => ({
    purchasesPending: [],
    currentPurchase: [],
  }),

  actions: {
    async getAllPurchases() {
      try {
        const { data } = await axios.get("http://localhost:4000/purchases");
        this.purchasesPending = data;
        return Promise.resolve();
      } catch (e) {
        console.error(e);
        if (e.response.status === 404)
          return Promise.reject(e.response.statusText);
        return Promise.reject("Erro desconhecido ao consultar 'Catgory'");
      }
    },

    async createPendingPurchase() {},

    async createFinishPurchase(purchasesItems) {
      await this.createPurchase({
        usario_id: 10,
      });

      await this.createPurchaseItens(this.currentPurchase.id, purchasesItems);
    },
    async createPurchase(purchase) {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/purchases",
          purchase
        );

        this.currentPurchase = data;
        return Promise.resolve();
      } catch (e) {
        console.error(e);
        if (e.response.status === 404)
          return Promise.reject(e.response.statusText);
        return Promise.reject("Erro desconhecido ao consultar 'Catgory'");
      }
    },
    async createPurchaseItens(purchaseId, items) {
      for (const item of items) {
        try {
          const { data } = await axios.post(
            "http://localhost:4000/purchasesItems",
            {
              book_id: item.id,
              quantity: item.quantity,
              purchase_id: purchaseId,
            }
          );

          return Promise.resolve();
        } catch (e) {
          console.error(e);
          if (e.response.status === 404)
            return Promise.reject(e.response.statusText);
          return Promise.reject("Erro desconhecido");
        }
      }
    },

    async finishPurchase() {},
  },
});
