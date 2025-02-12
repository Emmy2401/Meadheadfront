<template>
  <div id="app">
    <!-- Afficher le menu sauf sur les pages de connexion et d'inscription -->
    <nav v-if="!hideMenu">
      <ul>
        <li><router-link to="/me">👤 Profil</router-link></li>
        <li><router-link to="/hospitals">🏥 Gestion des Hôpitaux</router-link></li>
        <li><router-link to="/search-hospitals">🔍 Recherche d'Hôpitaux</router-link></li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    hideMenu() {
      // Cache le menu sur les pages Login et Register
      return this.$route.path === "/login" || this.$route.path === "/register";
    }
  }
};
</script>

<style scoped>
/* Styles du menu */
nav {
  background-color: #134074;
  padding: 15px;
  text-align: center;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav ul li {
  display: inline;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background 0.3s ease;
}

nav ul li a:hover {
  background-color: #2a9d8f;
}
</style>
