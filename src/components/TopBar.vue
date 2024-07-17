<template>
  <header id="topbar">
    <h2>{{ currentScreen }}</h2>
    <button v-show="showBar" @click="toggleMenu" class="bar">
      <font-awesome-icon :icon="['fas', 'fa-bars']" />
    </button>
    <ul v-show="showMenu">
      <li>
        <RouterLink to="/dashboard">
          <font-awesome-icon :icon="['fas', 'fa-gauge']" /><span
            >dashboard</span
          ></RouterLink
        >
      </li>
      <li>
        <RouterLink to="/plans"
          ><font-awesome-icon :icon="['fas', 'fa-list']" /><span
            >budget plans</span
          ></RouterLink
        >
      </li>
      <li>
        <RouterLink to="/money"
          ><font-awesome-icon :icon="['fas', 'fa-dollar-sign']" /><span
            >income & expense</span
          ></RouterLink
        >
      </li>
      <li>
        <RouterLink to="/settings"
          ><font-awesome-icon :icon="['fas', 'fa-gear']" /><span
            >settings</span
          ></RouterLink
        >
      </li>
    </ul>
  </header>
</template>

<script>
import { watch } from "vue";
export default {
  mounted() {
    let innerWidth = window.innerWidth;
    if (innerWidth <= 760) {
      this.showMenu = false;
      this.showBar = true;
    }
    window.addEventListener("resize", () => {
      let windowWidth = window.innerWidth;
      console.log(windowWidth);
      if (windowWidth <= 760) {
        this.showMenu = false;
        this.showBar = true;
      } else {
        this.showMenu = true;
        this.showBar = false;
      }
    });
  },
  data() {
    return {
      currentScreen: "dashboard",
      showMenu: true,
      showBar: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
  watch: {
    $route(to, from) {
      const path = to.fullPath.split("/");
      if (path[1] === "dashboard") this.currentScreen = "dashboard";
      else if (path[1] === "plans") this.currentScreen = "budget plans";
      else if (path[1] === "money")this.currentScreen = "income & expense";
      else this.currentScreen = "settings";
    },
  },
};
</script>

<style scoped>
#topbar {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: left;
  align-items: center;
  background: #846298;
  position: relative;
}
ul {
  list-style: none;
  border-radius: 0.25rem;
  position: absolute;
  right: 5%;
}
li {
  float: left;
  padding: 1rem;
  margin-top: 1rem;
}
a {
  text-decoration: none;
  color: #ffd1e3;
  padding: 0.5rem;
  transition: 0.3s all ease-in-out;
  text-align: center;
  display: flex;
  align-items: center;
}
a span {
  display: inline-block;
  margin-left: 0.2rem;
  font-size: 0.75rem !important;
  font-family: "San Francisco";
  margin-left: 0.35rem;
}
h2 {
  font-family: "San Francisco";
  padding-left: 1rem;
  margin-top: 0.4rem;
  color: white;
}
.bar {
  color: white;
  border: 0px;
  background: transparent;
  position: absolute;
  right: 3%;
  width: auto;
}
@media (max-width: 760px) {
  li {
    float: none;
    padding: 0rem !important;
  }
  ul {
    top: 95%;
    right: 0;
    background: #7c508f;
    box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.7);
    z-index: 999;
  }
}
</style>
