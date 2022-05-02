<template>
  <section class="colors">
    <h2 class="colors__title">Colors</h2>
    <div class="table">
      <div class="table__row">
        <div class="table__column">Name</div>
        <div class="table__column">Hex code</div>
        <div class="table__column">Color</div>
        <div class="table__column"></div>
      </div>

      <div
        v-for="(color, index) in colors"
        :key="color.id"
        class="table__row table__row--item"
        v-bind:class="[ index % 2 === 0 ? 'table__row--even' : 'table__row--odd' ]"
      >
        <div class="table__column">{{ color.name }}</div>
        <div class="table__column">{{ color.hexCode }}</div>
        <div class="table__column">
          <div class="table__color-label" :style="{ 'background-color': color.hexCode }"></div>
        </div>
        <div class="table__column">
          <button class="table__edit"></button>
        </div>
      </div>

      <div
        class="table__row table__row--item"
        v-bind:class="[ colors.length % 2 === 0 ? 'table__row--even' : 'table__row--odd' ]"
      >
        <div class="table__column">
          <input v-model="colorToSave.name" placeholder="e.g. red">
        </div>
        <div class="table__column">
          <input v-model="colorToSave.hexCode" placeholder="e.g. #F00">
        </div>
        <div class="table__column">
          <div class="table__color-label" :style="{ 'background-color': colorToSave.hexCode || '#FFF' }"></div>
        </div>
        <div class="table__column">
          <button v-on:click="createColor()" class="table__save"></button>
        </div>
      </div>
    </div>
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
      colorToSave: {
        name: '',
        hexCode: '',
      },
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
    async createColor() {
      try {
        const createColorQuery = this.getCreateColorQuery(this.colorToSave);
        const createColorResponse = await this.$apollo.query(createColorQuery);
        const newColor = createColorResponse.data.createColor;
        this.colors.push(this.buildColor(newColor));
      } catch (error) {
        console.log(error);
        const parsedError = parseGraphQlErrorMessage(error);
        console.log(parsedError);
      }
    },
    getCreateColorQuery(newColor) {
      return gql`
        mutation {
          createColor (
            createColorInput: {
              name: "${newColor.name}",
              hexCode: "${newColor.hexCode}",
            }
          ) {
            id,
            name,
            hexCode,
          }
        }
      `;
    },
    buildColors(colors) {
      return colors.map((color) => this.buildColor(color));
    },
    buildColor(color) {
      return {
        id: color.id,
        name: color.name,
        hexCode: color.hexCode,
      };
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/mixins/table';
  @import 'scss/mixins/labels';
  @import 'scss/mixins/controls';

  .colors {
    &__title {
      margin-top: 0;
      font-size: 30px;
      text-align: left;
    }
  }

  .table {
    @include table;

    &__color-label {
      @include color-label;
    }

    &__edit {
      @include image-button('../../src/assets/icons/edit.png');
    }

    &__save {
      @include image-button('../../src/assets/icons/save.png');
    }
  }
</style>
