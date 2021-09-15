import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    infoPanel: {
      isOpened: false,
      type: '',
      message: '',
    },
    authentication: {
      token: undefined,
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
  },
  actions: {
  },
  modules: {
  },
});
