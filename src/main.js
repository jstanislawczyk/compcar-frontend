import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

Vue.config.productionTip = false;

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'http://localhost:4000',
  }),
});

Vue.use(VueApollo);

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
