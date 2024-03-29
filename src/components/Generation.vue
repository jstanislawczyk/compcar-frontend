<template>
  <section class="generation">
    <div class="breadcrumbs">
      <router-link to="/models-search" class="breadcrumbs__breadcrumb">Models search</router-link>
      <span class="breadcrumbs__separator">&#xbb;</span>
      <router-link :to="`/model/${model.id}`" class="breadcrumbs__breadcrumb">{{ `${brand.name} ${model.name}` }}</router-link>
      <span class="breadcrumbs__separator">&#xbb;</span>
      <span class="breadcrumbs__current">{{ generation.name }}</span>
    </div>

    <h2 class="generation__name">{{ `${brand.name} ${model.name} ${generation.name}` }}</h2>
    <p>{{ generation.description }}</p>
    <p>
      <span class="generation__subtitle">Production date:</span>
      {{
        buildGeneralProductionDateInformation([
          ...cars.available,
          ...cars.discontinued,
        ])
      }}
    </p>

    <div class="cars">
      <h3 class="cars__status">Available</h3>
      <div v-if="cars.available.length > 0" class="cars__tiles">
        <div class="car" v-for="car in cars.available" :key="car.id">
          <img class="car__image" src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png" alt="Car photo" />
          <div class="car__info">
            <span class="car__name">{{ car.name }}</span>
            <div class="car__details">
              <span class="car__description">{{ car.description }}</span>
              <span class="car__detail">
                <span class="car__detail-title">Production date:</span> {{ buildProductionDateInformation(car.startYear, car.endYear) }}
              </span>
              <span class="car__detail">
                <span class="car__detail-title">Body style:</span> {{ car.bodyStyle.toLowerCase() }}
              </span>
            </div>
            <span class="car__price">{{ car.basePrice }} PLN</span>

            <router-link :to="`/car/${car.id}`" class="car__link" tag="button">Check car</router-link>
          </div>
        </div>
      </div>
      <p v-else>No available cars</p>

      <h3 class="cars__status">Discontinued</h3>
      <div v-if="cars.discontinued.length > 0" class="cars__tiles">
        <div class="car" v-for="car in cars.discontinued" :key="car.id">
          <img class="car__image" src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png" alt="Car photo" />
          <div class="car__info">
            <span class="car__name">{{ car.name }}</span>
            <div class="car__details">
              <span class="car__description">{{ car.description }}</span>
              <span class="car__detail">
                <span class="car__detail-title">Production date:</span> {{ buildProductionDateInformation(car.startYear, car.endYear) }}
              </span>
              <span class="car__detail">
                <span class="car__detail-title">Body style:</span> {{ car.bodyStyle.toLowerCase() }}
              </span>
            </div>
            <span class="car__price">{{ formatPrice(car.basePrice) }} PLN</span>

            <router-link :to="`/car/${car.id}`" class="car__link" tag="button">Check car</router-link>
          </div>
        </div>
      </div>
      <p v-else>No discontinued cars</p>
    </div>
  </section>
</template>

<script>
import { formatPrice } from '@/common/currency';
import { parseGraphQlErrorMessage } from '@/common/errors';
import { buildGeneralProductionDateInformation, buildProductionDateInformation } from '@/common/car';
import gql from 'graphql-tag';

export default {
  name: 'Generation',
  data() {
    return {
      generation: {},
      model: {
        id: 0,
        name: '',
      },
      brand: {
        name: '',
      },
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
    buildProductionDateInformation,
    buildGeneralProductionDateInformation,
    async setupGenerationData(id) {
      try {
        const getGenerationByIdQuery = this.getGenerationByIdQuery(id);
        const generationResponse = await this.$apollo.query(getGenerationByIdQuery);

        const generation = generationResponse.data.getGenerationById;
        this.generation = this.buildGeneration(generation);

        const model = generation.model;
        this.model = this.buildModel(model);

        const brand = model.brand;
        this.brand = this.buildBrand(brand);

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
              description,
              cars {
                id,
                name,
                description,
                basePrice,
                bodyStyle,
                startYear,
                endYear,
              },
              model {
                id,
                name,
                brand {
                  name,
                },
              },
            }
          }
        `,
      };
    },
    initCarsData(cars) {
      cars.forEach((car) => {
        if (!car.endYear) {
          this.cars.available.push(car);
        } else {
          this.cars.discontinued.push(car);
        }
      });
    },
    buildGeneration(generation) {
      return {
        id: generation.id,
        name: generation.name,
        description: generation.description,
        startYear: generation.startYear,
        endYear: generation.endYear,
      };
    },
    buildModel(model) {
      return {
        id: model.id,
        name: model.name,
      };
    },
    buildBrand(brand) {
      return {
        name: brand.name,
      };
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/mixins/pages';
  @import 'scss/mixins/tiles';
  @import 'scss/mixins/breadcrumbs';

  .generation {
    @include titled-page;
  }

  .breadcrumbs {
    @include breadcrumbs;
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
