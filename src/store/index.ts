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

const store = createStore({
    state: {
        employees: [] as any[],
        selectedEmployee: null as any,
    },
    mutations: {
        setEmployees(state, employees) {
            state.employees = employees;
        },
        setSelectedEmployee(state, employee) {
            state.selectedEmployee = employee;
        },
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
        selectEmployee({ commit }, employee) {
            commit('setSelectedEmployee', employee);
        },
    },
    getters: {
        employees: (state) => state.employees,
        selectedEmployee: (state) => state.selectedEmployee,
    },
});

export default store;
