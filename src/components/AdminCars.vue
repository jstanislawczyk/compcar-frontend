<template>
  <section class="cars">
    <h2 class="cars__title">Cars</h2>

    <div class="cars__tiles">

    </div>
  </section>
</template>

<script>
import { parseGraphQlErrorMessage } from '@/common/errors';
import gql from 'graphql-tag';

export default {
  name: 'AdminCars',
  data() {
    return {
      cars: [],
    };
  },
  async created() {
    await this.setupCarsData();
  },
  methods: {
    async setupCarsData() {
      try {
        const getCarsQuery = this.getCarsQuery();
        const carsResponse = await this.$apollo.query(getCarsQuery);

        const cars = carsResponse.data.getCars;
        this.cars = this.buildCars(cars);
        console.log(this.cars);
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);
        console.log(parsedError);
      }
    },
    getCarsQuery() {
      return {
        query: gql`
          {
            getCars {
              id,
              name,
              description,
              basePrice,
              startYear,
              endYear,
              weight,
              bodyStyle,
              generation {
                name
                model {
                  name,
                  brand {
                    name,
                  },
                },
              },
              photos {
                  id,
                  url,
              },
            },
          }
        `,
      };
    },
    buildCars(cars) {
      return cars.map((car) => ({
        id: car.id,
        description: car.description,
        basePrice: car.basePrice,
        startYear: car.startYear,
        endYear: car.endYear,
        weight: car.weight,
        bodyStyle: car.bodyStyle,
      }));
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/mixins/controls';

  .cars {
    &__title {
      margin-top: 0;
      font-size: 30px;
      text-align: left;
    }
  }

</style>
