import { defineStore } from "pinia";
import axios from "axios";

export const useBookStore = defineStore({
  id: "book",
  state: () => ({
    books: [],
    currentBook: [],
  }),

  actions: {
    async getAllBooks() {
      try {
        const { data } = await axios.get("http://localhost:4000/books");
        this.books = data;
        return Promise.resolve();
      } catch (e) {
        console.error(e);
        if (e.response.status === 404)
          return Promise.reject(e.response.statusText);
        return Promise.reject("Erro desconhecido ao consultar 'Books'");
      }
    },
    async getBookById(id: number) {
      try {
        const { data } = await axios.get(`http://localhost:4000/books/${id}`);

        this.currentBook = data;
        this.currentBook.quantity = 1;
        return Promise.resolve(data);
      } catch (e) {
        console.error(e);
        if (e.response.status === 404)
          return Promise.reject(e.response.statusText);
        return Promise.reject("Erro desconhecido ao consultar 'Livro'");
      }
    },
    async incrementQuantity() {
      this.currentBook.quantity++;
    },
    async decrementQuantity() {
      this.currentBook.quantity--;
    },
  },
});
