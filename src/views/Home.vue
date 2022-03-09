<template>
  <section class="home">
    <div class="about">
      <div>
        <h1 class="about__title">Find the car of your dream</h1>
        <p class="about__text">
          Have you ever wanted to find a car that best suits your requirements,
          but the many brands, types and options made the choice difficult?
          <br /><br />
          Compcarly is simple car search engine that allows you to find the best
          matching car based on your requirements
        </p>
      </div>

      <router-link to="/models-search" class="about__button" tag="button">Search</router-link>
    </div>
    <div class="features">
      <h2 class="features__title">Customize your requirements</h2>

      <div class="features__tiles">
        <div class="feature">
          <img class="feature__image" src="@/assets/images/world.png" alt="Planet"/>
          <p class="feature__description">
            Do you prefer german perfection or italian style? Choose any brand from all around the globe that fits your needs
          </p>
        </div>

        <div class="feature">
          <img class="feature__image" src="@/assets/images/car-engine.png" alt="Car engine"/>
          <p class="feature__description">
            Do you like gasoline or diesel engines? Or maybe an electric car is your choice? Select preferred fuel type and engine capacity
          </p>
        </div>

        <div class="feature">
          <img class="feature__image" src="@/assets/images/money.png" alt="Dollar sign"/>
          <p class="feature__description">
            Decide how much money you want to spend and find cars that you can afford
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss">
  @import 'scss/variables/colors';
  @import 'scss/variables/devices';
  @import 'scss/mixins/controls';

  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .about {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 60vh;
    padding: 0 5%;

    @media (min-width: $tablet) {
      padding: 0 15%;
    }

    @media (min-width: $desktop-small) {
      padding: 0 20%;
    }

    &__title {
      font-size: 50px;
      font-weight: normal;
    }

    &__text {
      text-align: justify;
    }

    &__button {
      @include button(250px, 50px);

      margin: 40px 0;
      font-size: 18px;
    }
  }

  .features {
    width: 100%;
    background: $concrete-gray;

    &__title {
      margin: 50px 5%;
      font-size: 30px;
      font-weight: normal;
    }

    &__tiles {
      display: flex;
      flex-direction: column;
      align-items: center;

      @media (min-width: $desktop-small) {
        flex-direction: row;
        justify-content: space-around;
        margin: 30px 0;
      }
    }
  }

  .feature {
    margin: 30px 0;
    width: 50%;
    max-width: 250px;

    &__image {
      width: 100%;
    }

    &__description {
      font-size: 17px;
      text-align: left;
    }
  }
</style>
