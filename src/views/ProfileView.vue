<template>
  <div class="container">
    <h1>Profil</h1>

    <p v-if="loading">Chargement du profil...</p>
    <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div v-else>
      <p>Bonjour, vous êtes connecté en tant que : <strong>{{ username }}</strong></p>
      <p>Votre rôle : <strong>{{ role }}</strong></p>

      <router-link to="/hospitals" class="hospital-link">🔙 Retour à la gestion des hôpitaux</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
        this.$router.push("/"); //  Redirection si pas de token
        return;
      }

      // 🔹 Récupération des infos utilisateur avec le token
      const response = await axios.get("http://localhost:8082/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      this.username = response.data.username;
      this.role = response.data.role;

    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error.response ? error.response.data : error.message);
      this.errorMessage = "Session expirée. Veuillez vous reconnecter.";
      localStorage.removeItem("token"); //  Suppression du token si erreur
      this.$router.push("/login"); //  Redirection vers connexion
    } finally {
      this.loading = false;
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

.hospital-link {
  display: inline-block;
  padding: 10px 15px;
  background-color: #2a9d8f;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
}

.hospital-link:hover {
  background-color: #42b983;
}

.error {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>
