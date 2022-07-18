import { defineStore } from "pinia";
import axios from "axios";
import { useBookStore } from "./book";
import { useLocalStorage } from "@vueuse/core";

const bookStore = useBookStore();

export const usePurchaseStore = defineStore({
  id: "purchase",
  state: () => ({
    shoppingCart: useLocalStorage("purchase/shoppingCart", {}),
    finishedPurchases: useLocalStorage("purchase/finishedPurchases", []),
    pendingPurchases: useLocalStorage("purchase/pendingPurchases", []),
    currentPurchase: {},
  }),

  actions: {
    async getShoppingCart(id: number) {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/purchases?embed=purchasesItems&status=Carrinho&userId=${id}`
        );

        if (data.length && data.length > 0) {
          for (const i in data[0].purchasesItems) {
            data[0].purchasesItems[i].book = await bookStore.getBookById(
              data[0].purchasesItems[i].bookId
            );
          }
        }

        this.shoppingCart = data[0];

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        if (e.response.status === 404)
          return Promise.reject(e.response.statusText);

        return Promise.reject("Erro desconhecido ao consultar 'Compras'");
      }
    },
    async getPendingPurchases(id: number) {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/purchases?embed=purchasesItems&status=Pendente&userId=${id}`
        );

        if (data.length && data.length > 0) {
          for (const i in data[0].purchasesItems) {
            data[0].purchasesItems[i].book = await bookStore.getBookById(
              data[0].purchasesItems[i].bookId
            );
          }
        }

        this.pendingPurchases = data;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        if (e.response.status === 404)
          return Promise.reject(e.response.statusText);
        return Promise.reject("Erro desconhecido ao consultar 'Compras'");
      }
    },
    async getFinishedPurchases(id: number) {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/purchases?embed=purchasesItems&status=Realizado&userId=${id}`
        );

        if (data.length && data.length > 0) {
          for (const i in data[0].purchasesItems) {
            data[0].purchasesItems[i].book = await bookStore.getBookById(
              data[0].purchasesItems[i].bookId
            );
          }
        }

        this.finishedPurchases = data;

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
        if (data) {
          for (const i in data.purchasesItems) {
            data.purchasesItems[i].book = await bookStore.getBookById(
              data.purchasesItems[i].bookId
            );
          }
        }

        this.currentPurchase = data;

        return Promise.resolve(data);
      } catch (e) {
        console.error(e);
        if (e.response.status === 404)
          return Promise.reject(e.response.statusText);
        return Promise.reject("Erro desconhecido ao consultar 'Compra'");
      }
    },
    async realizePurchase(item: Object, userId: number) {
      return await this.createPurchase(userId, "Pendente")
        .then(async (dataPurchase) => {
          // Adiciona os itens na compra
          return await this.createPurchaseItem(dataPurchase.id, item).then(
            (dataItem) => {
              dataPurchase.purchasesItems = [dataItem];
              this.pendingPurchases.push(dataPurchase);
              return Promise.resolve(dataPurchase);
            }
          );
        })
        .catch((error) => {
          return Promise.reject("Erro ao realizar compra");
          console.log(error);
        });
    },

    async addItemToCar(item: Object, userId: number) {
      if (Object.keys(this.shoppingCart).length !== 0) {
        await this.createPurchaseItem(this.shoppingCart.id, item).then(
          (dataItem) => {
            this.shoppingCart.purchasesItems.push(dataItem);

            return Promise.resolve(dataItem);
          }
        );
        this.shoppingCart.purchasesItems.push(dataItem);
      } else {
        return await this.createPurchase(userId, "Carrinho")
          .then(async (dataPurchase) => {
            // Adiciona os itens na compra
            return await this.createPurchaseItem(dataPurchase.id, item).then(
              (dataItem) => {
                dataPurchase.purchasesItems = [dataItem];
                this.shoppingCart = dataPurchase;

                return Promise.resolve(dataPurchase);
              }
            );
          })
          .catch((error) => {
            return Promise.reject("Erro ao realizar compra");
            console.log(error);
          });
      }
    },

    async createPurchase(userId: number, status: string) {
      try {
        const { data } = await axios.post("http://localhost:4000/purchases", {
          userId: userId,
          status: status,
        });

        return Promise.resolve(data);
      } catch (e) {
        console.error(e);
        return Promise.reject("Erro desconhecido ao criar 'Compra'");
      }
    },

    async createPurchaseItem(purchaseId: Integer, item: Object) {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/purchasesItems",
          {
            bookId: item.id,
            quantity: item.quantity,
            purchaseId: purchaseId,
          }
        );

        data.book = await bookStore.getBookById(data.bookId);

        return Promise.resolve(data);
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
