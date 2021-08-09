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

          <button class="register__button">Register</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      registerData: {
        email: '',
        password: '',
        passwordRepeat: '',
      },
    };
  },
  methods: {
    registerUser() {
      console.log(this.registerData.email);
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
