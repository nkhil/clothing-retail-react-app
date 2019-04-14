context("User visits the app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234")
  })

  describe("User is alerted", () => {
    it("Alerts user on invalid discount code - wrong voucher code", () => {
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

    it("Alerts user on invalid discount code - no footwear items", () => {
      const stub = cy.stub()
      cy.on("window:alert", stub)
      cy.get(".product6-button").click({ force: true })
      cy.get("#shoppingCart").within($shoppingCart => {
        cy.get("#voucher-form")
          .find('[type="text"]')
          .type("fifteenoff")
        cy.get("#voucher-form")
          .submit()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith("Invalid discount code")
          })
      })
    })

    it("Alerts user on invalid discount code - no minimum spend", () => {
      const stub = cy.stub()
      cy.on("window:alert", stub)
      cy.get(".product4-button").click({ force: true })
      cy.get("#shoppingCart").within($shoppingCart => {
        cy.get("#voucher-form")
          .find('[type="text"]')
          .type("fifteenoff")
        cy.get("#voucher-form")
          .submit()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith("Invalid discount code")
          })
      })
    })

    it("Alerts user on invalid discount code - no minimum spend 2", () => {
      const stub = cy.stub()
      cy.on("window:alert", stub)
      cy.get(".product3-button").click({ force: true })
      cy.get("#shoppingCart").within($shoppingCart => {
        cy.get("#voucher-form")
          .find('[type="text"]')
          .type("tenoff")
        cy.get("#voucher-form")
          .submit()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith("Invalid discount code")
          })
      })
    })
  })
})
