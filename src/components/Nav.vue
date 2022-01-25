<template>
  <nav class="nav">
    <div class="nav__main">
      <div class="nav__logo">
        <router-link to="/" class="nav__link nav__link--logo">Compcarly</router-link>
      </div>

      <div class="nav__links">
        <div class="nav__button">
          <router-link to="/" class="nav__link nav__link--underlined">Home</router-link>
        </div>
        <div class="nav__button" v-if="!this.isAuthenticated()">
          <router-link to="/register" class="nav__link nav__link--underlined">Register</router-link>
        </div>
        <div class="nav__button" v-if="!this.isAuthenticated()">
          <router-link to="/login" class="nav__link nav__link--underlined">Login</router-link>
        </div>
        <div class="nav__button" v-if="this.isAuthenticated()">
          <button class="nav__link nav__link--underlined" v-on:click="logoutUser()">Logout</button>
        </div>
      </div>

      <div v-on:click="toggleMobileMenu" class="nav__toggle nav__toggle--mobile">
        <div v-if="isMobileMenuClosed" class="nav__hamburger">
          <div class="nav__bar"></div>
          <div class="nav__bar"></div>
          <div class="nav__bar"></div>
        </div>
        <div v-else class="nav__cross"></div>
      </div>
    </div>

    <div v-if="!isMobileMenuClosed" class="nav__links nav__links--mobile">
      <div class="nav__button">
        <router-link to="/" class="nav__link">Home</router-link>
      </div>
      <div class="nav__button" v-if="!this.isAuthenticated()">
        <router-link to="/register" class="nav__link">Register</router-link>
      </div>
      <div class="nav__button" v-if="!this.isAuthenticated()">
        <router-link to="/login" class="nav__link">Login</router-link>
      </div>
      <div class="nav__button" v-if="this.isAuthenticated()">
        <button class="nav__link">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import authMixin from '@/mixins/auth.mixin';

export default {
  name: 'Nav',
  mixins: [
    authMixin,
  ],
  data() {
    return {
      isMobileMenuClosed: true,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuClosed = !this.isMobileMenuClosed;
    },
    async logoutUser() {
      this.$store.commit('logoutUser');
      await this.$router.push('/').catch(() => {});
      this.$store.commit('toggleInfoPanel', {
        message: 'User logged out successfully',
        type: 'success',
      });
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/variables/colors';
  @import 'scss/variables/devices';
  @import 'scss/mixins/shapes';

  .nav {
    &__main {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: 0 20px;
      height: 50px;
      background: $dark-grey;

      @media (min-width: $tablet)  {
        height: 70px;
      }

      @media (min-width: $desktop-small)  {
        height: 50px;
        justify-content: space-between;
      }
    }

    &__links {
      display: none;

      @media (min-width: $desktop-small)  {
        display: flex;
      }

      &--mobile {
        display: flex;
        justify-content: space-around;
        background: $dark-grey;
        padding: 20px 0 10px;

        @media (min-width: $desktop-small)  {
          display: none;
        }
      }
    }

    &__toggle {
      display: none;

      @media (min-width: $desktop-small)  {
        display: flex;
      }

      &--mobile {
        display: flex;

        @media (min-width: $desktop-small)  {
          display: none;
        }
      }
    }

    &__link {
      background: none;
      border: none;
      font-size: 16px;
      color: $white;
      text-decoration: none;
      cursor: pointer;

      &--logo {
        font-size: 22px;

        @media (min-width: $tablet)  {
          font-size: 30px;
        }

        @media (min-width: $desktop-small)  {
          font-size: 22px;
        }
      }

      &--underlined {
        display: block;
        position: relative;
        padding: .2em 0;
        overflow: hidden;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: $white;
          transition: opacity 300ms, transform 300ms;
          opacity: 1;
          transform: translate3d(-100%, 0, 0);
        }

        &:hover, &:focus {
          &::after {
            transform: translate3d(0, 0, 0);
          }
        }
      }
    }

    &__button {
      @media (min-width: $desktop-small)  {
        &:not(:last-child) {
          margin-right: 30px;
        }
      }
    }

    &__hamburger {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 25px;
      height: 20px;
      cursor: pointer;
    }

    &__bar {
      width: 100%;
      height: 2px;
      background: $white;
    }

    &__cross {
      @include cross();

      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>
