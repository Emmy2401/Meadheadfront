<template>
    <div class="container">
      <h1>Profil</h1>
      <p>Bonjour, vous êtes connecté en tant que : <strong>{{ username }}</strong></p>
  
      <!-- Lien vers la gestion des hôpitaux -->
      <router-link to="/hospitals" class="hospital-link">🔙 Retour à la gestion des hôpitaux</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "utilisateur@example.com", // ✅ À remplacer par la donnée réelle plus tard
      };
    },
    created() {
      // ✅ ICI tu pourras récupérer le username depuis l'API ou le store plus tard
      // Exemple futur :
      // axios.get("https://ton-api.com/api/me")
      // .then(response => { this.username = response.data.username; })
      // .catch(error => { console.error(error); });
  
      // ✅ Simuler une récupération du username (à modifier plus tard)
      this.username = "john.doe@example.com";
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
  </style>
  