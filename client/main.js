import App from './Main.vue';
import Conferences from './components/Conferences/Conferences.vue';
import Call from './components/Call/Call.vue';
import MainPage from './components/MainPage/MainPage.vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: MainPage },
        { path: '/calls', component: Conferences },
        { path: '/calls/:id', component: Call, props: true },
    ]
})

const app = createApp(App);

app.use(router).mount('#app');