import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';
import apolloProvider from './graphql';

Vue.config.productionTip = false;

Vue.use(VueApollo);

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
