<template>
  <section class="info-panel">
    <div class="info-panel__message">
      <p class="info-panel__text">{{ message }}</p>
    </div>
    <div class="info-panel__icon"></div>
  </section>
</template>

<script>
export default {
  name: 'InfoPanel',
  data() {
    return {
      message: 'Unknown message',
    };
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/colors';
  @import 'scss/variables/devices';
  @import 'scss/mixins/shapes';

  .info-panel {
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 100;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 700px;
    height: 50px;
    border: 1px solid $dark-red;
    border-radius: 5px;
    background: $light-pink;
    color: $dark-red;

    &__icon {
      flex-basis: 10%;
      width: 20px;
      height: 20px;
      margin-right: 20px;
      background-image: url('../assets/icons/error.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: right;

      @media (min-width: $tablet) {
        margin-right: 30px;
      }
    }

    &__message {
      flex-basis: 90%;
      margin-left: 20px;

      @media (min-width: $tablet) {
        margin-left: 30px;
      }
    }

    &__text {
      margin-right: 20px;
      text-align: left;
      font-size: 15px;
    }

    &--success {
      border: 1px solid $dark-green;
      border-radius: 5px;
      background: $light-green;
      color: $dark-green;
    }

    &--success &__icon  {
      background-image: url('../assets/icons/success.svg');
    }
  }
</style>
