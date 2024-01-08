// Composables
import { createRouter, createWebHistory } from "vue-router";
// import VueRouter from 'vue-router'
import AuthLayout from "@/layouts/AuthLayout.vue";

const routes = [
  {
    path: "/",
    component: AuthLayout,
    redirect: "/login",
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/Auth/LoginView.vue"),
      },
      {
        path: "/signup",
        name: "signup",
        component: () => import("@/views/Auth/SignUp.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/App/DashboardView.vue"),
  },
  {
    path: "/class",
    name: "class",
    redirect: "class/attendance",
    component: () => import("@/views/App/Class/SidebarMenu.vue"),
    children: [
      {
        path: "attendance",
        name: "attendance",
        component: () =>
          import("@/views/App/Class/components/AttendanceStudents.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "score-grading",
        name: "score-grading",
        component: () =>
          import("@/views/App/Class/components/ScoreGrading.vue"),
      },
      {
        path: "performance-report",
        name: "performance-report",
        component: () =>
          import("@/views/App/Class/components/PerformanceReport.vue"),
      },
      {
        path: "setting",
        name: "setting",
        component: () => import("@/views/App/Class/components/SettingUser.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
