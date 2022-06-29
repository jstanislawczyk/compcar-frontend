<template>
  <section class="addons">
    <h2 class="addons__title">Addons</h2>
    <div class="table">
      <div class="table__row">

        <div class="table__row-content">
          <div class="table__column">Name</div>
          <div class="table__column">Description</div>
          <div class="table__column"></div>
        </div>
      </div>

      <div
        v-for="(addon, index) in addons"
        :key="addon.id"
        class="table__row table__row--item"
        v-bind:class="[ index % 2 === 0 ? 'table__row--even' : 'table__row--odd' ]"
      >
        <div v-if="addon.id !== addonToUpdate.id" class="table__row-content">
          <div class="table__column">{{ addon.name }}</div>
          <div class="table__column">{{ addon.description }}</div>
          <div class="table__column">
            <button v-on:click="openAddonToUpdate(addon)" class="table__button table__button--edit"></button>
          </div>
        </div>

        <div v-else class="table__row-content">
          <div class="table__column">
            <input v-model="addonToUpdate.name" class="column__input" placeholder="e.g. Air conditioner">
          </div>
          <div class="table__column">
            <input v-model="addonToUpdate.description" class="column__input column__input--long" placeholder="e.g. Temperature cooling">
          </div>
          <div class="table__column">
            <button v-on:click="updateAddon(addon)" class="table__button table__button--save"></button>
            <button v-on:click="closeAddonEdit()" class="table__button table__button--close"></button>
          </div>
        </div>

        <div
          v-if="addon.id === addonToUpdate.id && errors.addonUpdateErrors.length > 0"
          class="table__row-errors"
        >
          <p
            v-for="error in errors.addonUpdateErrors"
            v-bind:key="error"
            class="table__error"
          >
            {{ error }}
          </p>
        </div>
      </div>

      <div
        class="table__row table__row--item"
        v-bind:class="[ addons.length % 2 === 0 ? 'table__row--even' : 'table__row--odd' ]"
      >
        <div class="table__row-content">
          <div class="table__column">
            <input v-model="addonToSave.name" class="column__input" placeholder="e.g. Air conditioner">
          </div>
          <div class="table__column">
            <input v-model="addonToSave.description" class="column__input column__input--long" placeholder="e.g. Temperature cooling">
          </div>
          <div class="table__column">
            <button v-on:click="saveAddon()" class="table__button table__button--save"></button>
          </div>
        </div>

        <div
          v-if="errors.addonCreateErrors.length > 0"
          class="table__row-errors"
          v-bind:class="[ addons.length % 2 === 0 ? 'table__row--even' : 'table__row--odd' ]"
        >
          <p
            v-for="error in errors.addonCreateErrors"
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
import gql from 'graphql-tag';

export default {
  name: 'AdminAddons',
  data() {
    return {
      addons: [],
      addonToSave: {
        name: '',
        description: '',
      },
      addonToUpdate: {
        id: undefined,
        name: '',
        description: '',
      },
      errors: {
        addonCreateErrors: [],
        addonUpdateErrors: [],
      },
    };
  },
  async created() {
    await this.setupAddonsData();
  },
  methods: {
    async setupAddonsData() {
      try {
        const getAllAddonsQuery = this.getAllAddonsQuery();
        const addonsResponse = await this.$apollo.query(getAllAddonsQuery);

        const addons = addonsResponse.data.getAddons;
        this.addons = this.buildAddons(addons);
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);
        console.log(parsedError);
      }
    },
    getAllAddonsQuery() {
      return {
        query: gql`
          {
            getAddons {
              id,
              name,
              description,
            },
          }
        `,
      };
    },
    openAddonToUpdate(addon) {
      this.closeAddonEdit();
      this.addonToUpdate = {
        id: addon.id,
        name: addon.name,
        description: addon.description,
      };
    },
    closeAddonEdit() {
      this.errors.addonUpdateErrors = [];
      this.addonToUpdate = {
        id: undefined,
        name: '',
        description: '',
      };
    },
    async updateAddon() {
      try {
        this.errors.addonUpdateErrors = this.validateAddon(this.addonToUpdate);

        if (this.errors.addonUpdateErrors.length > 0) {
          return;
        }

        const updateAddonQuery = this.getUpdateAddonQuery(this.addonToUpdate);
        const updateAddonResponse = await this.$apollo.mutate({
          mutation: updateAddonQuery,
        });
        const updatedAddon = updateAddonResponse.data.updateAddon;

        this.$store.commit('toggleInfoPanel', {
          message: 'Addon updated successfully',
          type: 'success',
        });
        this.updateAddonsList(updatedAddon);
        this.closeAddonEdit();
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);

        this.$store.commit('toggleInfoPanel', {
          message: parsedError,
          type: 'error',
        });
      }
    },
    getUpdateAddonQuery(updatedAddon) {
      return gql`
        mutation {
          updateAddon (
            updateAddonInput: {
              id: ${updatedAddon.id},
              name: "${updatedAddon.name}",
              description: "${updatedAddon.description}",
            }
          ) {
            id,
            name,
            description,
          }
        }
      `;
    },
    updateAddonsList(updatedAddon) {
      const addonIndex = this.addons.findIndex((addon) =>
        addon.id === updatedAddon.id,
      );

      this.addons[addonIndex] = this.buildAddon(updatedAddon);
    },
    async saveAddon() {
      try {
        this.errors.addonCreateErrors = this.validateAddon(this.addonToSave);

        if (this.errors.addonCreateErrors.length > 0) {
          return;
        }

        const createAddonQuery = this.getCreateAddonQuery(this.addonToSave);
        const createAddonResponse = await this.$apollo.mutate({
          mutation: createAddonQuery,
        });
        const newAddon = createAddonResponse.data.createAddon;

        this.$store.commit('toggleInfoPanel', {
          message: 'Addon created successfully',
          type: 'success',
        });
        this.addons.push(this.buildAddon(newAddon));
        this.clearAddonToSaveData();
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);

        this.$store.commit('toggleInfoPanel', {
          message: parsedError,
          type: 'error',
        });
      }
    },
    getCreateAddonQuery(newAddon) {
      return gql`
        mutation {
          createAddon (
            createAddonInput: {
              name: "${newAddon.name}",
              description: "${newAddon.description}",
            }
          ) {
            id,
            name,
            description,
          }
        }
      `;
    },
    buildAddons(addons) {
      return addons.map((addon) => this.buildAddon(addon));
    },
    buildAddon(addon) {
      return {
        id: addon.id,
        name: addon.name,
        description: addon.description,
      };
    },
    clearAddonToSaveData() {
      this.addonToSave = {
        name: '',
        description: '',
      };
    },
    validateAddon(addonToSave) {
      const addonErrors = [];

      if (addonToSave.name.length < 2 || addonToSave.name.length > 64) {
        addonErrors.push('Addon name should have length between 2 and 64');
      }

      if (addonToSave.description.length < 2 || addonToSave.description.length > 256) {
        addonErrors.push('Addon description should have length between 2 and 256');
      }

      return addonErrors;
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/mixins/table';
  @import 'scss/mixins/labels';
  @import 'scss/mixins/controls';

  .addons {
    &__title {
      margin-top: 0;
      font-size: 30px;
      text-align: left;
    }
  }

  .table {
    @include editable-table;
  }
</style>
