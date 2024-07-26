<script>
import { RouterView } from "vue-router";
import TopBar from "./components/TopBar.vue";
import ThePrompt from "@/components/ThePrompt.vue";
export default {
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
  },
  methods: {
    acceptCookie() {
      console.log("accept");
      this.$setCookie("cookiesAccepted", "true", 3650);
      document.getElementById("cookieConsent").style.display = "none";
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
    <the-prompt v-if="promptStatus" :message="promptMsg"></the-prompt>
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
</style>
