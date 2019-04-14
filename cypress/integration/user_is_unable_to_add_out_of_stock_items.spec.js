context("User visits the app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234")
  })

  describe("User is unable to add out of stock items to cart", () => {
    it("disables the add to cart button when out of stock", () => {
      for (let i = 1; i <= 5; i++) {
        cy.get(".product1-button").click({ force: true })
      }
      cy.get(".product1-button").should("be.disabled")
    })
  })
})
