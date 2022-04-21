<template>
  <section class="engine">
    <h2 class="engine__name">{{ engine.name }}</h2>
  </section>
</template>

<script>
import { parseGraphQlErrorMessage } from '@/common/errors';
import gql from 'graphql-tag';

export default {
  name: 'Engine',
  data() {
    return {
      engine: {
        id: 0,
        name: 'unknown',
        fuelType: 'unknown',
        horsePower: 0,
        acceleration: 0,
        averageFuelConsumption: 0,
        fuelCapacity: 0,
        inventedYear: 'unknown',
      },
    };
  },
  async created() {
    const engineId = this.$route.params.id;
    await this.setupEngineData(engineId);
  },
  methods: {
    async setupEngineData(id) {
      try {
        const getEngineByIdQuery = this.getEngineByIdQuery(id);
        const engineResponse = await this.$apollo.query(getEngineByIdQuery);

        const engine = engineResponse.data.getEngineById;
        this.engine = {
          id: engine.id,
          name: engine.name,
          fuelType: engine.fuelType,
          horsePower: engine.horsePower,
          acceleration: engine.acceleration,
          averageFuelConsumption: engine.averageFuelConsumption,
          fuelCapacity: engine.fuelCapacity,
          inventedYear: engine.inventedYear,
        };
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);
        console.log(parsedError);
      }
    },
    getEngineByIdQuery(id) {
      return {
        query: gql`
          {
            getEngineById(id: ${id}) {
              id,
              name,
              fuelType,
              horsePower,
              acceleration,
              averageFuelConsumption,
              fuelCapacity,
              inventedYear,
            },
          },
        `,
      };
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/mixins/pages';

  .engine {
    @include titled-page;
  }
</style>
