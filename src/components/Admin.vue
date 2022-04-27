<template>
  <section class="admin">
    <div class="management" v-bind:class="{ 'management--opened': management.isMobilePanelOpened }">
      <div class="management__wrapper">
        <h3 class="management__title">Management</h3>
        <button v-on:click="toggleMobileManagementPanel()" class="management__close"></button>
      </div>
    </div>

    <div class="management-panel" v-bind:class="{ 'search--hidden': management.isMobilePanelOpened }">
      <div class="options">
        <button v-on:click="toggleMobileManagementPanel()" class="options__filter-open-button">Select section</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      management: {
        isMobilePanelOpened: false,
      },
    };
  },
  methods: {
    toggleMobileManagementPanel() {
      this.management.isMobilePanelOpened = !this.management.isMobilePanelOpened;
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/colors';
  @import 'scss/variables/devices';
  @import 'scss/mixins/controls';
  @import 'scss/mixins/shapes';

  .admin {
    display: flex;
    min-height: calc(100vh - 50px);

    .management {
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

    .management-panel {
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
  }
</style>
