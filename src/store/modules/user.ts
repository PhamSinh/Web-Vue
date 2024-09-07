// Có thể thêm các trạng thái và mutations cho user sau
import { Module } from 'vuex';

const user: Module<any, any> = {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {},
};

export default user;
