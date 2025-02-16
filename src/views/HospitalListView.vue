<template>
  <div class="container">
    <h1>Liste des Hôpitaux</h1>
    
    <div v-if="hospitals.length > 0">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Spécialités</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hospital in hospitals" :key="hospital.id">
            <td>{{ hospital.name }}</td>
            <td>{{ hospital.specialties.map(s => s.name).join(', ') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Aucun hôpital trouvé.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      hospitals: []
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token manquant. Connectez-vous.");
      
      const response = await axios.get("http://localhost:8085/getAll", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      this.hospitals = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des hôpitaux :", error);
      alert("Impossible de charger les hôpitaux.");
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
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
