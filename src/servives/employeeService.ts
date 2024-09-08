import axios from 'axios';

const apiUrl = 'http://example.com/api/employees'; // Thay thế bằng URL API thực tế

export const getEmployees = () => axios.get(apiUrl);
export const updateEmployee = (id: number, data: any) => axios.put(`${apiUrl}/${id}`, data);
