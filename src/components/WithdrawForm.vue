<template>
  <div class="withdraw-container">
    <button @click="$emit('closeWithdraw')" class="btn close"><font-awesome-icon :icon="['fas', 'rectangle-xmark']" /></button>
    <div class="header row">
      <div class="label col-6 text-center">
        <label for="total">Withdraw total:</label>
      </div>
      <div class="col-6">
        <input
          id="total"
          type="text"
          class="form-control disabled"
          name="total"
          :value="total"
          disabled
        />
      </div>
      <div class="btn-bar">
        <button class="btn withdraw">Withdraw</button>
      </div>
    </div>
    <h2>withdraw from:</h2>
    <form
      action="#"
      class="withdraw-form shadow"
      @submit.prevent="submitWithdraw()"
    >
      <div class="plan-bar row" v-for="plan in plans" :key="plan.id">
        <div class="plan-title col-6 col-sm-12">
          <header>{{ plan.name }}</header>
          <section>{{ plan.current + "/" + plan.target }}</section>
        </div>
        <div class="withdraw-amount col-6 row">
          <div class="label col-6 text-center">
            <label :for="plan.id">Withdraw amount:</label>
          </div>
          <div class="col-6 plan">
            <input
              :id="plan.id"
              type="text"
              class="form-control amount"
              :name="plan.id"
              :max="plan.current"
              value="0"
              @keydown="amoutEnter($event)"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      amoutMap: new Map(),
    };
  },
  async mounted() {
    const response = await fetch("/public/test/dashboard.json");
    const result = await response.json();
    this.$store.state.plans = result.plans;
    result.plans.forEach((plan) => {
      this.amoutMap.set(plan.id, 0);
    });
  },
  computed: {
    plans() {
      return this.$store.state.plans;
    },
  },
  methods: {
    submitWithdraw() {},
    amoutEnter(e) {
      if(e.key==='Enter'){
      const value = e.target.value;
      const id = e.target.id;
      const max = e.target.getAttribute("max");
      const map=this.amoutMap
      debugger
      if (!isNaN(value) && value >= 0 && value <= parseInt(max)) {
        map.set(id, parseInt(value))
        this.$store.state.plans.forEach(plan=>{
          if(plan.id===id)
            plan.current-=parseInt(value)
        })
      } else {
        map.set(id, 0);
        e.target.value = 0;
      }
      this.total=0
      for(let amout of map.values()){
        this.total+=parseInt(amout)
      }
      debugger
    }
    },
  },
};
</script>

<style scoped>
* {
  color: #ffa732;
}
input {
  text-align: left;
}
input:focus {
  color: wheat !important;
}
.withdraw-form {
  overflow: auto;
  width: 100%;
  height: 75%;
}
.header {
  width: 90%;
  height: 25% !important;
}
.withdraw {
  background: #c21292;
}
.disabled {
  background: #e5cff7 !important;
}
.plan-bar {
  margin: 1rem 0;
  background: #974ec3;
  border-radius: 1rem;
}
.withdraw-container {
  width: 60%;
  position: fixed;
  left: 20%;
  height: 80%;
  top: 10%;
  background: #504099;
  border-radius: 1.5rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: fixed;
}
.withdraw-amount {
  width: 100%;
}
.plan-bar {
  padding: 1rem;
}
.close{
  top: 1rem;
  left: 1rem;
}
@media (max-width: 760px) {
  * {
    font-size: 1rem;
  }
  .withdraw-container {
    width: 90% !important;
    left: 5%;
    top: 15%;
  }
  .withdraw-amount {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .plan {
    /* text-align: center; */
    width: 100%;
  }
  .plan-title {
    width: 100%;
  }
}
</style>
