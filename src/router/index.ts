import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import MainView from '../views/MainView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/'
  },
  {
    path: '/tabs/',
    component: MainView,
    children: [
      {
        path: '',
        redirect: '/tabs/items'
      },
      {
        path: 'items/',
        component: () => import('@/views/items/ItemList.vue'),
      },
      {
        path: "items/:id",
        component: () => import('@/views/items/ItemView.vue')
      },
      {
        path: 'collections',
        component: () => import('@/views/collections/CollectionList.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
