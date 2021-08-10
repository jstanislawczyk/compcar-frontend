<template>
  <section class="register">
    <div class="register__panel">
      <div class="register__header">
        <h2 class="register__header-text">Register</h2>
      </div>

      <div class="register__form-wrapper">
        <form class="register__form" @submit.prevent="registerUser" >
          <div class="register__input-wrapper">
            <p class="register__input-title">Email</p>
            <input class="register__input" type="email" v-model="registerData.email">
          </div>
          <div class="register__input-wrapper">
            <p class="register__input-title">Password</p>
            <input class="register__input" type="password" v-model="registerData.password">
          </div>
          <div class="register__input-wrapper">
            <p class="register__input-title">Password repeat</p>
            <input class="register__input" type="password" v-model="registerData.passwordRepeat">
          </div>

          <p class="register__error" v-for="(error, index) in errors" :key="index">
            {{ error }}
          </p>

          <button class="register__button">Register</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import validator from 'validator/es';

export default {
  name: 'Register',
  data() {
    return {
      registerData: {
        email: '',
        password: '',
        passwordRepeat: '',
      },
      errors: [],
    };
  },
  methods: {
    registerUser() {
      this.getValidationErrors();

      if (this.errors.length === 0) {
        console.log('Valid');
      }
    },
    getValidationErrors() {
      const errors = [];

      this.validateEmail(this.registerData.email);
      this.validatePassword(this.registerData.password);
      this.validatePasswordEquality(this.registerData.password, this.registerData.passwordRepeat);

      return errors;
    },
    validateEmail(email) {
      if (!validator.isEmail(email)) {
        this.errors.push('Should be an email');
      }
    },
    validatePassword(password) {
      const min = 3;
      const max = 80;
      const hasPasswordCorrectLength = validator.isLength(password, { min, max });

      if (!hasPasswordCorrectLength) {
        this.errors.push(`Password should have length between ${min} and ${max}`);
      }

      const hasNoLowerCase = !(/[a-z]/.test(password));

      if (hasNoLowerCase) {
        this.errors.push('Password requires at least one lowercase letter');
      }

      const hasNoUpperCase = !(/[A-Z]/.test(password));

      if (hasNoUpperCase) {
        this.errors.push('Password requires at least one uppercase letter');
      }
    },
    validatePasswordEquality(password, passwordRepeat) {
      if (password !== passwordRepeat) {
        this.errors.push('Password and password repeat should be equal');
      }
    },
  },
};
</script>

<style scoped lang="scss">
  @import "scss/mixins/form";

  .register {
    @include form;
  }
</style>
