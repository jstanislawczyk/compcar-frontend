<template>
  <section class="register-success">
    <h2 class="register-success__header">Account has been registered</h2>

    <p>Registration confirmation has been sent to your email</p>
  </section>
</template>

<style scoped lang="scss">
  @import "scss/mixins/pages";

  .register-success {
    @include information-page;
  }
</style>
