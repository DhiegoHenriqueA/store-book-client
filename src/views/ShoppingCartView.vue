<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { usePurchaseStore } from "@/stores/purchase";
import { useRouter } from "vue-router";

const router = useRouter();
const purchaseStore = usePurchaseStore();
let user = JSON.parse(localStorage.getItem("auth/user") as string)
let books: any
let total = 0
let valorLivro: any
let qtdLivro: any
let totalString = ref('')

onMounted(async () => {
  books = await purchaseStore.getShoppingCart(user.id)
  purchaseStore.shoppingCart.purchasesItems.forEach(books => {
    valorLivro = parseInt(books.book.amount.replace('R$', '').replace(',', '.'))
    qtdLivro = books.quantity
    total += valorLivro * qtdLivro
  });
  totalString.value = total.toString().replace('.', ',')
});

const finishedShoppingCartPurchase = () => {
  purchaseStore
    .finishedShoppingCartPurchase(purchaseStore.shoppingCart.id)
    .then((data) => {
      router.push({
        name: "purchaseFinished",
        params: { id: purchaseStore.shoppingCart.id },
      });
    })
    .catch((error) => {
      alert(error);
    });
};
</script>
<template>
  <div class="q-pa-md" style="justify-content: center; display: flex">
    <div class="shadow-2 rounded-borders container">
      <div class="q-pa-md">
        <q-card-section>
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
            <tr v-for="item in purchaseStore.shoppingCart.purchasesItems" class="shadow-2 rounded-borders"
              style="height: 120px">
              <td class="text-left">
                <q-card style="height: 100%">
                  <q-img src="src/assets/imgs/books/O-Nome-do-Vento.jpg" height="100%" />
                </q-card>
              </td>
              <td class="text-center"><b>{{ item.book.title }}</b></td>
              <td class="text-center">
                <q-rating v-model="item.book.rating" max="5" size="1.5em" color="yellow" icon="star_border"
                  icon-selected="star" icon-half="star_half" readonly no-dimming />
              </td>
              <td class="text-right">{{ item.book.amount }}</td>
            </tr>
          </tbody>
        </q-markup-table>
        <div class="row total q-mt-md">
          <div class="col-6 row total">
            <div class="col-6 text-h5" style="justify-content: center;">Total: </div>
            <div class="text-h5">R$ {{ totalString }}</div>
          </div>
        </div>
        <div class="q-mt-md">
          <q-btn  @click="finishedShoppingCartPurchase" class="full-width bg-teal-6" style="color: white" label="Finalizar compra" />
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.total {
  justify-content: flex-end;
}

.my-card {
  width: 100%;
  max-width: 500px;
}

.container {
  background-color: rgb(255, 255, 255);
  width: 60%;
}
</style>
