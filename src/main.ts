import { createApp } from "vue"
import { createPinia } from "pinia"
import "./assets/styles/style.scss"
import App from "./App.vue"
import router from "./router"
import ApiService from "./core/services/ApiService"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

ApiService.init()

app.mount("#app")
