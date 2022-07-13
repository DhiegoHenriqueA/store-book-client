<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const router = useRoute();

const book = ref([]);

onMounted(async () => {
  await findBook(router.params.id);
});

const findBook = (id) => {
  axios
    .get(`http://localhost:4000/books/${id}`)
    .then((response) => {
      book.value = response.data;
    })
    .catch((error) => console.log(error));
};
</script>
<template>
  <div class="q-pa-md" style="justify-content: center; display: flex">
    <div class="shadow-2 rounded-borders container">
      <div class="q-pa-md row" style="height: 65vh">
        <div class="capa col-6">
          <q-card style="height: 100%">
            <q-img :src="book.img" height="100%" />
          </q-card>
        </div>
        <div class="q-pa-lg col-6">
          <div class="text-h6">{{ book.title }}</div>
          <div class="text-subtitle2">{{ book.caption }}</div>
          <div class="q-mt-md">
            <span class="text-h6">{{ book.amount }}</span>
          </div>

          <div class="q-mt-md">
            <input value="0" type="number" class="q-ma-lg" />
          </div>
          <div class="q-mt-md">
            <q-btn
              class=""
              color="white"
              text-color="black"
              label="Adiconar ao Carinho"
            />
            <q-btn color="secondary" label="Comprar" />
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
