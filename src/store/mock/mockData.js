export const mockEmployees = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Sinh ${index + 1}`,
    position: `Dev ${index + 1}`,
    email: `sinhpv${index + 1}@example.com`
}));