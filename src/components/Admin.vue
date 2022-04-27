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
  @import 'scss/mixins/pages';

  .admin {
    @include search-page;

    .management {
      @include search-page-left-panel;
    }

    .management-panel {
      @include search-page-content;
    }
  }
</style>
