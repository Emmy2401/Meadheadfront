import axios from "axios";

const apiHospitals = axios.create({
  baseURL: "http://localhost:8085/hospitals", // Base pour les hôpitaux
  headers: {
    "Content-Type": "application/json"
  },
  //withCredentials: true
});

// Ajouter automatiquement le token aux requêtes
apiHospitals.interceptors.request.use(config => {
  const token = localStorage.getItem("token"); // Vérifie si le token est bien stocké
  if (token) {
    config.headers["X-User-Role"] = "ROLE_USER";
    console.log(" Token envoyé :", token); // DEBUG : Vérifier que le token est bien lu
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn(" Aucun token trouvé, requête non authentifiée !");
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiHospitals;
