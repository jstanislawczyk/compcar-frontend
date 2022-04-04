<template>
  <section class="car">
    <h2 class="car__name">Test</h2>
    <p>Test desc</p>
  </section>
</template>

<script>
export default {
  name: 'Car',
  data() {
    return {
      car: {},
      model: {
        name: '',
      },
      brand: {
        name: '',
      },
      generation: {
        name: '',
      },
    };
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/devices';

  .car {
    min-height: calc(100vh - 50px);
    padding: 30px 5% 20px;
    text-align: left;

    @media (min-width: $desktop-small) {
      padding: 30px 10% 20px;
    }

    @media (min-width: $desktop-medium) {
      padding: 30px 15% 20px;
    }

    &__name {
      font-size: 50px;
    }
  }
</style>
