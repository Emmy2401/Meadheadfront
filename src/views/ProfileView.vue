<template>
  <div class="container">
    <h1>Profil Utilisateur</h1>

    <p v-if="loading">Chargement du profil...</p>
    <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div v-else>
      <p>Bonjour, <strong>{{ username }}</strong></p>
      <p>Votre rôle : <strong>{{ role }}</strong></p>

      <button @click="logout" class="logout-button">Se déconnecter</button>
    </div>
  </div>
</template>

<script>
import apiUsers from "../api/axiosUsers"; // API uniquement pour "Users"

export default {
  data() {
    return {
      username: "",
      role: "",
      loading: true,
      errorMessage: ""
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        this.errorMessage = "Vous devez être connecté.";
        this.$router.push("/"); // Redirection si pas de token
        return;
      }

      // 🔹 Appel uniquement au microservice "Users"
      const response = await apiUsers.get("/me");

      this.username = response.data.username;
      this.role = response.data.role;

    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error.response ? error.response.data : error.message);
      this.errorMessage = "Session expirée. Veuillez vous reconnecter.";
      this.logout(); // Déconnecter en cas d'erreur
    } finally {
      this.loading = false;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token"); // Supprimer le token
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #134074;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
}

.logout-button {
  display: inline-block;
  padding: 10px 15px;
  margin-top: 10px;
  background-color: #d9534f;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  border: none;
}

.logout-button:hover {
  background-color: #c9302c;
}

.error {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>
