import { defineStore } from 'pinia';

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCount: (state: any) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++;
    },
    decrement() {
      this.counter--;
    }
  }
});
