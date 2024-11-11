import React from 'react'
import LogoutButton from './features/components/LogoutButton'

describe('<LogoutButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LogoutButton />)
  })
})