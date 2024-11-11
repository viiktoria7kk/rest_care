describe('Login General Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display the login form', () => {
    cy.get('form').should('be.visible');
  });

  it('should allow user to input email', () => {
    cy.get('input[name="email"]').type('test@example.com').should('have.value', 'test@example.com');
  });

  it('should show error message for invalid email', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('form').submit();
  });
});