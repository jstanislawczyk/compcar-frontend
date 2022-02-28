<template>
  <section class="model">
    <h2 class="model__name">Audi A4</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus orci orci, ut blandit mi aliquam eget. Suspendisse faucibus mi sed ligula finibus, et imperdiet tellus dignissim.
      In hac habitasse platea dictumst. Donec volutpat efficitur ipsum faucibus consectetur. Nam a felis lectus. In in efficitur lorem. Aenean et leo justo. Cras sed laoreet tellus.
      Sed et eros in magna luctus pulvinar. Suspendisse nunc metus, tincidunt non libero pharetra, semper placerat diam. Pellentesque tristique magna sed mi consequat luctus. Nullam at tortor leo.
    </p>

    <div class="generations">
      <h3 class="generations__status">Available</h3>
      <div class="generations__tiles">
        <div class="generation">

        </div>
      </div>

      <h3 class="generations__status">Withdrawn</h3>
      <div class="generations__tiles">
        <div class="generation">

        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Model',
  data() {
  },
  async created() {
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/colors';
  @import 'scss/variables/devices';

  .model {
    min-height: calc(100vh - 50px);
    padding: 30px 20% 20px;
    text-align: left;

    &__name {
      font-size: 50px;
    }
  }

  .generations {
    margin-top: 50px;

    &__status {
      margin: 40px 0 20px;
    }
  }

  .generation {
    width: 200px;
    height: 200px;
    background: red;
  }
</style>
