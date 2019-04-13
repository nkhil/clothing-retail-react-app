context("User visits the app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234")
  })

  describe("User can add items to shopping cart", () => {
    it("allows user to add items to shopping cart", () => {
      cy.get(".product1-button").click({ force: true })
      cy.get("#shoppingCart").within($shoppingCart => {
        cy.get("#product1")
      })
    })
  })
})
