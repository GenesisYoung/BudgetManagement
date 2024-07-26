<template>
  <p class="prompt shadow">{{ message }}</p>
</template>

<script>
// import { onMounted } from 'vue'
export default {
  props: {
    message: {
      type: String,
      default: "default message",
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    destroy() {
      this.$store.state.promptStatus = false;
    },
  },
  mounted() {
    setTimeout(this.destroy, 1500);
  },
};
</script>

<style scoped>
.prompt {
  display: flex;
  width: 30%;
  min-height: 10vh;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 45%;
  left: 35%;
  padding: 1rem;
  z-index: 999999;
  background: #ff8080;
  border-radius: 1.5rem;
  color: wheat;
}
</style>
