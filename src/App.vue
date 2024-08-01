<script>
import { RouterView } from "vue-router";
import TopBar from "./components/TopBar.vue";
import ThePrompt from "@/components/ThePrompt.vue";
export default {
  async beforeMount() {
    this.loadUserSettings();
  },
  components: {
    TopBar,
    ThePrompt,
  },
  computed: {
    promptMsg() {
      return this.$store.state.promptMsg;
    },
    promptStatus() {
      return this.$store.state.promptStatus;
    },
    promptBackground() {
      return this.$store.state.promptBackground;
    },
  },
  methods: {
    acceptCookie() {
      this.$setCookie("cookiesAccepted", "true", 3650);
      document.getElementById("cookieConsent").style.display = "none";
    },
    async loadUserSettings() {
      const id = this.$getCookie("userId");
      this.axios
        .get(`http://${this.$HOST}/setting/findSettings?id=` + id)
        .then((response) => {
          if (response.data.data) {
            const data = response.data.data;
            console.log("auto allocation:");
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
    },
  },
};
</script>

<template>
  <TopBar></TopBar>
  <section id="container">
    <RouterView></RouterView>
  </section>
  <transition name="prompt">
    <the-prompt
      v-if="promptStatus"
      :message="promptMsg"
      :background="promptBackground"
    ></the-prompt>
  </transition>
  <div id="cookieConsent">
    This website uses cookies to ensure you get the best experience on our
    website.
    <button @click="acceptCookie()">Accept</button>
  </div>
</template>

<style scoped>
#cookieConsent {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #333;
  color: #fff;
  padding: 15px;
  text-align: center;
  display: none;
  z-index: 1000;
}
#cookieConsent button {
  background: #f1d600;
  color: #333;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
.prompt-enter-active,
.prompt-leave-active {
  transition: opacity 0.75s ease;
  /* height: auto; */
}

.prompt-enter-from,
.prompt-leave-to {
  opacity: 0;
  /* height: 0px; */
}
#container {
  overflow: auto;
}
</style>
