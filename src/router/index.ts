import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: () => import("@/layouts/MainLayout2.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        //TODO - Adicionar id nessa rota
        {
          path: "comprar/:id",
          name: "purchase",
          component: () => import("@/views/PurchaseView.vue"),
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
