<template>
  <section class="login">
    <div class="login__panel">
      <div class="login__header">
        <h2 class="login__header-text">Login</h2>
      </div>

      <div class="login__form-wrapper">
        <form class="login__form">
          <div class="login__input-wrapper">
            <p class="login__input-title">Email</p>
            <input class="login__input">
          </div>
          <div class="login__input-wrapper">
            <p class="login__input-title">Password</p>
            <input class="login__input" type="password">
          </div>

          <button class="login__button">Login</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style scoped lang="scss">
  @import 'scss/mixins/form';

  .login {
    @include form;
  }
</style>
