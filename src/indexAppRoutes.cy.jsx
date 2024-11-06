import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/index';

describe('<AppRoutes />', () => {
  it('renders', () => {
    const setIsAuthenticated = cy.stub();
    cy.mount(
        <Router>
          <AppRoutes setIsAuthenticated={setIsAuthenticated} />
        </Router>
    );
  });
});