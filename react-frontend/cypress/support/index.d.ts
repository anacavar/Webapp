declare namespace Cypress {
  interface Chainable<> {
    /**
     * Initialize the menu and click the first item.
     */
    logIn(): Chainable<any>;
  }
}
