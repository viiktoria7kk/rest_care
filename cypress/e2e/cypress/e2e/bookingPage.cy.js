describe('Booking Page', () => {
  beforeEach(() => {
    cy.visit('/booking');
  });

  it('should display the booking page', () => {
    cy.get('h5').contains('Reserve Parking Place').should('be.visible');
  });

  it('should allow user to select a parking slot', () => {
    cy.get('div').contains('A1').click();
    cy.get('div').contains('SELECTED').should('be.visible');
  });

  it('should allow user to input hours and minutes', () => {
    cy.get('select').eq(2).select('15');
    cy.get('h5').contains('Total:').next().should('contain', '5.25$');
  });

  it('should show dialog with success message on booking', () => {
    cy.get('div').contains('Power3').click();
    cy.get('button').contains('Reserve').click();
    cy.get('div[role="dialog"]').should('be.visible');
   });
});