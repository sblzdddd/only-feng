import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router/router";
import VueMasonry from 'vue-next-masonry'

const app = createApp(App);

app.use(router);
app.use(VueMasonry);
app.mount('#app')
