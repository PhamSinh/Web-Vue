import { createStore } from 'vuex';
import login from './modules/login';
import user from './modules/user';

const store = createStore({
  modules: {
    login,
    user,
  },
});

export default store;
