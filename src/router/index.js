import { createRouter, createWebHistory } from "vue-router";

import TheDashboard from "../views/TheDashboard.vue";
import BudgetPlans from "../views/BudgetPlans.vue";
import TheSettings from "../views/TheSettings.vue";
import NotFound from "../components/NotFound.vue";
import MoneyPage from "../views/MoneyPage.vue";
import PlanEdit from "@/views/PlanEdit.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
      meta: {
        requiredAuth: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: {
        requiredAuth: false,
      },
    },
    {
      path: "/",
      name: "home",
      redirect: "/dashboard",
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: TheDashboard,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/plans",
      name: "plans",
      component: BudgetPlans,
      meta: {
        requiredAuth: true,
      },
      children: [
        {
          path: "plan/:id",
          name: "plan",
          component: PlanEdit,
          meta: {
            requiredAuth: true,
          },
        },
      ],
    },
    {
      path: "/money",
      name: "money",
      component: MoneyPage,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/settings",
      name: "settings",
      component: TheSettings,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/:notFound(.*)",
      name: "notfound",
      component: NotFound,
      meta: {
        requiredAuth: true,
      },
    },
  ],
  linkActiveClass: "active",
});
router.beforeEach((to, from) => {
  if (to.meta.requiredAuth && !getCookie("loginStatus")) {
    return { name: "login" };
  }
});

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export default router;
