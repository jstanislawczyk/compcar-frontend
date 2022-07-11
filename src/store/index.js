import Vue from 'vue';
import Vuex from 'vuex';
import jwtDecode from 'jwt-decode';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    infoPanel: {
      isOpened: false,
      type: '',
      message: '',
    },
    cookieBanner: {
      isClosed: false,
    },
    authentication: {
      token: undefined,
    },
  },
  getters: {
    getAuthToken(state) {
      let token = state.authentication.token;

      if (!token) {
        const cachedToken = localStorage.getItem('authToken');
        token = cachedToken || undefined;
      }

      if (token) {
        const decodedToken = jwtDecode(token);
        const isTokenExpired = decodedToken.exp < (Date.now() / 1000);

        if (isTokenExpired) {
          localStorage.removeItem('authToken');
          token = undefined;
        }
      }

      state.authentication.token = token;

      return state.authentication.token;
    },
  },
  mutations: {
    toggleInfoPanel(state, infoPanelData) {
      this.state.infoPanel.message = infoPanelData.message || 'Unknown message';
      this.state.infoPanel.type = infoPanelData.type || 'success';
      this.state.infoPanel.isOpened = true;

      setTimeout(() => {
        this.state.infoPanel.isOpened = false;
      }, 3000);
    },
    initAuthToken() {
      if (!this.state.authentication.token) {
        const cachedToken = localStorage.getItem('authToken');
        this.state.authentication.token = cachedToken || undefined;
      }
    },
    setAuthToken(state, token) {
      localStorage.setItem('authToken', token);
      this.state.authentication.token = token;
    },
    logoutUser() {
      localStorage.removeItem('authToken');
      this.state.authentication.token = undefined;
    },
    initCookieBanner() {
      if (!this.state.cookieBanner.isClosed) {
        const isCookieBannerClosed = localStorage.getItem('isCookieBannerClosed');
        this.state.cookieBanner.isClosed = isCookieBannerClosed === 'true';
      }
    },
    closeCookieBanner() {
      this.state.cookieBanner.isClosed = true;
      localStorage.setItem('isCookieBannerClosed', 'true');
    },
  },
  actions: {
  },
  modules: {
  },
});
