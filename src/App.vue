<template>
  <div id="app">
    <InfoPanel></InfoPanel>
    <Nav />
    <Main />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Main from '@/components/Main.vue';
import InfoPanel from '@/components/InfoPanel';

export default {
  name: 'App',
  components: {
    InfoPanel,
    Nav,
    Main,
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
