<template>
  <div id="window">
    <button @click="close()" class="btn"><font-awesome-icon :icon="['fas', 'rectangle-xmark']" /></button>
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
  props:{
    backUrl:""
  },
  methods:{
    close(){
      console.log(this.backUrl)
      this.$router.push(this.backUrl)
    }
  }
};
</script>

<style scoped>
*{
  color: wheat;
}
#window{
    width: 80%;
    height: 80vh;
    z-index: 998;
    position: fixed;
    top: 15%;
    left: 10%;
    background: #610C9F;
    box-shadow: 0 .25rem .3rem rgba(0, 0, 0, 0.7);
    padding: 2rem;
    border-radius: 1.5rem;
}
header,section{
    width: 100%;
}
section{
    height: 80%;
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 1rem;
}
header{
    height: 20%;
    font-family: 'Playfair Display';
    font-size: 2.5rem;
    padding: 1rem;
    text-align: center;
}
.btn{
  position: absolute;
  padding: 1rem;
  right: 3%;
  top: 5%;
}
</style>
