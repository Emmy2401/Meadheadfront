<template>
  <div class="container">
    <h1>Modifier l'Hôpital</h1>

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

      <!-- Sélection des spécialités -->
      <div class="form-group">
        <label>Spécialités (optionnel) :</label>
        <select v-model="selectedSpecialty" @change="addSpecialty">
          <option value="" disabled selected>Choisir une spécialité</option>
          <option v-for="(specialty, index) in specialtiesList" :key="index" :value="specialty">
            {{ specialty.name }}
          </option>
        </select>

        <ul>
          <li v-for="(specialty, index) in hospital.specialties" :key="index">
            <strong>{{ specialty.name }}</strong>
            <button type="button" @click="removeSpecialty(index)">❌</button>

            <!-- Sous-spécialités -->
            <div>
              <label>Ajouter une sous-spécialité :</label>
              <select v-model="selectedSubSpecialty[index]" @change="addSubSpecialty(index)">
                <option value="" disabled selected>Choisir une sous-spécialité</option>
                <option v-for="sub in specialty.subSpecialtiesList" :key="sub" :value="sub">
                  {{ sub }}
                </option>
              </select>
            </div>

            <ul>
              <li v-for="(sub, subIndex) in specialty.subSpecialties" :key="subIndex">
                {{ sub }}
                <button type="button" @click="removeSubSpecialty(index, subIndex)">❌</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- Boutons -->
      <div class="form-actions">
        <button type="submit">Enregistrer les modifications</button>
        <router-link to="/hospitals" class="back-button">🔙 Retour à la liste</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"], // Récupère l'ID de l'hôpital depuis l'URL
  data() {
    return {
      hospital: {
        id: this.id,
        name: "",
        latitude: null,
        longitude: null,
        numberOfBeds: 0,
        specialties: [],
      },
      selectedSpecialty: "",
      selectedSubSpecialty: {},
      specialtiesList: [
        { name: "Cardiologie", subSpecialtiesList: ["Cardiologie pédiatrique", "Rythmologie", "Chirurgie cardiaque"] },
        { name: "Neurologie", subSpecialtiesList: ["Neurochirurgie", "Neurologie pédiatrique", "Épileptologie"] },
        { name: "Chirurgie générale", subSpecialtiesList: ["Chirurgie digestive", "Chirurgie bariatrique"] },
        { name: "Oncologie", subSpecialtiesList: ["Oncologie pédiatrique", "Radiothérapie", "Hémato-oncologie"] },
        { name: "Pédiatrie", subSpecialtiesList: ["Néonatologie", "Pneumologie pédiatrique"] },
        { name: "Radiologie", subSpecialtiesList: ["Imagerie médicale", "Radiologie interventionnelle"] },
        { name: "Médecine d'urgence", subSpecialtiesList: ["Urgences pédiatriques", "Réanimation"] }
      ]
    };
  },
  created() {
    this.fetchHospitalData();
  },
  methods: {
    async fetchHospitalData() {
      try {
        

        const response = await axios.get(`http://localhost:8085/hospitals/id/${this.id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        });

        this.hospital = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération de l'hôpital :", error);
        alert("Impossible de récupérer l'hôpital. Vérifiez votre connexion.");
      }
    },
    async handleUpdate() {
      try {
        const token = localStorage.getItem("token"); // 🔥 Vérification du token
        if (!token) throw new Error("Token manquant. Connectez-vous.");

        await axios.put(`http://localhost:8085/hospitals/${this.hospital.id}`, this.hospital, {
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
    },
    addSpecialty() {
      if (this.selectedSpecialty && !this.hospital.specialties.some(s => s.name === this.selectedSpecialty.name)) {
        this.hospital.specialties.push({
          name: this.selectedSpecialty.name,
          subSpecialties: [],
          subSpecialtiesList: this.selectedSpecialty.subSpecialtiesList
        });
      }
      this.selectedSpecialty = "";
    },
    removeSpecialty(index) {
      this.hospital.specialties.splice(index, 1);
    },
    addSubSpecialty(specialtyIndex) {
      if (this.selectedSubSpecialty[specialtyIndex] &&
          !this.hospital.specialties[specialtyIndex].subSpecialties.includes(this.selectedSubSpecialty[specialtyIndex])) {
        this.hospital.specialties[specialtyIndex].subSpecialties.push(this.selectedSubSpecialty[specialtyIndex]);
      }
      this.selectedSubSpecialty[specialtyIndex] = "";
    },
    removeSubSpecialty(specialtyIndex, subIndex) {
      this.hospital.specialties[specialtyIndex].subSpecialties.splice(subIndex, 1);
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
