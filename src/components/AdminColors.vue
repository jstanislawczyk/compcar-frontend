<template>
  <section class="colors">
    <h2 class="colors__title">Colors</h2>
  </section>
</template>

<script>
import { parseGraphQlErrorMessage } from '@/common/errors';
import gql from 'graphql-tag';

export default {
  name: 'AdminColors',
  data() {
    return {
      colors: [],
    };
  },
  async created() {
    await this.setupColorsData();
  },
  methods: {
    async setupColorsData() {
      try {
        const getAllColorsQuery = this.getAllColorsQuery();
        const colorsResponse = await this.$apollo.query(getAllColorsQuery);

        const colors = colorsResponse.data.getColors;
        this.colors = this.buildColors(colors);
        console.log(this.colors);
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);
        console.log(parsedError);
      }
    },
    getAllColorsQuery() {
      return {
        query: gql`
          {
            getColors {
              id,
              name,
              hexCode,
            },
          }
        `,
      };
    },
    buildColors(colors) {
      return colors.map((color) => ({
        id: color.id,
        name: color.name,
        hexCode: color.hexCode,
      }));
    },
  },
};
</script>

<style scoped lang="scss">

  .colors {
    &__title {
      margin-top: 0;
      font-size: 30px;
      text-align: left;
    }
  }
</style>
