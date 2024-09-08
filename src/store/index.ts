import { createStore } from 'vuex';
import axios from 'axios';
import { mockEmployees } from './mock/mockData';

const getEmployees = async () => {
    // Mock API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: mockEmployees });
        }, 500);
    });
};

const updateEmployee = async (id: number, data: any) => {
    // Mock API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({});
        }, 500);
    });
};

const deleteEmployee = async (id: number) => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
    }, 500);
  });
};


const store = createStore({
    state: {
        employees: [] as any[],
        items: [] as any[],
        selectedEmployee: null as any,
        isAdmin: false,
    },
    mutations: {
        setEmployees(state, employees) {
            state.employees = employees;
        },
        setItems(state, items) {
          state.items = items;
      },
        setSelectedEmployee(state, employee) {
            state.selectedEmployee = employee;
        },
        setAdmin(state, value) {
          state.isAdmin = value;
        }
    },
    actions: {
        async login({ commit }, payload) {
            try {
                // const response = await axios.post('/api/login', payload);
                // if (payload.isAdmin) {
                if (true) {
                  commit('setAdmin', true)
                  return true;
                } else {
                  commit('setAdmin', false)
                  return false;
                }
                // return true;
                // Handle successful login, e.g., commit a mutation or store user info
                // return response;
            } catch (error) {
                throw error; // Ensure error is thrown to be caught in component
            }
        },
        async fetchEmployees({ commit }, { page, limit }) {
            try {
                const response = await fetch(`https://your-api-endpoint/employees?page=${page}&limit=${limit}`, {
                    method: 'GET', // Or 'POST' if your API requires POST
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                commit('setEmployees', data);
            } catch (error) {
                console.error('Error fetching employees:', error);
                // Use mock data if API call fails
                commit('setEmployees', mockEmployees);
            }
        },
        async fetchItems({ commit }, { page, limit }) {
          try {
              const response = await fetch(`https://your-api-endpoint/items?page=${page}&limit=${limit}`, {
                  method: 'GET', // Or 'POST' if your API requires POST
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
              const data = await response.json();
              commit('setItems', data);
          } catch (error) {
              console.error('Error fetching items:', error);
              // Use mock data if API call fails
              commit('setItems', mockEmployees);
          }
      },
        async updateEmployee({ dispatch }, { id, data }) {
            try {
                await fetch(`https://your-api-endpoint/employees/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                dispatch('fetchEmployees', { page: 1, limit: 10 });
            } catch (error) {
                console.error('Error updating employee:', error);
            }
        },
        async deleteEmployee({ dispatch }, id: number) {
          try {
            await fetch(`https://your-api-endpoint/employees/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            dispatch('fetchEmployees', { page: 1, limit: 10 });
          } catch (error) {
            console.error('Error deleting employee:', error);
          }
        },
        selectEmployee({ commit }, employee) {
            commit('setSelectedEmployee', employee);
        },
    },
    getters: {
        employees: (state) => state.employees,
        items: (state) => state.items,
        selectedEmployee: (state) => state.selectedEmployee,
        isAdmin: (state) => state.isAdmin,
    },
});

export default store;
