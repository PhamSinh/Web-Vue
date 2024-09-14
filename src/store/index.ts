import { createStore } from 'vuex';

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
        async fetchEmployees({ commit }: any, { page, limit } : any) {
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
                commit('setEmployees', Array.from({ length: 20 }, (_, index) => ({
                    id: index + 1,
                    name: `App ${index + 1}`,
                    position: `Dev ${index + 1}`,
                    email: `app${index + 1}@example.com`
                })));
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
              commit('setItems', Array.from({ length: 20 }, (_, index) => ({
                id: index + 1,
                name: `App ${index + 1}`,
                position: `Dev ${index + 1}`,
                email: `app${index + 1}@example.com`
            })));
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
        async deleteEmployee({ dispatch } : any, id: number) {
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
        selectEmployee({ commit }: any, employee: any) {
            commit('setSelectedEmployee', employee);
        },
    },
    getters: {
        employees: (state: any) => state.employees,
        items: (state: any) => state.items,
        selectedEmployee: (state: any) => state.selectedEmployee,
        isAdmin: (state: any) => state.isAdmin,
    },
});

export default store;
