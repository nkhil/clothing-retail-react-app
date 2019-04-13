context("User visits the app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234")
  })

  describe("User can apply a voucher", () => {
    it("allows user to add a discount voucher", () => {
      cy.get(".product1-button").click({ force: true })
      cy.get("#shoppingCart").within($shoppingCart => {
        cy.get("#voucher-form")
          .find('[type="text"]')
          .type("FIVEOFF")
        cy.get("#voucher-form").submit()
      })
    })
  })
})
