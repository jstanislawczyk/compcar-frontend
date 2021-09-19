<template>
  <section class="cookie-banner">
    <div class="cookie-banner__message">
      <span>By continuing to browse this website you agree to use cookies to identify your settings</span>
    </div>
    <div
      v-on:click="closeCookieBanner()"
      class="cookie-banner__close"
    >
      <div class="cookie-banner__cross">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CookieBanner',
  data() {
    return {
      message: 'Unknown message',
      panelType: 'success',
    };
  },
  methods: {
    closeCookieBanner() {
      this.$store.commit('closeCookieBanner');
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/colors';
  @import 'scss/variables/devices';
  @import 'scss/mixins/shapes';

  .cookie-banner {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    background: $black;

    @media (min-width: $desktop-small) {
      font-size: 15px;
    }

    &__message {
      display: flex;
      align-items: center;
      flex-basis: 90%;
      padding: 0 10px;
      color: $white;
      font-size: 14px;

      @media (min-width: $desktop-small) {
        padding: 0 10px 0 15px;
      }
    }

    &__close {
      position: relative;
      flex-basis: 10%;
    }

    &__cross {
      @include cross();

      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(-50%,-50%);

      @media (min-width: $tablet) {
        right: 5px;
      }

      @media (min-width: $desktop-small) {
        right: 10px;
      }
    }
  }
</style>
