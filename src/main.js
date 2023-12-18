import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import ru from "vee-validate/dist/locale/ru.json";
import * as rules from "vee-validate/dist/rules";
import "@/assets/styles/main.scss";
import { createPinia } from "pinia";


Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize("ru", ru);

const pinia = createPinia();
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.config.productionTip = false;
Vue.use(pinia);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
