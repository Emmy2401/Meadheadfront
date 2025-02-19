describe('Hospital App - Login and Search Tests', () => {
  beforeEach(() => {
      cy.visit('/'); // bonne url
  });

  it('should log in with valid credentials', () => {
      cy.get('#email').type('test@user.fr');
      cy.get('#password').type('monpassword');
      cy.get('button[type="submit"]').click();
      
      // Vérifier que la connexion est réussie
      cy.url().should('include', '/');
      cy.contains('Bienvenue').should('be.visible');
  });

  it('should display an error for invalid login', () => {
      cy.get('#email').type('wronguser@example.com');
      cy.get('#password').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      
      cy.get('.error').should('be.visible');
  });

  it('should search for hospitals using filters and display results', () => {
    // Connexion
    cy.get('#email').type('test@user.fr');
    cy.get('#password').type('monpassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
    
    // Accéder à la page de recherche
    cy.visit('/search-hospitals?refLat=48.8566&refLng=2.3522');
    cy.url().should('include', 'refLat=48.8566').and('include', 'refLng=2.3522');
    
    // Appliquer les filtres
    cy.get('#specialtyName').select('Cardiologie').should('have.value', 'Cardiologie');
    cy.get('#beds').clear().type('500').should('have.value', '500');
    
    // Lancer la recherche et intercepter la requête
    cy.intercept('GET', '**/hospitals/searchCriteria*').as('searchHospitals');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@searchHospitals', { timeout: 10000 }).then(({ request }) => {
        expect(request.url).to.include('minBeds=500');
        expect(request.url).to.include('specialtyName=Cardiologie');
        expect(request.url).to.include('refLat=48.8566');
        expect(request.url).to.include('refLng=2.3522');
    });
});
});
