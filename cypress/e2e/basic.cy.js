describe("🔹 Test de base - Page d'accueil avec connexion", () => {
  
    // Fonction pour se connecter avant les tests
    beforeEach(() => {
      cy.visit("http://localhost:5173/login"); // Remplace l'URL si besoin
  
      cy.get("#email").type("test@user.fr"); // Champ email
      cy.get("#password").type("monpassword"); // Champ mot de passe
      cy.get("button[type='submit']").click(); // Bouton de connexion
  
      // Attendre que la redirection se fasse après la connexion
      cy.url().should("include", "/home"); // Modifie selon l’URL après connexion
    });
  
    it("✅ Vérifie que la page d'accueil se charge après connexion", () => {
      cy.visit("http://localhost:5173/home"); // Page après login
      cy.contains("Rechercher un Hôpital").should("be.visible");
    });
  
    it("✅ Teste la recherche d'un hôpital avec une spécialité", () => {
      cy.visit("http://localhost:5173/home");
  
      cy.get("#specialty").select("Cardiologie"); // Sélectionne une spécialité
      cy.get("button[type='submit']").click(); // Clique sur "Rechercher"
  
      cy.get("table tbody tr").should("have.length.greaterThan", 0); // Vérifie qu'il y a des résultats
    });
  
    it("✅ Vérifie qu'aucun hôpital n'est trouvé avec une spécialité inexistante", () => {
      cy.visit("http://localhost:5173/home");
  
      cy.get("#specialty").select("Spécialité Inexistante");
      cy.get("button[type='submit']").click();
  
      cy.contains("Aucun hôpital trouvé.").should("be.visible");
    });
  });
  