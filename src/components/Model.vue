<template>
  <section class="model">
    <h2 class="model__name">Audi A4</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus orci orci, ut blandit mi aliquam eget. Suspendisse faucibus mi sed ligula finibus, et imperdiet tellus dignissim.
      In hac habitasse platea dictumst. Donec volutpat efficitur ipsum faucibus consectetur. Nam a felis lectus. In in efficitur lorem. Aenean et leo justo. Cras sed laoreet tellus.
      Sed et eros in magna luctus pulvinar. Suspendisse nunc metus, tincidunt non libero pharetra, semper placerat diam. Pellentesque tristique magna sed mi consequat luctus. Nullam at tortor leo.
    </p>

    <div class="generations">
      <h3 class="generations__status">Available</h3>
      <div class="generations__tiles">
        <div class="generation" v-for="number in [1,2,3]" :key="number">
          <img class="generation__image" src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png" alt="Car photo" />
          <div class="generation__info">
            <span class="generation__name">A4 B6</span>
            <div class="generation__details">
                <span class="generation__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus orci orci, ut blandit mi aliquam eget. Suspendisse faucibus mi sed ligula finibus, et imperdiet tellus dignissim.
                  In hac habitasse platea dictumst. Donec volutpat efficitur ipsum faucibus consectetur.
                </span>
              <span class="generation__generations">
                  Available body types: Sedan, Kombi
                </span>
            </div>
            <span class="generation__price">100 000zł</span>

            <router-link :to="`/generation/${1}`" class="generation__link" tag="button">Check cars</router-link>
          </div>
        </div>
      </div>

      <h3 class="generations__status">Withdrawn</h3>
      <div class="generations__tiles">
        <div class="generation">
          <img class="generation__image" src="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png" alt="Car photo" />
          <div class="generation__info">
            <span class="generation__name">A4 B6</span>
            <div class="generation__details">
                <span class="generation__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus orci orci, ut blandit mi aliquam eget. Suspendisse faucibus mi sed ligula finibus, et imperdiet tellus dignissim.
                  In hac habitasse platea dictumst. Donec volutpat efficitur ipsum faucibus consectetur.
                </span>
              <span class="generation__generations">
                  Available body types: Sedan, Kombi
                </span>
            </div>
            <span class="generation__price">100 000zł</span>

            <router-link :to="`/generation/${1}`" class="generation__link" tag="button">Check cars</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Model',
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/colors';
  @import 'scss/variables/devices';
  @import 'scss/mixins/controls';

  .model {
    min-height: calc(100vh - 50px);
    padding: 30px 5% 20px;
    text-align: left;

    @media (min-width: $desktop-small) {
      padding: 30px 10% 20px;
    }

    @media (min-width: $desktop-medium) {
      padding: 30px 15% 20px;
    }

    &__name {
      font-size: 50px;
    }
  }

  .generations {
    margin-top: 50px;

    &__status {
      margin: 40px 0 20px;
    }

    &__tiles {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 40px 30px;
      margin: 30px 0;

      @media (min-width: $desktop-small) {
        grid-template-columns: repeat(auto-fit, minmax(300px, .33fr));
      }
    }
  }

  .generation {
    text-align: center;

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
      text-align: left;
      font-size: 15px;
      color: $gray;
    }

    &__description {
      display: block;
      margin-bottom: 30px;
    }

    &__price {
      width: 100%;
      display: inline-block;
      margin: 30px 0;
      font-size: 20px;
      font-weight: bold;
      color: $dark-gray;

      &--small {
        font-size: 16px;
      }
    }

    &__link {
      @include button(170px);

      margin-bottom: 15px;
    }
  }
</style>
