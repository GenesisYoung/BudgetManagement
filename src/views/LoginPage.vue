<template>
  <div class="container">
    <form action="#" @submit.prevent="login">
      <div class="row">
        <label for="email" class="form-label col-4">email</label>
        <div class="col-8">
          <input
            type="text"
            id="email"
            v-model="email"
            :class="{ 'form-control': true, error: emailError }"
            ref="email"
          />
        </div>
      </div>
      <div class="row">
        <label for="password" class="form-label col-4">password</label>
        <div class="col-8 password-container">
          <input
            type="password"
            id="password"
            v-model="password"
            :class="{ 'form-control': true, error: passwordError }"
            ref="password"
          />
        </div>
        <span id="prompt">{{ errorMessage }}</span>
      </div>
      <div class="login">
        <button class="btn btn-primary login-btn" type="submit">Login</button>
      </div>
      <div class="register">
        <button class="btn register-btn" @click="register">
          Not register yet?
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      emailError: false,
      passwordError: false,
      showMessage: false,
    };
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    login() {
      const email = this.email.trim();
      const password = this.password.trim();

      if (email === "") {
        this.emailError = true;
      } else {
        this.emailError = false;
      }

      if (password === "") {
        this.passwordError = true;
      } else {
        this.passwordError = false;
      }

      if (this.emailError || this.passwordError) {
        return;
      }

      const request = {
        email: this.email,
        password: this.password,
      };

      this.axios
        .post("http://localhost:8080/account/login", request, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          debugger;
          console.log(response.data);
          if (response.data.data.loginStatus) {
            debugger;
            this.$setCookie("loginStatus", response.data.data.loginStatus, 30);
            this.$setCookie("username", response.data.data.username, 30);
            this.$setCookie("userId", response.data.data.userId, 30);
            debugger;
            this.errorMessage = "";
            this.$router.push("/dashboard");
          } else {
            this.errorMessage = response.message;
          }
        })
        .catch((error) => {
          console.error("There was an error making the request:", error);
        });
    },
  },
};
</script>

<style scoped>
.password-container {
  position: relative;
}
#prompt {
  color: #eb3678 !important;
  font-size: 0.75rem;
  right: 1rem;
  position: absolute;
  text-transform: none;
}
input {
  text-transform: none;
}
.error {
  border-color: #eb3678;
}
.login {
  text-align: center;
}
.register-btn {
  font-size: 0.75rem;
}
.register-btn:active {
  color: blue;
  /* border: 0px; */
}
.register {
  text-align: right;
}
label {
  color: #180161;
}
input {
  text-align: left;
}
label {
  text-align: right !important;
}
.row {
  margin: 1.25rem 0;
}
form {
  width: 75%;
  margin-top: 15%;
}
.container {
  display: flex;
  height: 85vh;
  width: 100%;
  justify-content: center;
  /* align-items: center; */
}
@media (max-width: 760px) {
  form {
    width: 90% !important;
    margin-top: 35%;
  }
  * {
    font-size: 1rem;
  }
}
</style>
