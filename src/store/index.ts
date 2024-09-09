import { createStore } from 'vuex';
// import axios from 'axios';
import { mockEmployees } from './mock/mockData.js';


const store = createStore({
    state: {
        employees: [] as any[],
        items: [] as any[],
        selectedEmployee: null as any,
        isAdmin: false,
    },
    mutations: {
        setEmployees(state: any, employees: any) {
            state.employees = employees;
        },
        setItems(state: any, items: any) {
          state.items = items;
      },
        setSelectedEmployee(state: any, employee: any) {
            state.selectedEmployee = employee;
        },
        setAdmin(state: any, value: any) {
          state.isAdmin = value;
        }
    },
    actions: {
        // async login({ commit } : any : any, payload: any) {
            async login({ commit } : any) {
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
        async fetchEmployees({ commit } : any, { page, limit }: any) {
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
        async fetchItems({ commit } : any, { page, limit } : any) {
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
        async updateEmployee({ dispatch }: any, { id, data }: any) {
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
        async deleteEmployee({ dispatch }: any, id: number) {
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
        selectEmployee({ commit } : any, employee: any) {
            commit('setSelectedEmployee', employee);
        },
    },
    getters: {
        employees: (state: any) => state.employees,
        items: (state: any) => state.items,
        selectedEmployee: (state: any) => state.selectedEmployee,
        isAdmin: (state:any) => state.isAdmin,
    },
});

export default store;
