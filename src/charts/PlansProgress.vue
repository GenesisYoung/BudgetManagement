<template>
  <div id="progress-form">
    <header>{{ name }}</header>
    <section class="progress-bar">
      <!-- <div class="persentage"></div> -->
      <div :id="barId" class="bar">
        <span>{{ progressShow }}</span>
      </div>
    </section>
    <footer>
      <div class="current-target">
        {{ persentageShow }}
      </div>
      <div class="date">
        <div class="begin-date">
          begin:
          {{ beginDateShow }}
        </div>
        <div class="complete-date">
          estimated:
          {{ expectedDateShow }}
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  mounted() {
    const barId = this.barId;
    const bar = document.getElementById(barId);
    bar.style.width = "80%";
    bar.style.borderRadius = "0.15rem";
    bar.style.height = "1rem";
    bar.style.backgroundColor = "#FFD1E3";
    const progressElement = document.createElement("div");
    progressElement.style.width = this.progress * 100 + "%";
    progressElement.style.borderRadius = "0.15rem";
    progressElement.style.height = "100%";
    progressElement.style.backgroundColor = "#3FA2F6";
    bar.append(progressElement);
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
      validator: (value) => {
        return value >= 0;
      },
    },
    current: {
      required: true,
      type: Number,
      validator: (value) => {
        return value >= 0;
      },
    },
    beginDate: {
      required: true,
      type: String,
    },
  },
  computed: {
    barId() {
      return "progress-bar-" + this.id;
    },
    progress() {
      if (this.current == 0) return 0;
      else return Number.parseFloat(this.current / this.target);
    },
    progressShow() {
      if (this.current == 0) return 0 * 100 + "%";
      else
        return (
          (Number.parseFloat(this.current / this.target) * 100).toFixed(0) + "%"
        );
    },
    expectedDateShow() {
      debugger;
      if (this.current === 0) {
        return "∞";
      }
      const millisecondsInDay = 24 * 60 * 60 * 1000;
      const beginDate = new Date(this.beginDate);
      const now = new Date();
      let passedTime = now.getTime() - beginDate.getTime();
      passedTime = passedTime / millisecondsInDay;
      const contributionPerDay = this.current / passedTime;
      const restDays = Number.parseInt(
        (this.target - this.current) / contributionPerDay
      );
      const currentDate = new Date();
      const targetDate = new Date(currentDate);

      targetDate.setDate(targetDate.getDate() + restDays);
      return `${
        targetDate.getMonth() + 1
      }/${targetDate.getDate()}/${targetDate.getFullYear()}`;
    },
    beginDateShow() {
      const beginDate = new Date(this.beginDate);
      return `${
        beginDate.getMonth() + 1
      }/${beginDate.getDate()}/${beginDate.getFullYear()}`;
    },
    persentageShow() {
      return `$${Number.parseInt(this.current)}/$${Number.parseInt(
        this.target
      )}`;
    },
  },
};
</script>

<style scoped>
* {
  color: #e0dbe1;
  font-family: "San Francisco";
  font-size: 1rem;
}
header {
  padding: 0.5rem;
  font-weight: bolder;
  color: white;
}
#progress-form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #a367b1;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.75);
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.progress-bar {
  height: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.date {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.persentage {
  padding: 0.5rem;
  font-size: 0.75rem;
  color: #fff7fc;
  border-radius: 50%;
  background: #846298;
  text-align: center;
}
footer {
  width: 100%;
}
.current-target {
  width: 100%;
  text-align: right;
}
.bar {
  position: relative !important;
}
.bar span {
  position: absolute;
  color: white;
  left: 40%;
  bottom: -25%;
}
</style>
