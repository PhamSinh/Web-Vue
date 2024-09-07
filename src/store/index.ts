import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    // Define your state here
  },
  mutations: {
    // Define your mutations here
  },
  actions: {
    async login({ commit }, payload) {
      try {
        // const response = await axios.post('/api/login', payload);
        return true;
        // Handle successful login, e.g., commit a mutation or store user info
        // return response;
      } catch (error) {
        throw error; // Ensure error is thrown to be caught in component
      }
    },
  },
  getters: {
    // Define your getters here
  },
});

export default store;
