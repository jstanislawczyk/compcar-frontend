<template>
  <section class="login">
    <div class="login__panel">
      <div class="login__header">
        <h2 class="login__header-text">Login</h2>
      </div>

      <div class="login__form-wrapper">
        <form class="login__form" @submit.prevent="loginUser">
          <div class="login__input-wrapper">
            <p class="login__input-title">Email</p>
            <input class="login__input" v-model="loginData.email">
          </div>
          <div class="login__input-wrapper">
            <p class="login__input-title">Password</p>
            <input class="login__input" type="password" v-model="loginData.password">
          </div>

          <p class="login__error" v-for="(error, index) in errors" :key="index">
            {{ error }}
          </p>

          <button class="login__button">Login</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import validator from 'validator/es';
import { parseGraphQlErrorMessage } from '@/common/errors';
import gql from 'graphql-tag';

export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      },
      errors: [],
    };
  },
  methods: {
    async loginUser() {
      this.getValidationErrors();

      if (this.errors.length === 0) {
        await this.login();
      }
    },
    getValidationErrors() {
      this.errors = [];

      this.validateEmail(this.loginData.email);
      this.validatePassword(this.loginData.password);
    },
    validateEmail(email) {
      if (validator.isEmpty(email)) {
        this.errors.push("Email shouldn't be empty");
      }
    },
    validatePassword(password) {
      if (validator.isEmpty(password)) {
        this.errors.push("Password shouldn't be empty");
      }
    },
    async login() {
      try {
        const loginQuery = this.getLoginQuery();
        const result = await this.$apollo.query(loginQuery);

        this.$store.commit('setAuthToken', result.data.login);
        await this.$router.push('/');
        this.$store.commit('toggleInfoPanel', {
          message: 'User logged in',
          type: 'success',
        });
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);

        this.errors.push(parsedError);
      }
    },
    getLoginQuery() {
      return {
        query: gql`
          query login($loginInput: LoginInput!) {
            login (
              loginInput: $loginInput,
            )
          }
        `,
        variables: {
          loginInput: {
            email: this.loginData.email,
            password: this.loginData.password,
          },
        },
      };
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/mixins/form';

  .login {
    @include form;
  }
</style>
