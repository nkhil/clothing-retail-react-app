context("User visits the app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234")
  })

  describe("User can see the total price of products in the shopping cart", () => {
    it("shows users the total price of products in the cart", () => {
      cy.get(".product1-button").click({ force: true })
      cy.get(".product2-button").click({ force: true })
      cy.get("#shoppingCart").within($shoppingCart => {
        cy.get("#total").then($total => {
          expect($total, "text content").to.have.text("Total: £141.00")
        })
      })
    })
  })
})
