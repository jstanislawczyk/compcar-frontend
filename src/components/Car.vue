<template>
  <section class="car">
    <div class="breadcrumbs">
      <router-link to="/models-search" class="breadcrumbs__breadcrumb">Models search</router-link>
      <span class="breadcrumbs__separator">&#xbb;</span>
      <router-link :to="`/model/${model.id}`" class="breadcrumbs__breadcrumb">{{ `${brand.name} ${model.name}` }}</router-link>
      <span class="breadcrumbs__separator">&#xbb;</span>
      <router-link :to="`/generation/${generation.id}`" class="breadcrumbs__breadcrumb">{{ generation.name }}</router-link>
      <span class="breadcrumbs__separator">&#xbb;</span>
      <span class="breadcrumbs__current">{{ car.name }}</span>
    </div>

    <h2 class="car__name">{{ `${brand.name} ${model.name} ${generation.name} ${car.name}` }}</h2>
    <img class="car__image" src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png" alt="Car photo" />
    <p class="car__description">{{ car.description }}</p>

    <p>
      <span class="car__subtitle">Production date:</span>
      {{ buildProductionDateInformation(car.startYear, car.endYear) }}
    </p>
    <p>
      <span class="car__subtitle">Base price:</span>
      {{ formatPrice(car.basePrice) }} PLN
    </p>
    <p>
      <span class="car__subtitle">Weight:</span>
      {{ car.weight }}kg
    </p>
    <p>
      <span class="car__subtitle">Body style:</span>
      {{ car.bodyStyle.toLowerCase() }}
    </p>

    <template v-if="carEngines.length > 0">
      <p class="car__subtitle car__subtitle--spacing">Engines</p>
      <div class="car__paintings">
        <div class="table__row">
          <div class="table__column">Name</div>
          <div class="table__column">Fuel type</div>
          <div class="table__column">Price (PLN)</div>
        </div>

        <div
          v-for="(engine, index) in carEngines"
          :key="engine.id"
          class="table__row table__row--item"
          v-bind:class="[ index % 2 === 0 ? 'table__row--even' : 'table__row--odd' ]"
        >
          <div class="table__column">
            <router-link :to="`/engine/${engine.engine.id}`" class="table__link">
              {{ engine.engine.name }}
            </router-link>
          </div>
          <div class="table__column">{{ engine.engine.fuelType }}</div>
          <div class="table__column">{{ formatPrice(engine.price) }}</div>
        </div>
      </div>
    </template>

    <template v-if="paintings.length > 0">
      <p class="car__subtitle car__subtitle--spacing">Paintings</p>
      <div class="car__paintings">
        <div class="table__row">
          <div class="table__column">Name</div>
          <div class="table__column">Color</div>
          <div class="table__column">Price (PLN)</div>
        </div>

        <div
          v-for="(painting, index) in paintings"
          :key="painting.id"
          class="table__row table__row--item"
          v-bind:class="[ index % 2 === 0 ? 'table__row--even' : 'table__row--odd' ]"
        >
          <div class="table__column">{{ painting.color.name }}</div>
          <div class="table__column">
            <div class="table__color-label" :style="{ 'background-color': painting.color.hexCode }"></div>
          </div>
          <div class="table__column">{{ formatPrice(painting.price) }}</div>
        </div>
      </div>
    </template>

    <template v-if="addons.length > 0">
      <p class="car__subtitle car__subtitle--spacing">Available addons</p>
      <div class="car__addons">
        <div class="table__row">
          <div class="table__column">Name</div>
          <div class="table__column table__column--desktop">Description</div>
          <div class="table__column">Price (PLN)</div>
        </div>

        <div
          v-for="(addon, index) in addons"
          :key="addon.id"
          class="table__row table__row--item"
          v-bind:class="[ index % 2 === 0 ? 'table__row--even' : 'table__row--odd' ]"
        >
          <div class="table__column">{{ addon.name }}</div>
          <div class="table__column table__column--desktop">{{ addon.description }}</div>
          <div class="table__column">{{ formatPrice(addon.price) }}</div>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import { parseGraphQlErrorMessage } from '@/common/errors';
import { buildProductionDateInformation } from '@/common/car';
import { formatPrice } from '@/common/currency';
import gql from 'graphql-tag';

export default {
  name: 'Car',
  data() {
    return {
      car: {
        id: 0,
        name: '',
        description: '',
        basePrice: 0,
        startYear: 0,
        endYear: 0,
        weight: 0,
        bodyStyle: 'unknown',
      },
      model: {
        id: 0,
        name: '',
      },
      brand: {
        name: '',
      },
      generation: {
        id: 0,
        name: '',
      },
      carEngines: [],
      paintings: [],
      addons: [],
    };
  },
  async created() {
    const carId = this.$route.params.id;
    await this.setupCarData(carId);
  },
  methods: {
    formatPrice,
    buildProductionDateInformation,
    async setupCarData(id) {
      try {
        const getCarByIdQuery = this.getCarByIdQuery(id);
        const carResponse = await this.$apollo.query(getCarByIdQuery);

        const car = carResponse.data.getCarById;
        this.car = this.buildCar(car);

        const generation = car.generation;
        this.generation = this.buildGeneration(generation);

        const model = generation.model;
        this.model = this.buildModel(model);

        const brand = model.brand;
        this.brand = this.buildBrand(brand);

        this.carEngines = this.buildCarEngines(car.carEngines);
        this.paintings = this.buildPaintings(car.paintings);
        this.addons = this.buildAddons(car.carAddons);
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
                id,
                name,
                model {
                  id,
                  name,
                  brand {
                    name,
                  },
                },
              },
              carEngines {
                price,
                engine {
                  id,
                  fuelType,
                  name,
                },
              },
              paintings {
                id,
                price,
                color {
                  name,
                  hexCode,
                },
              },
              carAddons {
                price,
                addon {
                  id,
                  name,
                  description,
                },
              },
            },
          },
        `,
      };
    },
    buildCar(car) {
      return {
        id: car.id,
        name: car.name,
        description: car.description,
        basePrice: car.basePrice,
        startYear: car.startYear,
        endYear: car.endYear,
        weight: car.weight,
        bodyStyle: car.bodyStyle,
      };
    },
    buildBrand(brand) {
      return {
        name: brand.name,
      };
    },
    buildGeneration(generation) {
      return {
        id: generation.id,
        name: generation.name,
      };
    },
    buildModel(model) {
      return {
        id: model.id,
        name: model.name,
      };
    },
    buildCarEngines(carEngines) {
      return carEngines.map((carEngine) => ({
        id: carEngine.id,
        price: carEngine.price,
        engine: {
          id: carEngine.engine.id,
          name: carEngine.engine.name,
          fuelType: carEngine.engine.fuelType.toLowerCase(),
        },
      }));
    },
    buildPaintings(paintings) {
      return paintings.map((painting) => ({
        id: painting.id,
        price: painting.price,
        color: {
          name: painting.color.name,
          hexCode: painting.color.hexCode,
        },
      }));
    },
    buildAddons(carAddons) {
      return carAddons.map((carAddon) => ({
        id: carAddon.addon.id,
        name: carAddon.addon.name,
        description: carAddon.addon.description,
        price: carAddon.price,
      }));
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/mixins/breadcrumbs';
  @import 'scss/mixins/pages';
  @import 'scss/mixins/table';
  @import 'scss/mixins/labels';

  .car {
    @include titled-page;
  }

  .breadcrumbs {
    @include breadcrumbs;
  }

  .table {
    @include table;

    &__color-label {
      @include color-label;
    }
  }
</style>
