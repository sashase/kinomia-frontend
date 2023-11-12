import { createApp } from "vue"
import "./assets/styles/style.scss"
import App from "./App.vue"
import router from "./router"
import ApiService from "./core/services/ApiService"

const app = createApp(App)

app.use(router)

ApiService.init()

app.mount("#app")
