import { createRouter, createWebHistory } from 'vue-router';

import TheDashboard from '../views/TheDashboard.vue';
import BudgetPlans from '../views/BudgetPlans.vue';
import TheSettings from '../views/TheSettings.vue';
import NotFound from '../components/NotFound.vue'
import MoneyPage from '../views/MoneyPage.vue'
import PlanEdit from '@/views/PlanEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:"/dashboard"
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: TheDashboard
    },
    {
      path: '/plans',
      name: 'plans',
      component: BudgetPlans,
      children:[
        {
          path:'plan/:id',
          name:'plan',
          component:PlanEdit 
        }
      ]
    },
    {
      path: '/money',
      name: 'money',
      component:MoneyPage
    },
    {
      path: '/settings',
      name: 'settings',
      component: TheSettings
    },
    {
      path:"/:notFound(.*)",
      name:'notfound',
      component:NotFound
    },
  ],
  linkActiveClass:"active",
})

export default router
