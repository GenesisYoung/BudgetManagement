<template>
  <div class="container">
    <form action="#" id="register-account" @submit.prevent="">
      <div class="row">
        <label for="account" class="form-label col-4">username</label>
        <div class="col-8 name-container">
          <input
            type="text"
            id="account"
            class="form-control"
            v-model="username"
            placeholder="Your username"
          />
          <span id="name-prompt">{{ namePrompt }}</span>
        </div>
      </div>
      <div class="row">
        <label for="email" class="form-label col-4">email</label>
        <div class="col-8 email-container">
          <input
            type="email"
            v-model="email"
            placeholder="example@example.com"
            id="email"
            class="form-control"
            @blur="checkMail()"
          />
          <span id="exist-prompt">{{ emailPrompt }}</span>
        </div>
      </div>
      <div class="row">
        <label for="password" class="form-label col-4">password</label>
        <div class="col-8">
          <input
            type="password"
            v-model="password"
            id="password"
            class="form-control"
            @blur="checkPassword()"
          />
        </div>
      </div>
      <div class="row">
        <label for="confirm-password" class="form-label col-4"
          >confirm password</label
        >
        <div class="col-8 password-container">
          <input
            type="password"
            v-model="confirm"
            id="confirm-password"
            class="form-control"
            @blur="checkMatch()"
          />
          <span id="prompt">{{ promptMessage }}</span>
        </div>
      </div>
      <div class="login">
        <button class="btn btn-primary login-btn" @click="register()">
          Register
        </button>
      </div>
      <div class="register">
        <button class="btn register-btn" @click="login()">
          Already registered
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      confirm: "",
      email: "",
      passwordCheck: false,
      promptMessage: "",
      exists: false,
      invalidEmail: false,
      submit: false,
      namePrompt: "",
    };
  },
  computed: {
    emailPrompt() {
      if (!this.exists && this.invalidEmail) {
        return "Invalid email";
      }
      return !this.exists ? "" : "Email exists!";
    },
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    validateUsername() {
      // debugger;
      if (this.username.trim() != "") {
        this.namePrompt = "";
        return true;
      } else {
        this.namePrompt = "User name is required!";
        return false;
      }
    },
    register() {
      if (
        this.checkPassword() &
        this.emailValidate() &
        this.validateUsername() &
        this.checkMatch() &
        !this.exists
      ) {
        const request = {
          name: this.username,
          email: this.email,
          password: this.password,
        };

        this.axios
          .post(`http://${this.$HOST}/account/register`, request, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.data) {
              this.$router.push("/login");
            } else {
              console.log("Something went wrong, try it again later!");
            }
          })
          .catch((error) => {
            console.error("There was an error making the request:", error);
          });
      }
    },
    checkPassword() {
      // debugger;
      let confirmChecked = this.password.length < 8;
      if (confirmChecked) {
        this.promptMessage = "At least 8 characters!";
        return false;
      }
      return true;
    },
    checkMatch() {
      if (this.password != this.confirm) {
        this.promptMessage = "Password doesn't match!";
        return false;
      } else {
        return true;
      }
    },
    checkMail() {
      // debugger;
      if (!this.emailValidate()) return;
      this.axios
        .get(`http://${this.$HOST}/account/checkMail?email=` + this.email)
        .then((response) => {
          // debugger;
          console.log(response.data.data);
          if (response.data.data) {
            this.exists = false;
          } else {
            this.exists = true;
          }
        });
    },
    emailValidate() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(this.email);
      if (isValid) this.invalidEmail = false;
      else this.invalidEmail = true;
      return isValid;
    },
  },
};
</script>

<style scoped>
.wrong {
  border-color: #eb3678;
}
.password-container,
.email-container,
.name-container {
  position: relative;
}
#prompt,
#exist-prompt,
#name-prompt {
  color: #eb3678 !important;
  font-size: 0.75rem;
  right: 1rem;
  position: absolute;
  text-transform: none;
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
  text-transform: none;
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
  #prompt,
  #exist-prompt,
  #name-prompt {
    font-size: 0.45rem;
  }
}
</style>
