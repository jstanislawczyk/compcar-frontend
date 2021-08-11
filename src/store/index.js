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
  },
  mutations: {
    toggleInfoPanel(state, payload) {
      this.state.infoPanel.message = payload.message || 'Unknown message';
      this.state.infoPanel.type = payload.type || 'success';
      this.state.infoPanel.isOpened = true;

      setTimeout(() => {
        this.state.infoPanel.isOpened = false;
      }, 3000);
    },
  },
  actions: {
  },
  modules: {
  },
});
