context("User visits the app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234")
  })

  describe("User can remove items from shopping cart", () => {
    it("allows user to remove items from shopping cart", () => {
      cy.get(".product1-button").click({ force: true })
      cy.get("#shoppingCart").within($shoppingCart => {
        cy.get("#product1").within($product1 => {
          cy.get(".remove-item").click({ force: true })
        })
      })
      cy.get("#shoppingCart").within($shoppingCart => {
        cy.get("#product1").should("not.exist")
      })
    })
  })
})
