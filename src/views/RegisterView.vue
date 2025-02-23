<template>
  <div class="container">
    <h1>Inscription</h1>

    <form @submit.prevent="handleRegister">
      <!-- Email (Username) -->
      <div class="form-group">
        <label for="username">Email :</label>
        <input 
          type="email" 
          id="username" 
          v-model="username" 
          required
          placeholder="Entrez votre email"
        />
        <span v-if="errors.username" class="error">{{ errors.username }}</span>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
          placeholder="Au moins 6 caractères"
        />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>

      <!-- Bouton Inscription -->
      <button type="submit" :disabled="loading">
        {{ loading ? "Inscription..." : "S'inscrire" }}
      </button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>

    <!-- Lien vers Connexion -->
    <p>Déjà un compte ? <router-link to="/">Se connecter</router-link></p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      errors: {},
      errorMessage: "",
      loading: false
    };
  },
  methods: {
    async handleRegister() {
      this.errors = {};
      this.errorMessage = "";

      //  Validation Email
      if (!this.username.trim()) {
        this.errors.username = "L'email est requis.";
      } else if (!this.validateEmail(this.username)) {
        this.errors.username = "Veuillez entrer une adresse email valide.";
      }

      //  Validation Password
      if (!this.password.trim()) {
        this.errors.password = "Le mot de passe est requis.";
      } else if (this.password.length < 6) {
        this.errors.password = "Le mot de passe doit faire au moins 6 caractères.";
      }

      //  Arrête si des erreurs de validation sont présentes
      if (Object.keys(this.errors).length > 0) return;

      this.loading = true; // Désactiver le bouton pendant l'inscription

      try {
        // Envoi des données à l'API Users `/register`
        const response = await axios.post("http://localhost:8082/api/users/register", {
          username: this.username,
          password: this.password
        });

        //  Stocker le token JWT retourné par l'API
        localStorage.setItem("token", response.data.token);

        //  Rediriger vers le profil après inscription réussie
        this.$router.push("/me");
      } catch (error) {
        this.errorMessage = "Erreur lors de l'inscription. Cet email est peut-être déjà utilisé.";
      } finally {
        this.loading = false; // Réactiver le bouton
      }
    },

    //  Fonction pour valider un email
    validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
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

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #d9e2ec;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #2a9d8f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover {
  background-color: #42b983;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
