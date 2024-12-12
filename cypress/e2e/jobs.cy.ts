describe('Jobs Page', () => {

    it('should display logo', () => {
        cy.visit('/');
        cy.get('#logo').should('exist');
    });

    it('should check pagination buttons', () => {
        cy.intercept('GET', '/api/v1/*').as('apiCall');
        cy.visit('/');

        cy.get('#table').should('exist');
        cy.get('#pagination-btn-first').should('exist');
        cy.get('#pagination-btn-previous').should('exist');
        cy.get('#pagination-btn-next').should('exist');
        cy.get('#pagination-btn-last').should('exist');

        cy.wait('@apiCall');

        cy.get('#pagination-btn-first button').should('be.disabled');
        cy.get('#pagination-btn-previous button').should('be.disabled');
        cy.get('#pagination-btn-next button').should('be.enabled');
        cy.get('#pagination-btn-last button').should('be.enabled');

        // navigate to second page
        cy.get('#pagination-btn-next button').click();
        cy.get('.p-overlay-mask').should('not.exist');
        cy.get('#pagination-btn-first button').should('be.enabled');
        cy.get('#pagination-btn-previous button').should('be.enabled');
    });

    it('should click last ad and check dialog open if table-row exists', () => {
        cy.intercept('GET', '/api/v1/*').as('apiCall');
        cy.visit('/');
        cy.wait('@apiCall');
      
        cy.get('#pagination-btn-last button').should('be.enabled').click();
      
        cy.get('.p-overlay-mask').should('not.exist');
      
        cy.get('.table-row').then((rows) => {
          if (rows.length > 0) {
            cy.wrap(rows.first()).click();
      
            cy.get('app-job-item-dialog').should('exist');
            cy.get('.p-dialog-title').should('be.visible').and('have.text', 'Job Details');
          } else {
            cy.log('The final ad is not active!');
          }
        });
      });
      
});