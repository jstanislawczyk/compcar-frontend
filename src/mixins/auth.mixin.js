export default {
  methods: {
    isAuthenticated: function() {
      return this.$store.state.authentication.token?.length > 0;
    },
  },
};
