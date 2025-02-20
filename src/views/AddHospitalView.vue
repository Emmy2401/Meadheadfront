<template>
  <div class="container">
    <h1>Ajouter un Hôpital</h1>

    <form @submit.prevent="handleSubmit">
      <!-- Nom de l'Hôpital -->
      <div class="form-group">
        <label for="name">Nom de l'hôpital :</label>
        <input type="text" id="name" v-model="hospital.name" required placeholder="Nom de l'hôpital" />
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
      <button type="submit">Enregistrer</button>
      <button type="button" class="back-button" @click="$router.push('/hospitals')">Annuler</button>
    </form>
  </div>
</template>

<script>
import apiHospitals from "../api/axiosHospitals";

export default {
  data() {
    return {
      hospital: {
        name: "",
        latitude: null,
        longitude: null,
        numberOfBeds: 0,
        specialties: [], // Facultatif
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
  methods: {
    async handleSubmit() {
      try {
        const token = localStorage.getItem("token"); //  Récupération du token
        if (!token) throw new Error("Token manquant. Connectez-vous.");

        await apiHospitals.post("http://localhost:8085/hospitals/add", this.hospital, {
          withCredentials: true,
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`
          }
        });

        alert("Hôpital ajouté avec succès !");
        this.$router.push("/hospitals");
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'hôpital :", error);
        alert("Échec de l'ajout de l'hôpital. Vérifiez votre connexion et votre autorisation.");
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

button {
  margin-top: 10px;
  padding: 8px;
  background-color: #2a9d8f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #42b983;
}

.back-button {
  background-color: #ccc;
  margin-left: 10px;
}

.back-button:hover {
  background-color: #aaa;
}
</style>
