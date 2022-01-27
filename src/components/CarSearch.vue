<template>
  <section class="car-search">
    <div class="filters">
      <h3 class="filters__title">Filters</h3>

      <div class="filter">
        <h4 v-on:click="toggleFilteringSection(0)" class="filter__title">
          <span class="filter__text">Brand</span>
          <span class="filter__arrow" v-bind:class="{ 'filter__arrow--down': !filtering.isSectionOpened[0] }">
            <span></span>
          </span>
        </h4>
        <div v-if="filtering.isSectionOpened[0]">
          <div class="filter__option">
            <input type="checkbox" id="1" v-model="filtering.countries" class="filter__checkbox" />
            <label for="1" class="filter__value">Audi</label>
          </div>
          <div class="filter__option">
            <input type="checkbox" id="2" v-model="filtering.countries" class="filter__checkbox" />
            <label for="2" class="filter__value">BMW</label>
          </div>
        </div>
      </div>

      <div class="filter">
        <h4 v-on:click="toggleFilteringSection(1)" class="filter__title">
          <span class="filter__text">Country</span>
          <span class="filter__arrow" v-bind:class="{ 'filter__arrow--down': !filtering.isSectionOpened[1] }">
            <span></span>
          </span>
        </h4>
        <div v-if="filtering.isSectionOpened[1]">
          <div class="filter__option">
            <input type="checkbox" id="3" v-model="filtering.countries" class="filter__checkbox" />
            <label for="3" class="filter__value">Germany</label>
          </div>
          <div class="filter__option">
            <input type="checkbox" id="4" v-model="filtering.countries" class="filter__checkbox" />
            <label for="4" class="filter__value">France</label>
          </div>
        </div>
      </div>
    </div>

    <div class="search">
      <div class="options">
        <div class="sort">
          <label for="select-sort" class="sort__label">
            Sorting
          </label>

          <select id="select-sort" class="sort__select" v-model="selectedSortOption">
            <option v-for="option in sortOptions" :value="option.value" :key="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="results">
        <h2 class="results__title">Results found (14375)</h2>

        <div class="results__tiles">
          <div v-for="car in cars" :key="car.id" class="result-tile">
            <img class="result-tile__image" src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png" alt="Car photo" />
            <div class="result-tile__info">
              <span class="result-tile__name">Audi A4B6</span>
              <span class="result-tile__details">Niemcy, Benzyna, korbotronik, 2001-2003, testujemy więcej tekstu, niemiec płakał jak sprzedawał</span>
              <span class="result-tile__price">{{ formatPrice(car.price) }}zł</span>

              <router-link :to="`/car/${car.id}`" class="result-tile__link" tag="button">More details</router-link>
            </div>
          </div>
        </div>

        <div class="results__pagination">
          <div>1-{{ pagination.pageSize }} of 6000</div>
          <div>
            <span class="pagination__token pagination__token--page-link">1</span>
            <span class="pagination__token pagination__token--page-link">2</span>
            <span class="pagination__token pagination__token--page-link">3</span>
            <span class="pagination__token pagination__token--page-link">4</span>
            <span class="pagination__token">out of</span>
            <span class="pagination__token pagination__token--page-link">100</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
import { formatPrice } from '@/common/currency';

export default {
  name: 'CarSearch',
  data() {
    const sortOptions = [
      {
        text: 'Price: low to high',
        value: 'price:ASC',
      },
      {
        text: 'Price: high to low',
        value: 'price:DESC',
      },
    ];

    return {
      sortOptions,
      selectedSortOption: sortOptions[0].value,
      filtering: {
        countries: [],
        isSectionOpened: [
          true, true,
        ],
      },
      pagination: {
        pageSize: 10,
      },
      cars: [
        { id: 1, price: 10000 },
        { id: 2, price: 12000 },
        { id: 3, price: 13000 },
        { id: 4, price: 14000 },
        { id: 5, price: 15000 },
      ],
    };
  },
  methods: {
    formatPrice,
    toggleFilteringSection(sectionIndex) {
      Vue.set(this.filtering.isSectionOpened, sectionIndex, !this.filtering.isSectionOpened[sectionIndex]);
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/colors';
  @import 'scss/variables/devices';
  @import 'scss/mixins/controls';
  @import 'scss/mixins/shapes';

  .car-search {
    display: flex;

    .filters {
      width: 100vw;
      padding: 0 20px;
      position: absolute;
      left: -50%;
      border-right: 1px solid $dark-grey;
      background: $concrete-grey;

      @media (min-width: $desktop-small) {
        position: static;
        flex: 1 1 25%;
        max-width: 300px;
      }

      &__title {
        text-align: left;
      }
    }

    .filter {
      &__title {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
      }

      &__text {
        width: 50%;
        text-align: left;
      }

      &__arrow {
        @include arrow-up;

        &--down {
          @include arrow-down;

          & span {
            margin-bottom: 4px;
          }
        }
      }

      &__option {
        display: flex;
        justify-content: left;
        padding-bottom: 10px;
      }

      &__checkbox {
        margin-right: 20px;
      }
    }

    .search {
      flex: 1 1 75%;
      display: flex;
      flex-direction: column;
      padding: 0 30px;
    }

    .options {
      display: flex;
      justify-content: right;
      align-items: center;
    }

    .sort {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin-top: 40px;

      &__select {
        width: 200px;
        height: 35px;
        margin-top: 5px;
        border: 2px solid $black;
        background: $white;
        font-size: 15px;
      }

      &__label {
        font-size: 13px;
      }
    }

    .results {
      width: 100%;

      &__title {
        text-align: left;
        margin: 20px 0;
      }

      &__tiles {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 40px 30px;
        margin: 30px 0;
      }

      &__pagination {
        display: flex;
        justify-content: space-between;
        margin: 50px 0 30px;
      }
    }

    .result-tile {
      &__image {
        width: 100%;
      }

      &__info {
        padding: 0 15px;
        border: 2px solid $light-grey;
        border-top: none;
        border-radius: 0 0 3px 3px;
      }

      &__name {
        display: inline-block;
        width: 100%;
        margin: 15px 0;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }

      &__details {
        display: inline-block;
        width: 95%;
        padding: 20px 0;
        border: 1px solid $light-grey;
        border-right: none;
        border-left: none;
        font-size: 15px;
        color: $grey;
      }

      &__price {
        width: 100%;
        display: inline-block;
        margin: 30px 0;
        font-size: 20px;
        font-weight: bold;
        color: $dark-grey;
      }

      &__link {
        @include button(170px);

        margin-bottom: 15px;
      }
    }

    .pagination {
      &__token {
        margin: 0 10px;

        &--page-link {
          &:hover {
            color: $pink;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
