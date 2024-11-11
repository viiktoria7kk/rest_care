import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ConfirmSignInEmail from './pages/ConfirmSignInEmail';

describe('<ConfirmSignInEmail />', () => {
  it('renders', () => {
    const setIsAuthenticated = cy.stub();
    cy.mount(
        <Router>
          <ConfirmSignInEmail setIsAuthenticated={setIsAuthenticated} />
        </Router>
    );
  });
});