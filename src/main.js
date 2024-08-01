import "./assets/base.css";
// Add the necessary CSS
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./data/vuex";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faGauge,
  faList,
  faGear,
  faBars,
  faWallet,
  faCreditCard,
  faSackDollar,
  faHouse,
  faDollarSign,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
/* import bootstrap */
import { createBootstrap } from "bootstrap-vue-next";

// inport axios
import axios, { Axios } from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

app.use(VueAxios, axios);

app.config.globalProperties.$HOST = "localhost:8080";

// define global methods start
app.config.globalProperties.$setCookie = function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

app.config.globalProperties.$deleteCookie = function (name) {
  document.cookie = name + "=; Max-Age=-99999999;";
};

app.config.globalProperties.$getCookie = function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

app.config.globalProperties.$loadSettings = async () => {
  const id = this.$getCookie("userId");
  debugger;
  this.axios
    .get(`http://${this.$HOST}/setting/findSettings?id=` + id)
    .then((response) => {
      if (response.data.data) {
        const data = response.data.data;
        this.$store.state.settingId = data.id;
        this.$store.state.periodStart = data.periodStart;
        this.$store.state.currency = data.currency;
        this.$store.state.autoAllocation = data.autoAllocation;
        this.$store.state.allocationRule = data.allocationRule;
        this.$store.state.levelAlpha = data.levelAlpha;
        this.$store.state.levelBeta = data.levelBeta;
        this.$store.state.levelSigma = data.levelSigma;
        this.$store.state.accountId = data.accountId;
      }
    });
};
// define global methods end

app.use(router);
app.use(store);
app.use(createBootstrap()); // Important bootstrap

// fontAwesome config
library.add(faGauge);
library.add(faList);
library.add(faGear);
library.add(faBars);
library.add(faWallet);
library.add(faCreditCard);
library.add(faSackDollar);
library.add(faHouse);
library.add(faDollarSign);
library.add(faRectangleXmark);

app.config.productionTip = false;
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
