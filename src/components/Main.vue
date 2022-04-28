<template>
  <main class="main">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'Main',
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/devices';

  .main {
    height: calc(100% - 50px);

    @media (min-width: $tablet)  {
      height: calc(100% - 70px);
    }

    @media (min-width: $desktop-small)  {
      height: calc(100% - 50px);
    }
  }
</style>
