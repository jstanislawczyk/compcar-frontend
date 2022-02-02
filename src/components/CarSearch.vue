<template>
  <section class="car-search">
    <div class="filters" v-bind:class="{ 'filters--opened': filtering.isMobilePanelOpened }">
      <div class="filters__wrapper">
        <h3 class="filters__title">Filters</h3>
        <button v-on:click="toggleMobileFilterPanel()" class="filters__close"></button>

        <div class="filter">
          <h4 v-on:click="toggleFilteringSection(0)" class="filter__title">
            <span class="filter__text">Brand</span>
            <span class="filter__arrow" v-bind:class="{ 'filter__arrow--down': !filtering.isSectionOpened[0] }">
            <span></span>
          </span>
          </h4>
          <div v-if="filtering.isSectionOpened[0]">
            <div class="filter__option">
              <input type="checkbox" id="1" value="Audi" v-model="filtering.countries" class="filter__checkbox" />
              <label for="1" class="filter__label">Audi</label>
            </div>
            <div class="filter__option">
              <input type="checkbox" id="2" value="BMW" v-model="filtering.countries" class="filter__checkbox" />
              <label for="2" class="filter__label">BMW</label>
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
              <input type="checkbox" id="3" value="Germany" v-model="filtering.countries" class="filter__checkbox" />
              <label for="3" class="filter__label">Germany</label>
            </div>
            <div class="filter__option">
              <input type="checkbox" id="4" value="France" v-model="filtering.countries" class="filter__checkbox" />
              <label for="4" class="filter__label">France</label>
            </div>
          </div>
        </div>
      </div>

      <button v-on:click="toggleMobileFilterPanel()" class="filters__apply">Apply filters</button>
    </div>

    <div class="search" v-bind:class="{ 'search--hidden': filtering.isMobilePanelOpened }">
      <div class="options">
        <button v-on:click="toggleMobileFilterPanel()" class="options__filter-open-button">Filters</button>

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
        <h2 class="results__title">Results found ({{ pagination.totalCount }})</h2>

        <div class="results__tiles">
          <div v-for="car in cars" :key="car.id" class="result-tile">
            <img class="result-tile__image" src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png" alt="Car photo" />
            <div class="result-tile__info">
              <span class="result-tile__name">{{ car.name }}</span>
              <span class="result-tile__details">{{ car.description }}</span>
              <span class="result-tile__price">{{ formatPrice(10000) }}zł</span>

              <router-link :to="`/car/${car.id}`" class="result-tile__link" tag="button">More details</router-link>
            </div>
          </div>
        </div>

        <div class="results__pagination">
          <div>{{ buildPaginationInfo() }}</div>
          <div>
            <span
              v-if="this.pagination.shouldForceVisibilityOfFirstPageNumber"
              v-on:click="setCurrentPageNumber(1)"
              class="pagination__token pagination__token--page-link"
              v-bind:class="{ 'pagination__token--active': pagination.currentPage === 1 }"
            >
              1
            </span>
            <span v-if="this.pagination.shouldForceVisibilityOfFirstPageNumber" class="pagination__token">...</span>
            <span
              v-for="pageNumber in getPaginatedPages(
                this.pagination.totalCount,
                this.pagination.currentPage,
                this.pagination.pageSize,
                this.pagination.maxPagesToDisplay,
              )"
              :key="pageNumber" v-on:click="setCurrentPageNumber(pageNumber)"
              class="pagination__token pagination__token--page-link"
              v-bind:class="{ 'pagination__token--active': pagination.currentPage === pageNumber }"
            >
              {{ pageNumber }}
            </span>
            <span class="pagination__token">out of</span>
            <span v-on:click="setCurrentPageNumber(getTotalPagesNumber())" class="pagination__token pagination__token--page-link">{{ getTotalPagesNumber() }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
import { formatPrice } from '@/common/currency';
import { createArrayInRange } from '@/common/array';
import { parseGraphQlErrorMessage } from '@/common/errors';
import gql from 'graphql-tag';

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
        isMobilePanelOpened: false,
      },
      pagination: {
        pageSize: 10,
        totalCount: 1,
        currentPage: 1,
        maxPagesToDisplay: 5,
        shouldForceVisibilityOfFirstPageNumber: false,
      },
      cars: [],
    };
  },
  async created() {
    await this.getCars();
  },
  methods: {
    formatPrice,
    toggleFilteringSection(sectionIndex) {
      Vue.set(this.filtering.isSectionOpened, sectionIndex, !this.filtering.isSectionOpened[sectionIndex]);
    },
    toggleMobileFilterPanel() {
      this.filtering.isMobilePanelOpened = !this.filtering.isMobilePanelOpened;
    },
    async getCars() {
      try {
        const getCarsQuery = this.getCarsQuery();
        const carsWithCount = await this.$apollo.query(getCarsQuery);

        this.cars = carsWithCount.data.getCarsWithCount.cars;
        this.pagination.totalCount = carsWithCount.data.getCarsWithCount.count;
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);
        console.log(parsedError);
      }
    },
    getCarsQuery() {
      return {
        query: gql`
          {
            getCarsWithCount (
              pagination: {
                pageNumber: ${this.pagination.currentPage},
                pageSize: ${this.pagination.pageSize},
              },
            ) {
              cars {
                id,
                name,
                description,
                generation {
                  name,
                  startYear,
                  endYear,
                },
              },
              count,
            }
          }
        `,
      };
    },
    buildPaginationInfo() {
      const initialElementNumber = 1 + (this.pagination.pageSize * (this.pagination.currentPage - 1));
      const visibleElementsNumber = this.pagination.totalCount < this.pagination.pageSize
        ? this.pagination.totalCount
        : this.pagination.pageSize * this.pagination.currentPage;

      return `${initialElementNumber}-${visibleElementsNumber} of ${this.pagination.totalCount}`;
    },
    getPaginatedPages(
      totalItems,
      currentPage,
      pageSize = 10,
      maxPagesToDisplay = 5,
    ) {
      const totalPagesNumber = this.getTotalPagesNumber();
      const shouldDisplayStartingPages = totalPagesNumber <= maxPagesToDisplay;
      let startPage, endPage;

      this.setCurrentPageToBeInRange(totalPagesNumber, currentPage);

      if (shouldDisplayStartingPages) {
        startPage = 1;
        endPage = totalPagesNumber;
      } else {
        const maxPagesBeforeCurrentPage = Math.floor(maxPagesToDisplay / 2);
        const maxPagesAfterCurrentPage = Math.ceil(maxPagesToDisplay / 2) - 1;

        if (currentPage <= maxPagesBeforeCurrentPage) {
          startPage = 1;
          endPage = maxPagesToDisplay;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPagesNumber) {
          startPage = totalPagesNumber - maxPagesToDisplay + 1;
          endPage = totalPagesNumber;
        } else {
          startPage = currentPage - maxPagesBeforeCurrentPage;
          endPage = currentPage + maxPagesAfterCurrentPage;
        }
      }

      const isFirstPageNumberNotVisible = currentPage >= (maxPagesToDisplay / 2) + 1;
      this.pagination.shouldForceVisibilityOfFirstPageNumber = isFirstPageNumberNotVisible && totalPagesNumber > maxPagesToDisplay;

      return createArrayInRange(startPage, endPage);
    },
    setCurrentPageToBeInRange(currentPage, totalPagesNumber) {
      if (currentPage < 1) {
        currentPage = 1;
      }

      if (currentPage > totalPagesNumber) {
        currentPage = totalPagesNumber;
      }

      return currentPage;
    },
    setCurrentPageNumber(newPageNumber) {
      this.pagination.currentPage = newPageNumber;
    },
    getTotalPagesNumber() {
      return Math.ceil(this.pagination.totalCount / this.pagination.pageSize);
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
    min-height: calc(100vh - 50px);

    .filters {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100vw;
      height: 100vh;
      padding: 0 20px;
      position: fixed;
      left: -100%;
      top: 0;
      box-sizing: border-box;
      border-right: 1px solid $dark-gray;
      background: $concrete-gray;

      @media (min-width: $desktop-small) {
        flex: 1 1 25%;
        height: auto;
        position: static;
        max-width: 300px;
      }

      &--opened {
        left: 0;
      }

      &__close {
        @include cross(25px, 25px, $black);

        position: absolute;
        top: 30px;
        right: 20px;
        padding: 0;
        border: none;
        background: none;

        @media (min-width: $desktop-small) {
          display: none;
        }
      }

      &__wrapper {
        width: 100%;
        overflow: auto;
      }

      &__title {
        margin: 30px 0;
        text-align: left;
        font-size: 22px;
      }

      &__apply {
        @include button(90%, 50px);

        margin: 30px 0 20px;

        @media (min-width: $desktop-small) {
          display: none;
        }
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

      &__label {
        width: 100%;
        text-align: left;
      }
    }

    .search {
      flex: 1 1 75%;
      display: flex;
      flex-direction: column;
      padding: 0 10px;

      @media (min-width: $mobile-small) {
        padding: 0 15px;
      }

      @media (min-width: $mobile-big) {
        padding: 0 30px;
      }

      @media (min-width: $desktop-small) {
        height: auto;
        overflow: auto;
      }

      &--hidden {
        height: calc(100vh - 50px);
        overflow: hidden;

        @media (min-width: $desktop-small) {
          height: auto;
          overflow: auto;
        }
      }
    }

    .options {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin: 40px 0 10px;

      &__filter-open-button {
        @include button(90px, 35px);

        @media (min-width: $desktop-small) {
          display: none;
        }
      }

      @media (min-width: $desktop-small) {
        justify-content: right;
      }
    }

    .sort {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      &__select {
        width: 150px;
        height: 35px;
        margin-top: 5px;
        border: 2px solid $black;
        background: $white;
        font-size: 15px;

        @media (min-width: $desktop-small) {
          width: 200px;
        }
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
        border: 2px solid $light-gray;
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
        border: 1px solid $light-gray;
        border-right: none;
        border-left: none;
        font-size: 15px;
        color: $gray;
      }

      &__price {
        width: 100%;
        display: inline-block;
        margin: 30px 0;
        font-size: 20px;
        font-weight: bold;
        color: $dark-gray;
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

        &--active {
          color: $pink;
        }
      }
    }
  }
</style>
