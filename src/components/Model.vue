<template>
  <section class="model">
    <h2 class="model__name">{{ brand.name }} {{ model.name }}</h2>
    <p>{{ model.description }}</p>

    <div class="generations">
      <h3 class="generations__status">Available</h3>
      <div class="generations__tiles">
        <div class="generation" v-for="generation in generations.available" :key="generation.id">
          <img class="generation__image" src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png" alt="Car photo" />
          <div class="generation__info">
            <span class="generation__name">{{ brand.name }} {{ generation.name }}</span>
            <div class="generation__details">
              <span class="generation__description">{{ generation.description }}</span>
              <span class="generation__detail">
                <span class="generation__detail-title">Available body styles:</span> {{ getBodyStyles(generation.cars) }}
              </span>
              <span class="generation__detail">
                <span class="generation__detail-title">Production date:</span> {{ buildGeneralProductionDateInformation(generation.cars) }}
              </span>
            </div>
            <span class="generation__price">{{ formatPrice(getCheapestCarPrice(generation.cars)) }} PLN</span>

            <router-link :to="`/generation/${generation.id}`" class="generation__link" tag="button">Check cars</router-link>
          </div>
        </div>
      </div>

      <h3 class="generations__status">Discontinued</h3>
      <div class="generations__tiles">
        <div class="generation" v-for="generation in generations.discontinued" :key="generation.id">
          <img class="generation__image" src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png" alt="Car photo" />
          <div class="generation__info">
            <span class="generation__name">{{ brand.name }} {{ generation.name }}</span>
            <div class="generation__details">
              <span class="generation__description">{{ generation.description }}</span>
              <span class="generation__detail">
                <span class="generation__detail-title">Available body styles:</span> {{ getBodyStyles(generation.cars) }}
              </span>
              <span class="generation__detail">
                <span class="generation__detail-title">Production date:</span> {{ buildGeneralProductionDateInformation(generation.cars) }}
              </span>
            </div>
            <span class="generation__price">{{ formatPrice(getCheapestCarPrice(generation.cars)) }} PLN</span>

            <router-link :to="`/generation/${generation.id}`" class="generation__link" tag="button">Check cars</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { formatPrice } from '@/common/currency';
import { parseGraphQlErrorMessage } from '@/common/errors';
import { buildGeneralProductionDateInformation } from '@/common/car';
import gql from 'graphql-tag';

export default {
  name: 'Model',
  data() {
    return {
      model: {},
      brand: {},
      generations: {
        available: [],
        discontinued: [],
      },
    };
  },
  async created() {
    const modelId = this.$route.params.id;
    await this.setupModelData(modelId);
  },
  methods: {
    formatPrice,
    buildGeneralProductionDateInformation,
    async setupModelData(id) {
      try {
        const getModelByIdQuery = this.getModelByIdQuery(id);
        const modelResponse = await this.$apollo.query(getModelByIdQuery);
        const model = modelResponse.data.getModelById;

        this.model = {
          id: model.id,
          name: model.name,
          description: model.description,
        };
        this.brand = model.brand;
        this.initGenerationsData(model.generations);
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);
        console.log(parsedError);
      }
    },
    getModelByIdQuery(id) {
      return {
        query: gql`
          {
            getModelById(id: ${id}) {
              id,
              name,
              description,
              brand {
                name,
              },
              generations {
                id,
                name,
                description,
                cars {
                  name,
                  basePrice,
                  bodyStyle,
                  startYear,
                  endYear,
                },
              },
            },
          }
        `,
      };
    },
    initGenerationsData(generations) {
      generations.forEach((generation) => {
        const hasAvailableCar = generation.cars.some((car) => !car.endYear);

        if (hasAvailableCar) {
          this.generations.available.push(generation);
        } else {
          this.generations.discontinued.push(generation);
        }
      });
    },
    getBodyStyles(cars) {
      return cars
        .map((car) => car.bodyStyle.toLowerCase())
        .join(', ');
    },
    getCheapestCarPrice(cars) {
      const basePrices = cars
        .flat()
        .map((car) => car.basePrice);

      return Math.min(...basePrices);
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/devices';
  @import 'scss/mixins/tiles';

  .model {
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

  .generations {
    margin-top: 50px;

    &__status {
      margin: 40px 0 20px;
    }

    &__tiles {
      @include tiles-grid;
    }
  }

  .generation {
    @include tile;
  }
</style>
