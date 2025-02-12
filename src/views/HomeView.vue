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
  
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      handleLogin() {
        console.log("Email:", this.email);
        console.log("Mot de passe:", this.password);
        alert("Connexion en cours...");
        // Ici, tu pourras ajouter la logique de connexion (API, authentification, etc.)
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
  
  button:hover {
    background-color: #369f74;
  }
  </style>
  