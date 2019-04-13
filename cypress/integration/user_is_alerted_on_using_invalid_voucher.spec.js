context("User visits the app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234")
  })

  describe("User is alerted", () => {
    it("Alerts use when an invalid discount code is used", () => {
      const stub = cy.stub()
      cy.on("window:alert", stub)
      cy.get(".product1-button").click({ force: true })
      cy.get("#shoppingCart").within($shoppingCart => {
        cy.get("#voucher-form")
          .find('[type="text"]')
          .type("a")
        cy.get("#voucher-form")
          .submit()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith("Invalid discount code")
          })
      })
    })
  })
})
