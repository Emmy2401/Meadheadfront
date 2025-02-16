import axios from "axios";

const apiUsers = axios.create({
  baseURL: "http://localhost:8082/api/users", // Base pour les utilisateurs
  headers: {
    "Content-Type": "application/json"
  }
});

// Ajouter automatiquement le token aux requêtes
apiUsers.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiUsers;
