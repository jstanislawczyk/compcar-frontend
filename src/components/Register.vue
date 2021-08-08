<template>
  <section class="register">
    <div class="register__panel">
      <div class="register__header">
        <h2 class="register__header-text">Register</h2>
      </div>

      <div class="register__form-wrapper">
        <form class="register__form">
          <div class="register__input-wrapper">
            <p class="register__input-title">Email</p>
            <input class="register__input">
          </div>
          <div class="register__input-wrapper">
            <p class="register__input-title">Password</p>
            <input class="register__input" type="password">
          </div>
          <div class="register__input-wrapper">
            <p class="register__input-title">Password repeat</p>
            <input class="register__input" type="password">
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
};
</script>

<style scoped lang="scss">
  @import "scss/mixins/form";

  .register {
    @include form;
  }
</style>
