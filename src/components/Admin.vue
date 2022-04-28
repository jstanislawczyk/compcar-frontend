<template>
  <section class="admin">
    <div class="management" v-bind:class="{ 'management--opened': management.isMobilePanelOpened }">
      <div class="management__wrapper">
        <h3 class="management__title">Management</h3>
        <router-link to="/admin/users" class="management__link">Users</router-link>
        <router-link to="/admin/colors" class="management__link">Colors</router-link>
        <button v-on:click="toggleMobileManagementPanel()" class="management__close"></button>
      </div>
    </div>

    <div class="management-panel" v-bind:class="{ 'search--hidden': management.isMobilePanelOpened }">
      <div class="options">
        <button v-on:click="toggleMobileManagementPanel()" class="options__filter-open-button">Select section</button>
      </div>
      <router-view />
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
  @import 'scss/mixins/controls';

  .admin {
    @include search-page;

    .management {
      @include search-page-left-panel;

      text-align: left;

      &__link {
        @include link-no-underline($black, $pink, 20px);

        margin: 20px 0;
        transition: padding-left 300ms ease-in-out;

        &:hover {
          padding-left: 10px;
        }
      }
    }

    .management-panel {
      @include search-page-content;
    }
  }
</style>
