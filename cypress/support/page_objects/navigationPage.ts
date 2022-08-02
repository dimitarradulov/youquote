class NavigationPage {
  viewDetailsPage() {
    cy.get('app-quotes ul li')
      .eq(0)
      .find('app-single-quote')
      .then((quoteEl) => {
        cy.wrap(quoteEl).contains('View Details').click();
      });
  }

  addQuotePage() {
    cy.contains('Add Quote').click();
    cy.get('h2').should('contain', 'Add a Quote');
  }
}

export const onNavigationPage = new NavigationPage();
