<script lang="ts" setup>
import { onMounted } from "vue";
import { usePurchaseStore } from "@/stores/purchase";

const purchaseStore = usePurchaseStore();

onMounted(async () => {
  await purchaseStore.getPurchaseById(2).catch((error) => {
    alert(error);
  });
});
</script>
<template>
  <div class="q-pa-md" style="justify-content: center; display: flex">
    <div class="shadow-2 rounded-borders container">
      <div class="q-pa-md">
        <q-card-section>
          {{ purchaseStore.shoppingCart }}
          <div class="text-h6">Carrinho de compras</div>
          <div class="text-subtitle2">Aqui fica os itens</div>
        </q-card-section>

        <q-markup-table>
          <thead>
            <tr class="shadow-2 rounded-borders">
              <th class="text-left">Capa</th>
              <th class="text-center">Titulo</th>
              <th class="text-center">Avaliação</th>
              <th class="text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr class="shadow-2 rounded-borders" style="height: 120px">
              <td class="text-left">
                <q-card style="height: 100%">
                  <q-img
                    src="src/assets/imgs/books/O-Nome-do-Vento.jpg"
                    height="100%"
                  />
                </q-card>
              </td>
              <td class="text-center"><b>Our Changing Planet</b></td>
              <td class="text-center">
                <q-rating
                  v-model="text"
                  max="5"
                  size="1.5em"
                  color="yellow"
                  icon="star_border"
                  icon-selected="star"
                  icon-half="star_half"
                  readonly
                  no-dimming
                />
              </td>
              <td class="text-right">24</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-card {
  width: 100%;
  max-width: 500px;
}

.container {
  background-color: rgb(255, 255, 255);
  width: 60%;
}
</style>
