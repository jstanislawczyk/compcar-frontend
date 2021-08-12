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
    setAuthToken(state, token) {
      this.state.authentication.token = token;
    },
  },
  actions: {
  },
  modules: {
  },
});
