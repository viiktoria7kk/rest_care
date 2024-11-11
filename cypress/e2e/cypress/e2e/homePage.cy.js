describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home page content', () => {
    // Wait for the content to be visible
    cy.contains('Rest Care – Комфортний простір для паркування та відпочинку', { timeout: 10000 }).should('be.visible');
  });

  it('should navigate to booking page on booking button click', () => {
    // Wait for the button to be visible and clickable
    cy.contains('Забронювати місце', { timeout: 10000 }).should('be.visible').click();
    cy.url().should('include', '/booking');
  });
});