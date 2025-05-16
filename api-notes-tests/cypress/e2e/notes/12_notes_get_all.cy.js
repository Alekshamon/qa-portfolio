/// <reference types="cypress" />

describe("GET /notes - Retrieve User Notes", () => {
  const getNotesUrl = "https://practice.expandtesting.com/notes/api/notes";
  let token;

  before(() => {
    cy.loginViaAPI().then((t) => {
      token = t;
    });
  });

  // Test 1
  it("Should retrieve all notes for the authenticated user", () => {
    cy.request({
      method: "GET",
      url: getNotesUrl,
      headers: {
        "x-auth-token": token,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.eq(true);
      expect(res.body.status).to.eq(200);
      expect(res.body.message).to.eq("Notes successfully retrieved");

      const data = res.body.data;

      expect(data).to.be.an("array");

      data.forEach((note) => {
        expect(note).to.have.property("id");
        expect(note).to.have.property("title");
        expect(note).to.have.property("description");
        expect(note).to.have.property("category");
        expect(note).to.have.property("completed");
        expect(note).to.have.property("created_at");
        expect(note).to.have.property("updated_at");
        expect(note).to.have.property("user_id");
      });
    });
  });

  // Test 2
  it("Should fail to retrieve notes without token", () => {
    cy.request({
      method: "GET",
      url: getNotesUrl,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.success).to.eq(false);
      expect(res.body.message).to.include("No authentication token");
    });
  });

  // Test 3
  it("Should fail to retrieve notes with invalid token", () => {
    cy.request({
      method: "GET",
      url: getNotesUrl,
      headers: {
        "x-auth-token": "invalid-token-123",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.success).to.eq(false);
      expect(res.body.message).to.include("Access token is not valid");
    });
  });
});
