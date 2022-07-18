import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: () => import("@/layouts/MainLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "comprar/:id",
          name: "purchase",
          component: () => import("@/views/PurchaseView.vue"),
        },
        {
          path: "carrinho/:id",
          name: "shopping-cart",
          component: () => import("@/views/ShoppingCartView.vue"),
        },
        {
          path: "compraFinalizada/:id",
          name: "purchaseFinished",
          component: () => import("@/views/PurchaseFinishedView.vue"),
        },
        {
          path: "compraDetalhes/:id",
          name: "purchaseReview",
          component: () => import("@/views/PurchaseReviewView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",

      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/registration",
      name: "registration",

      component: () => import("@/views/RegistrationView.vue"),
    },
  ],
});

router.beforeEach;

export default router;
