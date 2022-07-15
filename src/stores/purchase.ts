import { defineStore } from "pinia";
import axios from "axios";

export const usePurchaseStore = defineStore({
  id: "purchase",
  state: () => ({
    carPurchase: {},
    finishedPurchase: [],
    currentPurchase: {},
  }),

  actions: {
    async getAllPurchases() {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/purchases/${id}"
        );
        this.finishedPurchase = data;
        return Promise.resolve();
      } catch (e) {
        console.error(e);
        if (e.response.status === 404)
          return Promise.reject(e.response.statusText);
        return Promise.reject("Erro desconhecido ao consultar 'Compras'");
      }
    },
    async getPurchaseById(id: number) {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/purchases/${id}?embed=purchasesItems`
        );

        this.currentPurchase = data;
        return Promise.resolve();
      } catch (e) {
        console.error(e);
        if (e.response.status === 404)
          return Promise.reject(e.response.statusText);
        return Promise.reject("Erro desconhecido ao consultar 'Compra'");
      }
    },

    async addItemToCar(item: Object) {
      if (Object.keys(this.carPurchase).length !== 0) {
        console.log(item);
        return await this.createPurchaseItem(item);
      } else {
        console.log("elseeeeeeeee");

        return await this.createPurchase()
          .then(async (dataPurchase) => {
            // Adiciona os itens na compra
            return await this.createPurchaseItem(
              this.carPurchase.id,
              item
            ).then(() => {
              return Promise.resolve("Item adicionado no carrinho com sucesso");
            });
          })
          .catch((error) => {
            return Promise.reject("Erro ao realizar compra");
            console.log(error);
          });
      }
    },

    async createPurchase() {
      try {
        const { data } = await axios.post("http://localhost:4000/purchases", {
          usuarioId: 10, // TODO: pegar id do store
          status: "Carrinho",
        });

        this.currentPurchase = data;
        this.carPurchase = data;

        return Promise.resolve(data);
      } catch (e) {
        console.error(e);
        return Promise.reject("Erro desconhecido ao criar 'Compra'");
      }
    },
    async createPurchaseItem(item: Object) {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/purchasesItems",
          {
            bookId: item.id,
            quantity: item.quantity,
            purchaseId: this.carPurchase.id,
          }
        );

        return Promise.resolve();
      } catch (e) {
        console.error(e);
        return Promise.reject("Item adicionado no carrinho com sucesso");
      }
    },

    async finishedPurchase(id: number) {
      try {
        const { data } = await axios.put(
          `http://localhost:4000/purchases/${id}`,
          { status: "Realizado" }
        );

        this.currentPurchase = data;

        return Promise.resolve();
      } catch (e) {
        console.error(e);
        if (e.response.status === 404)
          return Promise.reject(e.response.statusText);
        return Promise.reject("Erro desconhecido ao confirmar 'Compra'");
      }
    },
  },
});
