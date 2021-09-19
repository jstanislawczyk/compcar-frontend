<template>
  <div id="app">
    <InfoPanel></InfoPanel>
    <Nav />
    <Main />
    <CookieBanner v-if="!$store.state.cookieBanner.isClosed"/>
  </div>
</template>

<script>
import InfoPanel from '@/components/InfoPanel';
import Nav from '@/components/Nav.vue';
import Main from '@/components/Main.vue';
import CookieBanner from '@/components/CookieBanner.vue';

export default {
  name: 'App',
  components: {
    InfoPanel,
    Nav,
    Main,
    CookieBanner,
  },
  mounted() {
    this.$store.commit('initAuthToken');
    this.$store.commit('initCookieBanner');
  },
};
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  #app {
    height: 100%;
    min-height: 100vh;
    width: 100%;
  }
</style>
