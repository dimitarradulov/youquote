/// <reference types="cypress" />
import { onNavigationPage } from '../support/page_objects/navigationPage';

describe('Quote operations suite', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should be able to view quote details', () => {
    onNavigationPage.viewDetailsPage();
    cy.get('app-quote-details').should(
      'contain',
      'The secret to getting ahead is getting started.'
    );
  });

  it('should be able to like', () => {
    onNavigationPage.viewDetailsPage();
    cy.get('.like-btn i').then((likeBtn) => {
      cy.wrap(likeBtn).click();
      if (likeBtn.hasClass('bi-hand-thumbs-up'))
        cy.get('.like-btn i').should('have.class', 'bi-hand-thumbs-up-fill');
      else cy.get('.like-btn i').should('have.class', 'bi-hand-thumbs-up');
    });
  });

  it.only('should add new quote', () => {
    onNavigationPage.addQuotePage();

    cy.get('#author').type('Winston Churchill');
    cy.get('#content').type("If you're going through hell, keep going.");
    cy.get('form').submit();

    cy.wait('@quotes');

    cy.get('ul')
      .should('contain', 'Winston Churchill')
      .and('contain', "If you're going through hell, keep going.");
  });
});
