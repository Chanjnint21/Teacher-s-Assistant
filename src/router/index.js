// Composables
import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'

const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Auth/LoginView.vue'),
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/Auth/SignUp.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (Home-[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/App/DashboardView.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/default/DefaultView.vue'),
    children: [
      {
        path: '/class',
        name: 'class',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/App/ClassView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
