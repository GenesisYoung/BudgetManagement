<template>
  <div id="window">
    <button @click="close()" class="btn">
      <font-awesome-icon :icon="['fas', 'rectangle-xmark']" class="close" />
    </button>
    <header>
      <slot name="title">default title</slot>
    </header>
    <section>
      <slot name="content">default content</slot>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    backUrl: "",
  },
  methods: {
    close() {
      console.log(this.backUrl);
      this.$router.push(this.backUrl);
    },
  },
};
</script>

<style scoped>
* {
  color: wheat;
  font-size: 0.75rem;
}
#window {
  width: 80%;
  height: 80vh;
  z-index: 998;
  position: fixed;
  top: 15%;
  left: 10%;
  background: #610c9f;
  box-shadow: 0 0.25rem 0.3rem rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 1.5rem;
  overflow-y: auto;
}
header,
section {
  width: 100%;
}
section {
  height: 80%;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 1rem;
}
header {
  height: 20%;
  font-family: "Playfair Display";
  font-size: 2rem;
  padding: 1rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.btn {
  position: absolute;
  padding: 1rem;
  right: 3%;
  top: 5%;
}
.close {
  font-size: 1.5rem;
}
</style>
