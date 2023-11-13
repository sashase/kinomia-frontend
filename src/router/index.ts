import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../components/Layout.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/movies",
        name: "Movies",
        component: () => import("../views/Movies.vue"),
      },
      {
        path: "/theaters",
        name: "Theaters",
        component: () => import("../views/Theaters.vue"),
      },
      {
        path: "/digest/:movieId",
        name: "Digest",
        component: () => import("../views/Digest.vue"),
      },
      {
        path: "/showtimes/:movieId",
        name: "Showtimes",
        component: () => import("../views/Showtimes.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
