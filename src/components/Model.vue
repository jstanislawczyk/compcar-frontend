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
  @import 'scss/mixins/tiles';

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
      @include tiles-grid;
    }
  }

  .generation {
    @include tile;
  }
</style>
