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
  @import "scss/variables/colors";
  @import "scss/variables/gradients";

  .register {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: $violet-purple-gradient;

    &__panel {
      width: 95%;
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
    }

    &__input-title {
      margin: 0 0 5px;
      text-align: left;
      font-size: 14px;
    }

    &__input {
      height: 30px;
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
