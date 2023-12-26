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
    component: () => import('@/layouts/DashboardView.vue'),
    children: [
      {
        path: 'attendance',
        name: 'attendance',
        component: () => import('@/layouts/components/AttendanceStudents.vue'),
      },
      {
        path: 'score-grading',
        name: 'score-grading',
        component: () => import('@/layouts/components/ScoreGrading.vue'),
      },
      {
        path: 'performance-report',
        name: 'performance-report',
        component: () => import('@/layouts/components/PerformanceReport.vue'),
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/layouts/components/SettingUser.vue'),
      },
    ]
  },
  {
    path: '/',

    component: () => import('@/layouts/default/DefaultView.vue'),

    children: [
      {
        path: '/class',
        name: 'class',
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
