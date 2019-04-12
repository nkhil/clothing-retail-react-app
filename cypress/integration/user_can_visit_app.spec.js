context("User visits the app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234")
  })

  describe("Renders correctly", () => {
    it("renders the app correctly", () => {
      cy.server().should(server => {
        expect(server.delay).to.eq(0)
        expect(server.method).to.eq("GET")
        expect(server.status).to.eq(200)
      })
    })
  })
})
