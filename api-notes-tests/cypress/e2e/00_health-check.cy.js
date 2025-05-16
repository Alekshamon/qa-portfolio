describe("API Health Check - Notes API", () => {
  const baseUrl = "https://practice.expandtesting.com/notes/api";

  it("should return status 200 and a valid success message", () => {
    cy.request(`${baseUrl}/health-check`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property("status", 200);
      expect(response.body).to.have.property("message", "Notes API is Running");
    });
  });
});
