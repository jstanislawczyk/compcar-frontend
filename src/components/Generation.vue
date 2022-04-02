<template>
  <section class="generation">
    <h2 class="generation__name">Audi A4 B6</h2>
    <p>{{ generation.description }}</p>

    <div class="cars">
      <h3 class="cars__status">Available</h3>
      <div class="cars__tiles">
        <div class="car" v-for="car in cars.available" :key="car.id">
          <img class="car__image" src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png" alt="Car photo" />
          <div class="car__info">
            <span class="car__name">{{ car.bodyStyle }}</span>
            <div class="car__details">
              <span class="car__description">{{ car.description }}</span>
            </div>
            <span class="car__price">{{ car.basePrice }}zł</span>

            <router-link :to="`/car/${car.id}`" class="car__link" tag="button">Check car</router-link>
          </div>
        </div>
      </div>

      <h3 class="cars__status">Discontinued</h3>
      <div class="cars__tiles">
        <div class="car" v-for="car in cars.discontinued" :key="car.id">
          <img class="car__image" src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png" alt="Car photo" />
          <div class="car__info">
            <span class="car__name">{{ car.bodyStyle }}</span>
            <div class="car__details">
              <span class="car__description">{{ car.description }}</span>
            </div>
            <span class="car__price">{{ car.basePrice }}zł</span>

            <router-link :to="`/car/${car.id}`" class="car__link" tag="button">Check car</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { formatPrice } from '@/common/currency';
import { parseGraphQlErrorMessage } from '@/common/errors';
import gql from 'graphql-tag';

export default {
  name: 'Generation',
  data() {
    return {
      generation: {},
      cars: {
        available: [],
        discontinued: [],
      },
    };
  },
  async created() {
    const generationId = this.$route.params.id;
    await this.setupGenerationData(generationId);
  },
  methods: {
    formatPrice,
    async setupGenerationData(id) {
      try {
        const generationByIdQuery = this.getGenerationByIdQuery(id);
        const generationResponse = await this.$apollo.query(generationByIdQuery);
        const generation = generationResponse.data.getGenerationById;

        this.generation = {
          id: generation.id,
          name: generation.name,
          description: generation.description,
          startYear: generation.description,
          endYear: generation.description,
        };
        this.initCarsData(generation.cars);
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);
        console.log(parsedError);
      }
    },
    getGenerationByIdQuery(id) {
      return {
        query: gql`
          {
            getGenerationById(id: ${id}) {
              id,
              name,
              startYear,
              endYear,
              cars {
                id,
                name,
                description,
                basePrice,
                isAvailable,
              },
            }
          }
        `,
      };
    },
    initCarsData(cars) {
      cars.forEach((car) => {
        if (car.isAvailable) {
          this.cars.available.push(car);
        } else {
          this.cars.discontinued.push(car);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/devices';
  @import 'scss/mixins/tiles';

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

  .cars {
    margin-top: 50px;

    &__status {
      margin: 40px 0 20px;
    }

    &__tiles {
      @include tiles-grid;
    }
  }

  .car {
    @include tile;
  }
</style>
