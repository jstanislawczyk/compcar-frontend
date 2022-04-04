<template>
  <section class="car">
    <h2 class="car__name">{{ `${brand.name} ${model.name} ${generation.name} ${car.name}` }}</h2>
    <img class="car__image" src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png" alt="Car photo" />
    <p class="car__description">{{ car.description }}</p>
    <p>
      <span class="car__subtitle">Production date:</span>
      {{ buildProductionDateInformation(car.startYear, car.endYear) }}
    </p>
    <p>
      <span class="car__subtitle">Price:</span>
      {{ car.basePrice }}
    </p>
    <p>
      <span class="car__subtitle">Weight:</span>
      {{ car.weight }}kg
    </p>
    <p>
      <span class="car__subtitle">Body style:</span>
      {{ car.bodyStyle.toLowerCase() }}
    </p>
  </section>
</template>

<script>
import { parseGraphQlErrorMessage } from '@/common/errors';
import { buildProductionDateInformation } from '@/common/car';
import gql from 'graphql-tag';

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
  async created() {
    const carId = this.$route.params.id;
    await this.setupCarData(carId);
  },
  methods: {
    buildProductionDateInformation,
    async setupCarData(id) {
      try {
        const getCarByIdQuery = this.getCarByIdQuery(id);
        const carResponse = await this.$apollo.query(getCarByIdQuery);

        const car = carResponse.data.getCarById;
        this.car = {
          id: car.id,
          name: car.name,
          description: car.description,
          basePrice: car.basePrice,
          startYear: car.startYear,
          endYear: car.endYear,
          weight: car.weight,
          bodyStyle: car.bodyStyle,
        };

        const generation = car.generation;
        this.generation = {
          name: generation.name,
        };

        const model = generation.model;
        this.model = {
          name: model.name,
        };

        const brand = model.brand;
        this.brand = {
          name: brand.name,
        };
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);
        console.log(parsedError);
      }
    },
    getCarByIdQuery(id) {
      return {
        query: gql`
          {
            getCarById(id: ${id}) {
              id,
              name,
              description,
              basePrice,
              startYear,
              endYear,
              weight,
              bodyStyle,
              generation {
                name,
                model {
                  name,
                  brand {
                    name,
                  },
                },
              },
            }
          },
        `,
      };
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/devices';

  .car {
    min-height: calc(100vh - 50px);
    padding: 30px 5% 20px;
    text-align: left;

    &__image {
      width: 100%;
      display: block;
      margin: 10px auto 60px;
      border: 1px solid #000;

      @media (min-width: $desktop-small) {
        width: 80%;
      }

      @media (min-width: $desktop-medium) {
        width: 70%;
      }
    }

    &__description {
      margin-bottom: 35px;
    }

    &__subtitle {
      font-weight: 700;
    }

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
