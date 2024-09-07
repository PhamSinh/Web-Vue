import { Module } from 'vuex';

interface LoginState {
  username: string;
  password: string;
  rememberMe: boolean;
}

const login: Module<LoginState, any> = {
  namespaced: true,
  state: () => ({
    username: '',
    password: '',
    rememberMe: false,
  }),
  mutations: {
    setUsername(state, username: string) {
      state.username = username;
    },
    setPassword(state, password: string) {
      state.password = password;
    },
    setRememberMe(state, rememberMe: boolean) {
      state.rememberMe = rememberMe;
    },
    clearLoginData(state) {
      state.username = '';
      state.password = '';
    },
  },
  actions: {
    saveLoginData({ state }) {
      if (state.rememberMe) {
        localStorage.setItem('loginData', JSON.stringify({
          username: state.username,
          password: state.password,
        }));
      } else {
        localStorage.removeItem('loginData');
      }
    },
  },
};

export default login;
