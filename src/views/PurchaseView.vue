<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";
import { usePurchaseStore } from "@/stores/purchase";
import { useUserStore } from "@/stores/user";
import { useBookStore } from "@/stores/book";

const purchaseStore = usePurchaseStore();
const bookStore = useBookStore();
const userStore = useUserStore();
const { currentBook } = storeToRefs(useBookStore());

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await bookStore.getBookById(route.params.id).catch((error) => {
    alert(error);
  });
});

const realizePurchase = () => {
  purchaseStore
    .realizePurchase(currentBook.value, userStore.user.id)
    .then((data) => {
      console.log(data);
      router.push({
        name: "purchaseReview",
        params: { id: data.id },
      });
    })
    .catch((error) => {
      alert(error);
    });
};
const addItemToCar = () => {
  purchaseStore
    .addItemToCar(currentBook.value, userStore.user.id)
    .then((data) => {
      alert("Item adicionado no carrinho com sucesso");
    })
    .catch((error) => {
      alert(error);
    });
};
</script>
<template>
  <div class="q-pa-md" style="justify-content: center; display: flex">
    <div class="shadow-2 rounded-borders container">
      <div class="q-pa-md row" style="height: 65vh">
        <div class="capa col-6">
          <q-card style="height: 100%">
            <q-img :src="currentBook.img" height="100%" />
          </q-card>
        </div>
        <div class="q-pa-lg col-6">
          <div class="text-h6">{{ currentBook.title }}</div>
          <div class="text-subtitle2">{{ currentBook.caption }}</div>
          <div class="text">
            {{ currentBook.author }}, {{ currentBook.category }}
          </div>
          <div class="q-mt-md">
            <span class="text-h6">{{ currentBook.amount }}</span>
          </div>

          <div class="q-mt-md">
            <q-btn><q-icon name="remove"></q-icon></q-btn>
            <span class="q-ma-lg">{{ currentBook.quantity }}</span>
            <q-btn @click="bookStore.incrementQuantity"
              ><q-icon name="add"></q-icon
            ></q-btn>
          </div>
          <div class="q-mt-md">
            <q-btn
              class=""
              color="white"
              text-color="black"
              label="Adiconar ao Carinho"
              @click="addItemToCar"
            />
            <q-btn @click="realizePurchase" color="secondary" label="Comprar" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="q-pa-md" style="justify-content: center; display: flex">
    <div class="shadow-2 rounded-borders container row">
      <div class="q-pa-md col-9 row" style="height: 35vh">
        <h5>Avaliações</h5>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  background-color: rgb(255, 255, 255);
  width: 60%;
}
</style>
