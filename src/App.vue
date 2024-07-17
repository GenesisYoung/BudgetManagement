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
</template>

<style scoped>
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
