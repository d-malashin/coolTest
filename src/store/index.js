import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedAdress: '',
    previouslyEntered: [],
  },
  mutations: {
    SET_ADRESS(state, value) {
      state.selectedAdress = value;
    },
    ADD_TO_PREVIOUSLY_ENTERED(state, value) {
      if (state.previouslyEntered.filter((e) => e.displayName === value).length > 0) {
        return;
      }
      state.previouslyEntered.push({ displayName: value, value });
    },
    SET_PREVIOUSLY_ENTERED(state, value) {
      state.previouslyEntered = value;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    selectedAdress(state) {
      return state.selectedAdress;
    },
    previouslyEntered(state) {
      return state.previouslyEntered;
    },
  },
});
