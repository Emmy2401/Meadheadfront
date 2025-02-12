<template>
    <div class="container">
      <h1>Liste des Hôpitaux</h1>
  
      <!-- Bouton Ajouter -->
      <router-link to="/add-hospital" class="add-button">➕ Ajouter un Hôpital</router-link>
  
      <!-- Tableau des hôpitaux -->
      <table>
        <thead>
          <tr>
            <th>Nom de l'Hôpital</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hospital, index) in hospitals" :key="index">
            <td>{{ hospital.name }}</td>
            <td>
              <router-link :to="`/update-hospital/${hospital.id}`" class="update-button">✏️ Modifier</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // ✅ Données Fake pour le moment (à connecter à l'API plus tard)
        hospitals: [
          { id: 1, name: "Hôpital Saint-Louis" },
          { id: 2, name: "Centre Hospitalier Universitaire" },
          { id: 3, name: "Clinique Pasteur" },
        ],
      };
    },
    methods: {
      addHospital() {
        alert("Redirection vers la page d'ajout d'hôpital (à implémenter)");
        // ✅ Plus tard, on utilisera : this.$router.push('/add-hospital');
      },
      updateHospital(id) {
        alert(`Modifier l'hôpital avec ID ${id} (à implémenter)`);
        // ✅ Plus tard, on utilisera : this.$router.push(`/update-hospital/${id}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h1 {
    color: #134074;
    margin-bottom: 20px;
  }
  
  .add-button {
    background-color: #2a9d8f;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .add-button:hover {
    background-color: #42b983;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #d9e2ec;
    text-align: left;
  }
  
  th {
    background-color: #134074;
    color: white;
  }
  
  .update-button {
    background-color: #f39c12;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .update-button:hover {
    background-color: #e67e22;
  }
  </style>
  