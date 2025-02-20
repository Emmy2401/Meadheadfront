<template>
  <div class="container">
    <h1>Liste des Hôpitaux</h1>
     <!-- Bouton Ajouter un hôpital -->
     <div class="actions">
      <router-link to="/add-hospital" class="add-button">➕ Ajouter un hôpital</router-link>
    </div>

    <div v-if="hospitals.length > 0">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Spécialités</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hospital in hospitals" :key="hospital.id">
            <td>{{ hospital.name }}</td>
            <td>
                {{
                  hospital.specialties && hospital.specialties.length > 0
                    ? hospital.specialties.map(s => s.name).join(', ')
                    : 'Aucune spécialité'
                }}
            </td>
            <td>
              <!-- Bouton Modifier -->
              <router-link :to="'/update-hospital/' + hospital.id" class="update-button">📝 Consulter</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Aucun hôpital trouvé.</p>
  </div>
</template>

<script>
import apiHospitals from "../api/axiosHospitals";

export default {
  data() {
    return {
      hospitals: []
    };
  },
  methods: {
    async getAll() {
      console.log(" Appel de getAll()..."); // Vérifier si la méthode est appelée
      try {
        const response = await apiHospitals.get("http://localhost:8085/hospitals/getAll", {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
           
            //"Cache-Control": "no-cache",
            //"Pragma": "no-cache"
          }
        });
console.log("AAAAAAAAAAAAAAAAAAAH");
console.log(localStorage.getItem("token"));
        console.log(" Données reçues :", response.data);
        this.hospitals = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des hôpitaux :", error);
        alert("Impossible de charger les hôpitaux.");
      }
    }
  },
  mounted() {
    console.log(" Composant monté !");
    this.getAll();
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
