import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ButtonBlack from "./components/util/ButtonBlack.vue";
import Card from "./components/util/Card";
import "./assets/tailwind.css";

const app = createApp(App);
app.component("button-black", ButtonBlack);
app.component("card", Card);
app.use(router).mount("#app");
