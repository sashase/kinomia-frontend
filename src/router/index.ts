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
        path: "/digest/:movieId",
        name: "Digest",
        component: () => import("../views/Digest.vue"),
      },
      {
        path: "/cinemas",
        name: "Cinemas",
        component: () => import("../views/Cinemas.vue"),
      },
      {
        path: "/cinema/:cinemaId",
        name: "Cinema",
        component: () => import("../views/Cinema.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  })
})

export default router
