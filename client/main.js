import App from './Main.vue';
import Conferences from './components/Conferences.vue';
import Call from './components/Call.vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/calls', component: Conferences },
        { path: '/calls/:id', component: Call },
    ]
})

const app = createApp(App);

app.use(router).mount('#app');