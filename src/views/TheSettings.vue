<template>
  <div class="setting-page">
    <header>welcome,{{ username }}</header>
    <div class="account-setting">
      <button class="btn change">Change password</button>
      <button class="btn out" @click="logOut()">Log out</button>
    </div>
    <div class="setting-panel">
      <div class="currency row mt-2">
        <div class="col-4">
          <label for="currency" class="form-label">currency:</label>
        </div>
        <div class="col-8">
          <select
            name="currency"
            class="form-select"
            id="currency"
            ref="currency"
            v-model="currency"
            :prop="currency"
          >
            <option value="$">US Dollar</option>
            <option value="¥">CNY</option>
            <option value="£">Pound Sterling</option>
            <option value="€">Euro</option>
            <option value="₣">Franc</option>
          </select>
        </div>
      </div>
      <div class="budget-period row mt-2">
        <div class="col-4">
          <label for="currency" class="form-label">period start:</label>
        </div>
        <div class="col-8 row">
          <p class="text col-4 text-right">Every</p>
          <div class="col-8">
            <input type="text" class="form-control" v-model="period" />
          </div>
        </div>
        <div class="caption">
          The budget period will be like:MM/{{ period }}/yyyy-MM/{{
            period
          }}/yyyy
        </div>
        <div class="auto-allocation row">
          <div class="col-4">
            <label for="allocation">Auto alloaction</label>
          </div>
          <div class="col-8">
            <select class="form-select" v-model="autoAllocation">
              <option value="1">True</option>
              <option value="0">False</option>
            </select>
          </div>
        </div>
        <div class="caption" v-if="isAuto">
          The budget residual from the last period will automatically be
          allocated to each active budget plan according to the allocation rule
          on every {{ day }} day of the month.
        </div>
        <div class="allocation-rule row" v-if="isAuto">
          <div class="col-4">
            <label for="allocation">Alloaction rule</label>
          </div>
          <div class="col-8">
            <select class="form-select" v-model="allocationRule">
              <option value="1">Average</option>
              <option value="2">According to the weight</option>
            </select>
          </div>
        </div>
        <div class="caption" v-if="evenMode && isAuto">
          All plans will be allocated evenly
        </div>
        <div class="weight-level row" v-if="weightMode && isAuto">
          <div class="col-12">
            <label for="allocation" class="level">Weight level</label>
          </div>
          <div class="col-12 row">
            <div class="col-4">
              <label for="allocation">Level 1</label>
            </div>
            <div class="col-6">
              <input
                ref="alpha"
                type="range"
                class="form-range"
                v-model="alpha"
              />
            </div>
            <div class="col-2 persentage">{{ alpha }}%</div>
            <div class="col-4">
              <label for="allocation">Level 2</label>
            </div>
            <div class="col-6">
              <input
                ref="beta"
                type="range"
                class="form-range"
                v-model="beta"
              />
            </div>
            <div class="col-2 persentage">{{ beta }}%</div>
            <div class="col-4">
              <label for="allocation">Level 3</label>
            </div>
            <div class="col-6">
              <input
                ref="sigma"
                type="range"
                class="form-range"
                v-model="sigma"
              />
            </div>
            <div class="col-2 persentage">{{ sigma }}%</div>
          </div>
          <div class="caption" v-if="isAuto">
            The plan, with the same weight level, will be allocated with the
            corresponding percentage of the budget residual from the last
            period, distributed evenly.
          </div>
        </div>
        <div class="manual-allocate" v-if="!isAuto">
          <button class="btn btn-primary">Allocate residuals</button>
        </div>
        <div class="save-settings mt-2">
          <button class="btn save" @click="saveSettings()">
            Save settings
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async beforeMount() {
    debugger;
    await this.fetchSetting();
  },
  methods: {
    initializeLocalState() {
      debugger;
      this.period = this.$store.state.periodStart;
      this.currency = this.$store.state.currency;
      this.autoAllocation = this.$store.state.autoAllocation;
      this.allocationRule = this.$store.state.allocationRule;
      this.alpha = this.$store.state.levelAlpha;
      this.beta = this.$store.state.levelBeta;
      this.sigma = this.$store.state.levelSigma;
    },
    logOut() {
      this.$deleteCookie("loginStatus");
      this.$router.go({ name: "login" });
    },
    async fetchSetting() {
      const id = this.$getCookie("userId");
      this.axios
        .get(`http://${this.$HOST}/setting/findSettings?id=` + id)
        .then((response) => {
          debugger;
          if (response.data.data) {
            debugger;
            const data = response.data.data;
            console.log(data);
            this.$store.state.settingId = data.id;
            this.$store.state.periodStart = data.periodStart;
            this.$store.state.currency = data.currency;
            this.$store.state.autoAllocation = data.autoAllocation;
            this.$store.state.allocationRule = data.allocationRule;
            this.$store.state.levelAlpha = data.levelAlpha;
            this.$store.state.levelBeta = data.levelBeta;
            this.$store.state.levelSigma = data.levelSigma;
            this.$store.state.accountId = data.accountId;
          }
        })
        .then(() => {
          this.initializeLocalState();
        });
    },
    async saveSettings() {
      const request = {
        id: this.$store.state.settingId,
        currency: this.currency,
        periodStart: this.period,
        autoAllocation: this.autoAllocation,
        allocationRule: this.allocationRule,
        levelAlpha: this.alpha,
        levelBeta: this.beta,
        levelSigma: this.sigma,
        accountId: this.$store.state.accountId,
      };
      this.axios
        .post(`http://${this.$HOST}/setting/updateSettings`, request, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.data) {
            this.fetchSetting().then((response) => {
              this.$store.state.promptMsg = "updated!";
              this.$store.state.promptBackground = "#399918";
              this.$store.state.promptStatus = true;
            });
          } else {
            this.$store.state.promptMsg = "request fail,try it later!";
            this.$store.state.promptStatus = true;
          }
        });
    },
  },
  data() {
    return {
      period: this.$store.state.periodStart,
      autoAllocation: this.$store.state.autoAllocation,
      allocationRule: this.$store.state.allocationRule,
      alpha: this.$store.state.levelAlpha,
      beta: this.$store.state.levelBeta,
      sigma: this.$store.state.levelSigma,
      currency: this.$store.state.currency,
    };
  },
  // watch: {
  //   states(now, old) {
  //     debugger;
  //     this.period = this.$store.state.periodStart;
  //     this.autoAllocation = this.$store.state.autoAllocation;
  //     this.allocationRule = this.$store.state.allocationRule;
  //     this.alpha = this.$store.state.levelAlpha;
  //     this.beta = this.$store.state.levelBeta;
  //     this.sigma = this.$store.state.levelSigma;
  //     this.currency = this.$store.state.currency;
  //   },
  // },
  computed: {
    // stateUpdate() {
    //   return this.$store.state.settingUpdate;
    // },
    evenMode() {
      return this.allocationRule == 1;
    },
    weightMode() {
      return this.allocationRule == 2;
    },
    isAuto() {
      return this.autoAllocation == 1;
    },
    username() {
      return this.$getCookie("username");
    },
    day() {
      let day = this.period;
      if (day === 1) day += "st";
      else if (day === 2) day += "ed";
      else if (day === 3) day += "rd";
      else day += "th";
      return day;
    },
  },
};
</script>

<style scoped>
.manual-allocate {
  text-align: center;
  margin-top: 1rem;
  display: block;
}
.persentage {
  color: #8d493a;
  font-size: 0.75rem;
}
.save {
  color: #8d493a;
}
.level {
  display: block;
  text-align: center;
  margin-top: 1rem;
  font-size: 1rem;
}
.caption {
  margin-top: 0.25rem;
  display: block;
  text-transform: none;
  font-size: 0.65rem;
  text-align: right;
  color: #bc9f8b;
}
.text-right {
  text-align: right !important;
}
.text-left {
  text-align: left !important;
}
.text {
  text-transform: none;
  font-size: 0.85rem;
}
.form-control {
  height: 1.75rem;
  font-size: 0.85rem;
  text-transform: none;
}
#currency:active {
  box-shadow: none;
}
input {
  text-align: left;
}
label {
  font-size: 0.85rem;
  color: #8d493a;
  text-align: right;
  display: block;
}
#currency {
  font-size: 0.85rem;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
option {
  text-align: left;
  font-size: 0.85rem;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.form-select,
.form-control {
  outline: none;
  box-shadow: none;
  border-color: initial;
  border: 0;
}
.setting-page {
  width: 85%;
  height: 100vh;
  overflow: auto;
}
header {
  margin-top: 1rem;
  margin-left: 1rem;
  text-align: left;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: larger;
  color: #bc9f8b;
}
.account-setting {
  text-align: left;
  padding-left: 1rem;
}
.btn {
  margin: 0 0.25rem;
  font-size: 0.75rem;
  padding: 0.25rem 0.2rem;
}
.change {
  color: #ffaf00;
  border: 0;
}
.out {
  color: #b5cfb7;
  border: 0;
}
.change:active {
  border: 0px;
  color: white;
}
.out:active {
  border: 0px;
  color: white;
}
</style>
