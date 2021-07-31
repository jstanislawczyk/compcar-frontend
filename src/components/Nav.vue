<template>
  <nav class="nav">
    <div class="nav__logo">Compcarly</div>
    <div class="nav__links">
      <div class="nav__link"></div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
};
</script>

<style scoped lang="scss">
  @import "scss/variables/gradients";

  .nav {
    height: 70px;
    background: $violet-purple-gradient;
  }
</style>
