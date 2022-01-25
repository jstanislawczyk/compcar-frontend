<template>
  <section class="car-search">
    <div class="filters">

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
          <div>1-60 of total of 6000</div>
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
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/colors';
  @import 'scss/variables/devices';
  @import 'scss/mixins/controls';

  .car-search {
    display: flex;

    .filters {
      width: 100vw;
      position: absolute;
      left: -50%;
      border-right: 1px solid $dark-grey;
      background: $concrete-grey;

      @media (min-width: $desktop-small) {
        position: static;
        flex: 1 1 25%;
        max-width: 300px;
      }
    }

    .search {
      flex: 1 1 75%;
      display: flex;
      flex-direction: column;
    }

    .options {
      display: flex;
      justify-content: right;
      align-items: center;
      height: 80px;
      padding: 0 25px;
    }

    .sort {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

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
        margin: 20px 30px;
      }

      &__tiles {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 40px 30px;
        padding: 30px 40px;
      }

      &__pagination {
        display: flex;
        justify-content: space-between;
        padding: 30px 40px;
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
        margin: 30px 0 30px;
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
