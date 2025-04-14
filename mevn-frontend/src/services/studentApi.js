import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/students",
});

export default {
    getStudents(page = 1, limit = 10) {
        return API.get(`?page=${page}&limit=${limit}`);
    },
    getStudent: (id) => API.get(`/${id}`),
    createStudent: (data) => API.post("/", data),
    updateStudent: (id, data) => API.put(`/${id}`, data),
    deleteStudent: (id) => API.delete(`/${id}`),
};
