import { createApp } from 'vue'
import './assets/global.css';
import App from './App.vue'
import router from './router';
import axios from "axios"; 

axios.defaults.baseURL = "http://localhost:8082/api"; 

axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  ); 

  router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("token"); // Vérifie si un token est présent
  
    if (to.meta.requiresAuth && !isAuthenticated) {
      next("/"); // Redirige vers la page de login si non connecté
    } else {
      next(); // Autorise l'accès sinon
    }
  }); 

  router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("token"); // Vérifie si un token est présent
  
    if (to.meta.requiresAuth && !isAuthenticated) {
      next("/"); // Redirige vers la page de connexion si non connecté
    } else {
      next(); // Autorise l'accès sinon
    }
  });

const app = createApp(App);

app.use(router);
app.mount('#app');
