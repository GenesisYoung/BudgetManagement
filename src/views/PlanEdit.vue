<template>
  <pop-window backUrl="/plans">
    <template #title>
      {{ title }}
    </template>
    <template #content>
      <form action="#" @submit.prevent="">
        <div class="mb-3 row">
          <label for="name" class="col-sm-3 col-form-label">Name:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="name" v-model="title" />
          </div>

          <label for="target" class="col-sm-3 col-form-label">target:</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              id="target"
              :value="plan.target"
            />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="description" class="col-sm-3 form-label"
            >description:</label
          >
          <div class="col-sm-9">
          <textarea
            class="form-control col-sm-4"
            id="description"
            rows="6"
            :value="plan.description"
          ></textarea>
        </div>
        </div>
        <div class="btn-container">
          <button class="btn btn-primary">submit</button>
        </div>
      </form>
    </template>
  </pop-window>
</template>

<script>
import PopWindow from "@/components/PopWindow.vue";

export default {
  components: {
    PopWindow,
  },
  data() {
    return {
      title: "",
      plan: {},
    };
  },
  async beforeMount() {
    const planId = this.$route.params.id;
    const plans = this.$store.state.plans;
    const plan = plans.find((item) => item.id === planId);

    if (plan) {
      this.title = plan.name;
      this.plan = plan;
    }
  },
};
</script>

<style scoped>
*{
  text-align: left;
}
textarea{
text-indent: 2em;
resize: none;
overflow: auto;
color: wheat;
}
input{
  color: wheat;
}
input:focus,textarea:focus{
  color: #B1AFFF;
}
.btn{
  text-transform: capitalize;
}
.btn-container{
  text-align: center;
}
</style>
