<template>
  <div class="container">
    <h1>Bienvenue</h1>
    <p>Connectez-vous ou <router-link to="/register">inscrivez-vous</router-link>.</p>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Connexion..." : "Se connecter" }}
      </button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      errorMessage: ""
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = "";

      try {
        const response = await axios.post("http://localhost:8082/api/users/login", {
          username: this.email,
          password: this.password
        });

        console.log("Token reçu :", response.data.token);

        // 🔹 Stocker le token dans localStorage
        localStorage.setItem("token", response.data.token);

        // 🔹 Redirection vers la page de profil après connexion
        this.$router.push("/me");

      } catch (error) {
        this.errorMessage = "Email ou mot de passe incorrect.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover {
  background-color: #369f74;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
