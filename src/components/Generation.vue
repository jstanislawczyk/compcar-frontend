<template>
  <section class="generation">
    <h2 class="generation__name">B6</h2>
    <p>Test</p>
  </section>
</template>

<script>
import { formatPrice } from '@/common/currency';

export default {
  name: 'Generation',
  data() {
    return {
      generation: {},
    };
  },
  async created() {
    const generationId = this.$route.params.id;
    console.log(generationId);
  },
  methods: {
    formatPrice,
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/devices';

  .generation {
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
