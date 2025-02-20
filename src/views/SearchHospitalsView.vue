<template>
  <div class="container">
    <h1>Rechercher un Hôpital</h1>

    <!-- Formulaire de recherche -->
    <form @submit.prevent="searchHospitals">
      <div class="form-group">
        <label for="specialtyName">Spécialité :</label>
        <select id="specialtyName" v-model="searchCriteria.specialtyName">
          <option value="">-- Sélectionnez une spécialité --</option>
          <option v-for="(specialty, index) in specialtiesList" :key="index" :value="specialty.name">
            {{ specialty.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="beds">Nombre de lits minimum :</label>
        <input type="number" id="beds" v-model.number="searchCriteria.minBeds" min="0" />
      </div>

      <!-- Boutons d'action -->
      <div class="form-actions">
        <button type="submit">🔍 Rechercher</button>
        <router-link to="/hospitals" class="back-button">🔙 Retour</router-link>
      </div>
    </form>

    <!-- Résultats de recherche -->
    <div v-if="hospitals.length > 0">
      <h2>Résultats :</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Spécialité</th>
            <th>Nombre de Lits</th>
            <th>Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hospital, index) in hospitals" :key="index">
            <td>{{ hospital.name }}</td>
            <td>
              {{
                hospital.specialties && hospital.specialties.length > 0
                  ? hospital.specialties.map(s => s.name).join(', ')
                  : 'Aucune spécialité'
              }}
            </td>
            <td>{{ hospital.numberOfBeds }}</td>
            <td>{{ hospital.distance !== undefined ? hospital.distance.toFixed(2) + ' km' : 'Non calculée' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else-if="searchPerformed && hospitals.length === 0">Aucun hôpital trouvé.</p>
  </div>
</template>

<script>
import apiHospitals from "../api/axiosHospitals";;

export default {
  data() {
    return {
      searchCriteria: {
        specialtyName: "",
        minBeds: null, 
        refLat: 48.8566, // Latitude par défaut : Paris
        refLng: 2.3522,  // Longitude par défaut : Paris
      },
      specialtiesList: [
        { name: "Cardiologie" },
        { name: "Neurologie" },
        { name: "Chirurgie générale" },
        { name: "Oncologie" },
        { name: "Pédiatrie" },
        { name: "Radiologie" },
        { name: "Médecine d'urgence" }
      ],
      hospitals: [],
      searchPerformed: false,
    };
  },
  methods: {
    async searchHospitals() {
      this.searchPerformed = true;

      try {
        const response = await apiHospitals.get("http://localhost:8085/hospitals/searchCriteria", {
          withCredentials: true,
          params: {
            minBeds: this.searchCriteria.minBeds,
            specialtyName: this.searchCriteria.specialtyName, 
            refLat: this.searchCriteria.refLat,
            refLng: this.searchCriteria.refLng,
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.hospitals = response.data;
        this.$router.push({
        path: "/search-hospitals",
        query: {
          refLat: this.searchCriteria.refLat,
          refLng: this.searchCriteria.refLng,
          minBeds: this.searchCriteria.minBeds,
          specialtyName: this.searchCriteria.specialtyName,
        },
      });
      } catch (error) {
        console.error("Erreur lors de la recherche des hôpitaux :", error);
        alert("Erreur lors de la recherche. Vérifiez la console.");
      }
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

input, select {
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
