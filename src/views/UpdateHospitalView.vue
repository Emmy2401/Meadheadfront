<template>
  <div class="container">
    <h1>Consultation  Fiche Hôpital</h1>

    <form @submit.prevent="handleUpdate">
      <!-- ID (Non modifiable) -->
      <div class="form-group">
        <label for="id">ID :</label>
        <input type="text" id="id" v-model="hospital.id" readonly class="disabled-input" />
      </div>

      <!-- Nom de l'Hôpital -->
      <div class="form-group">
        <label for="name">Nom de l'hôpital :</label>
        <input type="text" id="name" v-model="hospital.name" required />
      </div>

      <!-- Latitude -->
      <div class="form-group">
        <label for="latitude">Latitude :</label>
        <input type="number" id="latitude" v-model.number="hospital.latitude" required step="0.000001" />
      </div>

      <!-- Longitude -->
      <div class="form-group">
        <label for="longitude">Longitude :</label>
        <input type="number" id="longitude" v-model.number="hospital.longitude" required step="0.000001" />
      </div>

      <!-- Nombre de lits -->
      <div class="form-group">
        <label for="beds">Nombre de lits :</label>
        <input type="number" id="beds" v-model.number="hospital.numberOfBeds" min="0" required />
      </div>

      <!-- Affichage des spécialités en mode lecture seule -->
      <div class="form-group">
        <label>Spécialités :</label>
        <ul>
          <li v-for="specialty in hospital.specialties" :key="specialty.name">
            <strong>{{ specialty.name }}</strong> :
            <span v-if="specialty.subSpecialties.length > 0">
              {{ specialty.subSpecialties.map(sub => sub.name).join(", ") }}
            </span>
            <span v-else>Pas de sous-spécialité</span>
          </li>
        </ul>
      </div>

      <!-- Boutons -->
      <div class="form-actions">
        <!--button type="submit">Enregistrer les modifications</button-->
        <router-link to="/hospitals" class="back-button">🔙 Retour à la liste</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"], 
  data() {
    return {
      hospital: {
        id: this.id,
        name: "",
        latitude: null,
        longitude: null,
        numberOfBeds: 0,
        specialties: [],
      }
    };
  },
  created() {
    this.fetchHospitalData();
  },
  methods: {
    async fetchHospitalData() {
      try {
        const response = await axios.get(`http://localhost:8085/hospitals/id/${this.id}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });

        this.hospital = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération de l'hôpital :", error);
        alert("Impossible de récupérer l'hôpital. Vérifiez votre connexion.");
      }
    },

    async handleUpdate() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token manquant. Connectez-vous.");

        // Supprimer les spécialités avant d'envoyer la requête pour éviter toute modification
        const { specialties, ...hospitalData } = this.hospital;

        await axios.put(`http://localhost:8085/hospitals/update/${this.hospital.id}`, hospitalData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        });

        alert("Hôpital mis à jour avec succès !");
        this.$router.push("/hospitals");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'hôpital :", error);
        alert("Échec de la mise à jour. Vérifiez vos permissions.");
      }
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

.form-actions {
  display: flex;
  justify-content: space-between;
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

.back-button {
  padding: 10px 15px;
  background-color: #134074;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>
