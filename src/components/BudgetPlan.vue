<template>
  <div class="plan-container">
    <div class="plan-item" :id="id">
      <div
        :class="{ 'plan-info': true, 'info-size': isEdit }"
        @click="toggleEdit()"
      >
      <header>{{ planTitle }}</header>
      <section>
        <p class="amount-bar">
            <span>target total:{{targetAmount}}</span>
            <span>current amount:{{ currentAmount }}</span>
        </p>
        <p class="description">
            {{ planDescription }}
        </p>
      </section>
      <footer>
        <p>begin date:{{ startDateShow }}</p>
      </footer>
      </div>
      <div :class="{'edit-btns':true,'btn-size': isEdit}">
        <div @click="directEdit()" class="edit"><p>edit</p></div>
        <div @click="operateDelete()" class="remove"><p>remove</p></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject:['dataFetched'],
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    toggleEdit() {
      this.isEdit = !this.isEdit;
      console.log(this.isEdit);
    },
    directEdit(){
      const id=this.id
      const currentPath=this.$route.path
      this.isEdit=false
      this.$router.push(`${currentPath}/plan/${id}`)
    },
    operateDelete(){
      this.$emit("deletePlan",this.id)
    }
  },
  computed: {
    targetAmount() {
      return `${this.target / 1000}k`;
    },
    planTitle() {
      return this.name;
    },
    currentAmount() {
      return `${this.current / 1000}k`;
    },
    planDescription() {
      return this.description;
    },
    startDateShow() {
      const startDate = new Date(this.beginDate);
      return `${
        startDate.getMonth() + 1
      }/${startDate.getDate()}/${startDate.getFullYear()}`;
    },
  },
  props: {
    id: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    target: {
      required: true,
      type: Number,
    },
    current: {
      required: true,
      type: Number,
    },
    description: {
      required: false,
      type: String,
      default: "",
    },
    beginDate: {
      required: true,
      type: String,
    },
  },
};
</script>

<style scoped>
/* animation start */
.plan-item{
    width: 100%;
    height: 320px;
    display: flex;
    justify-content: center;
    background-color: #a367b1;
    color: white;
    overflow: hidden;
    /* padding: 1rem; */
    border-radius: 1rem;
}
.plan-info{
    width: 100%;
    transition: 0.5s width ease-in-out;
}
.edit-btns{
    width: 0%;
    transition: 0.5s width ease-in-out;
    justify-content: center;
    display: flex;
    overflow: hidden;
}
.info-size{
    width: 60%;
}
.btn-size{
    width: 40%;
    /* display: flex; */
}
.edit,.remove{
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem;
}
.edit{
    background-color:#FFA38F ;
}
.remove{
    background-color: #E90074;
}
/* animation end */

.plan-container{
    margin-bottom: 1rem;
}

header{
    font-family: 'Playfair Display';
    font-size: 2.25rem;
    height: 20%;
}
footer{
    height: 20%;
    padding-top: 1rem;
}
footer p{
    margin-right: 5%;
    text-align: right;
}
section{
    height: 60%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.amount-bar{
    display: flex;
    justify-content: space-around;
    height: 15%;
    width: 100%;
}
.description{
    height: 80%;
    text-align: left;
    width: 80%;
    overflow: auto;
    text-indent: 2em;
}
@media (max-width: 760px){
    *{
    font-size: .75rem!important;
  }
}
</style>
