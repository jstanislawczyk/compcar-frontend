import jwtDecode from 'jwt-decode';

export default {
  methods: {
    isAdmin: function() {
      return this.isAuthenticated() && this.getUserRole(this.$store.state.authentication.token) === 'ADMIN';
    },
    isAuthenticated: function() {
      return this.$store.state.authentication.token?.length > 0;
    },
    getUserRole: function(token) {
      return jwtDecode(token).role;
    },
  },
};
