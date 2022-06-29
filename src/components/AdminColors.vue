<template>
  <section class="colors">
    <h2 class="colors__title">Colors</h2>
    <div class="table">
      <div class="table__row">
        <div class="table__row-content">
          <div class="table__column">Name</div>
          <div class="table__column">Hex code</div>
          <div class="table__column">Color</div>
          <div class="table__column"></div>
        </div>
      </div>

      <div
        v-for="(color, index) in colors"
        :key="color.id"
        class="table__row table__row--item"
        v-bind:class="[ index % 2 === 0 ? 'table__row--even' : 'table__row--odd' ]"
      >
        <div v-if="color.id !== colorToUpdate.id" class="table__row-content">
          <div class="table__column">{{ color.name }}</div>
          <div class="table__column">{{ color.hexCode }}</div>
          <div class="table__column">
            <div class="table__color-label" :style="{ 'background-color': color.hexCode }"></div>
          </div>
          <div class="table__column">
            <button v-on:click="openColorToUpdate(color)" class="table__button table__button--edit"></button>
          </div>
        </div>

        <div v-else class="table__row-content">
          <div class="table__column">
            <input v-model="colorToUpdate.name" class="column__input" placeholder="e.g. Red">
          </div>
          <div class="table__column">
            <input v-model="colorToUpdate.hexCode" class="column__input" placeholder="e.g. #F00">
          </div>
          <div class="table__column">
            <div class="table__color-label" :style="{ 'background-color': color.hexCode }"></div>
          </div>
          <div class="table__column">
            <button v-on:click="updateColor(color)" class="table__button table__button--save"></button>
            <button v-on:click="closeColorEdit()" class="table__button table__button--close"></button>
          </div>
        </div>

        <div
          v-if="color.id === colorToUpdate.id && errors.colorUpdateErrors.length > 0"
          class="table__row-errors"
        >
          <p
            v-for="error in errors.colorUpdateErrors"
            v-bind:key="error"
            class="table__error"
          >
            {{ error }}
          </p>
        </div>
      </div>

      <div
        class="table__row table__row--item"
        v-bind:class="[ colors.length % 2 === 0 ? 'table__row--even' : 'table__row--odd' ]"
      >
        <div class="table__row-content">
          <div class="table__column">
            <input v-model="colorToSave.name" class="column__input" placeholder="e.g. Red">
          </div>
          <div class="table__column">
            <input v-model="colorToSave.hexCode" class="column__input" placeholder="e.g. #F00">
          </div>
          <div class="table__column">
            <div class="table__color-label" :style="{ 'background-color': colorToSave.hexCode || '#FFF' }"></div>
          </div>
          <div class="table__column">
            <button v-on:click="saveColor()" class="table__button table__button--save"></button>
          </div>
        </div>
        <div
          v-if="errors.colorCreateErrors.length > 0"
          class="table__row-errors"
        >
          <p
            v-for="error in errors.colorCreateErrors"
            v-bind:key="error"
            class="table__error"
          >
            {{ error }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { parseGraphQlErrorMessage } from '@/common/errors';
import { isHexCode } from '@/common/text';
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
      colorToUpdate: {
        id: undefined,
        name: '',
        hexCode: '',
      },
      errors: {
        colorCreateErrors: [],
        colorUpdateErrors: [],
      },
    };
  },
  async created() {
    await this.setupColorsData();
  },
  methods: {
    isHexCode,
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
    openColorToUpdate(color) {
      this.closeColorEdit();
      this.colorToUpdate = {
        id: color.id,
        name: color.name,
        hexCode: color.hexCode,
      };
    },
    closeColorEdit() {
      this.errors.colorUpdateErrors = [];
      this.colorToUpdate = {
        id: undefined,
        name: '',
        hexCode: '',
      };
    },
    async updateColor() {
      try {
        this.errors.colorUpdateErrors = this.validateColor(this.colorToUpdate);

        if (this.errors.colorUpdateErrors.length > 0) {
          return;
        }

        const updateColorQuery = this.getUpdateColorQuery(this.colorToUpdate);
        const updateColorResponse = await this.$apollo.mutate({
          mutation: updateColorQuery,
        });
        const updatedColor = updateColorResponse.data.updateColor;

        this.$store.commit('toggleInfoPanel', {
          message: 'Color updated successfully',
          type: 'success',
        });
        this.updateColorsList(updatedColor);
        this.closeColorEdit();
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);

        this.$store.commit('toggleInfoPanel', {
          message: parsedError,
          type: 'error',
        });
      }
    },
    getUpdateColorQuery(updatedColor) {
      return gql`
        mutation {
          updateColor (
            updateColorInput: {
              id: ${updatedColor.id},
              name: "${updatedColor.name}",
              hexCode: "${updatedColor.hexCode}",
            }
          ) {
            id,
            name,
            hexCode,
          }
        }
      `;
    },
    updateColorsList(updatedColor) {
      const colorIndex = this.colors.findIndex((color) =>
        color.id === updatedColor.id,
      );

      this.colors[colorIndex] = this.buildColor(updatedColor);
    },
    async saveColor() {
      try {
        this.errors.colorCreateErrors = this.validateColor(this.colorToSave);

        if (this.errors.colorCreateErrors.length > 0) {
          return;
        }

        const createColorQuery = this.getCreateColorQuery(this.colorToSave);
        const createColorResponse = await this.$apollo.mutate({
          mutation: createColorQuery,
        });
        const newColor = createColorResponse.data.createColor;

        this.$store.commit('toggleInfoPanel', {
          message: 'Color created successfully',
          type: 'success',
        });
        this.colors.push(this.buildColor(newColor));
        this.clearColorToSaveData();
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);

        this.$store.commit('toggleInfoPanel', {
          message: parsedError,
          type: 'error',
        });
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
    clearColorToSaveData() {
      this.colorToSave = {
        name: '',
        hexCode: '',
      };
    },
    validateColor(colorToSave) {
      const colorErrors = [];

      if (colorToSave.name.length < 2 || colorToSave.name.length > 64) {
        colorErrors.push('Color name should have length between 2 and 64');
      }

      if (!isHexCode(colorToSave.hexCode)) {
        colorErrors.push('Should be valid hex code');
      }

      return colorErrors;
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/mixins/table';
  @import 'scss/mixins/labels';

  .colors {
    &__title {
      margin-top: 0;
      font-size: 30px;
      text-align: left;
    }
  }

  .table {
    @include editable-table;

    &__color-label {
      @include color-label;
    }
  }
</style>
