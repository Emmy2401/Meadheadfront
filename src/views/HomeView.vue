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
import apiUsers from "../api/axiosUsers"; // On utilise l'API users

export default {
  data() {
    return {
      email: "",
      password: "",
      loginType: "user",
      loading: false,
      errorMessage: ""
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = "";

      const loginURL = this.loginType === "user" ? "/login" : "http://localhost:8085/hospitals/login";

      try {
        const response = this.loginType === "user"
          ? await apiUsers.post(loginURL, { username: this.email, password: this.password })
          : await apiHospitals.post(loginURL, { username: this.email, password: this.password });

        console.log("Token reçu :", response.data.token);

        localStorage.setItem("token", response.data.token);

        if (this.loginType === "user") {
          this.$router.push("/me"); // Page utilisateur
        } else {
          this.$router.push("/hospitals"); // Page hôpital
        }
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
