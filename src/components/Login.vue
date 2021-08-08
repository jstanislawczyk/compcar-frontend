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
  @import "scss/variables/colors";
  @import "scss/variables/gradients";
  @import "scss/variables/devices";

  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: $violet-purple-gradient;

    &__panel {
      width: 95%;
      max-width: 600px;
      border-radius: 4px;
      overflow: hidden
    }

    &__header {
      background: $black;
    }

    &__header-text {
      margin: 0;
      padding: 10px 0;
      font-size: 20px;
      font-weight: normal;
      color: $white;
    }

    &__form-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      background: $white;
    }

    &__form {
      width: 90%;
    }

    &__input-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: left;
      padding: 20px 0 0;

      @media (min-width: $tablet)  {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    &__input-title {
      flex-basis: 30%;
      margin: 0 0 5px;
      text-align: left;
      font-size: 14px;

      @media (min-width: $tablet)  {
        margin: 0;
        line-height: 32px;
      }
    }

    &__input {
      height: 30px;
      width: 100%;
      border: none;
      border-radius: 3px;
      font-size: 15px;
      background: $light-grey;
      color: $grey;
    }

    &__button {
      width: 100px;
      height: 35px;
      margin: 40px 0 20px;
      background: $light-red;
      border: none;
      border-radius: 3px;
      color: $white;
    }
  }
</style>
