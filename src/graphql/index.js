import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';
import Vue from 'vue';

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: process.env.graphqlUrl || 'http://localhost:4000',
  }),
});

Vue.use(VueApollo);

export default apolloProvider;
