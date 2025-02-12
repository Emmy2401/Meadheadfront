<template>
    <div class="container">
      <h1>Rechercher un Hôpital</h1>
  
      <!-- Formulaire de recherche -->
      <form @submit.prevent="searchHospitals">
        <div class="form-group">
          <label for="name">Nom de l'hôpital :</label>
          <input type="text" id="name" v-model="searchCriteria.name" placeholder="Ex: Hôpital Saint-Louis" />
        </div>
  
        <div class="form-group">
          <label for="specialty">Spécialité :</label>
          <input type="text" id="specialty" v-model="searchCriteria.specialtyName" placeholder="Ex: Cardiologie" />
        </div>
  
        <div class="form-group">
          <label for="beds">Nombre de lits minimum :</label>
          <input type="number" id="beds" v-model.number="searchCriteria.numberOfBeds" min="0" />
        </div>
  
        <div class="form-group">
          <label for="distance">Distance max (km) :</label>
          <input type="number" id="distance" v-model.number="searchCriteria.maxDistance" min="0" step="1" />
        </div>
  
        <!-- Boutons d'action -->
        <div class="form-actions">
          <button type="submit">🔍 Rechercher</button>
          <router-link to="/hospitals" class="back-button">🔙 Retour à la gestion des hôpitaux</router-link>
        </div>
      </form>
  
      <!-- Résultats de recherche -->
      <div v-if="hospitals.length > 0">
        <h2>Résultats :</h2>
        <table>
          <thead>
            <tr>
              <th>Nom de l'Hôpital</th>
              <th>Spécialité</th>
              <th>Nombre de Lits</th>
              <th>Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(hospital, index) in hospitals" :key="index">
              <td>{{ hospital.name }}</td>
              <td>{{ hospital.specialtyName }}</td>
              <td>{{ hospital.numberOfBeds }}</td>
              <td>{{ hospital.distance.toFixed(2) }} km</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <p v-else-if="searchPerformed && hospitals.length === 0">Aucun hôpital trouvé.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchCriteria: {
          name: "",
          specialtyName: "",
          numberOfBeds: null,
          maxDistance: null,
        },
        hospitals: [], // Liste des résultats
        searchPerformed: false,
      };
    },
    methods: {
      searchHospitals() {
        this.searchPerformed = true;
  
        // ✅ ICI tu pourras ajouter l'appel à l'API plus tard
        // Exemple futur :
        // axios.get(`https://ton-api.com/api/search-hospitals`, { params: this.searchCriteria })
        // .then(response => { this.hospitals = response.data; })
        // .catch(error => { console.error(error); });
  
        // ✅ Pour l'instant, on met des données fake
        this.hospitals = [
          { name: "Hôpital Saint-Louis", numberOfBeds: 200, specialtyName: "Cardiologie", distance: 5.2 },
          { name: "CHU Paris", numberOfBeds: 500, specialtyName: "Neurologie", distance: 8.1 },
          { name: "Clinique Pasteur", numberOfBeds: 150, specialtyName: "Pédiatrie", distance: 12.3 },
        ];
  
        // Simulation : filtrer les résultats selon les critères
        this.hospitals = this.hospitals.filter(hospital => {
          return (
            (!this.searchCriteria.name || hospital.name.toLowerCase().includes(this.searchCriteria.name.toLowerCase())) &&
            (!this.searchCriteria.specialtyName || hospital.specialtyName.toLowerCase().includes(this.searchCriteria.specialtyName.toLowerCase())) &&
            (!this.searchCriteria.numberOfBeds || hospital.numberOfBeds >= this.searchCriteria.numberOfBeds) &&
            (!this.searchCriteria.maxDistance || hospital.distance <= this.searchCriteria.maxDistance)
          );
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 700px;
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
  
  h2 {
    margin-top: 20px;
    color: #2a9d8f;
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
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #2a9d8f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #42b983;
  }
  
  .back-button {
    padding: 10px 15px;
    background-color: #134074;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .back-button:hover {
    background-color: #0f2c5a;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
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
  </style>
  