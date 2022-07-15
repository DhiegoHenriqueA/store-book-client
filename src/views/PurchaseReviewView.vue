<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import { usePurchaseStore } from "@/stores/purchase";

const purchaseStore = usePurchaseStore();

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await purchaseStore.getPurchaseById(route.params.id).catch((error) => {
    alert(error);
  });
});

const finishedPurchase = () => {
  purchaseStore
    .finishedPurchase(purchaseStore.currentPurchase.id)
    .then((data) => {
      router.push({
        name: "purchaseFinished",
        params: { id: purchaseStore.currentPurchase.id },
      });
    })
    .catch((error) => {
      alert(error);
    });
};
</script>
<template>
  <div class="q-pa-md" style="justify-content: center; display: flex">
    <div class="shadow-2 rounded-borders container q-pa-lg">
      <h5>Revise os dados da compra</h5>
      <div>{{ purchaseStore.currentPurchase }}</div>
      <q-btn @click="finishedPurchase">Finalizar Compra</q-btn>
    </div>
  </div>
</template>
<style scoped>
.container {
  background-color: rgb(255, 255, 255);
  width: 60%;
}
</style>
