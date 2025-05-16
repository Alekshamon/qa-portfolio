/// <reference types="cypress" />

describe("User Login Tests", () => {
  const baseUrl = "https://practice.expandtesting.com/notes/api/users/login";

  // Test 1 : login with valid credentials
  it("Should login successfully with valid credentials", () => {
    cy.fixture("userData.json").then((userData) => {
      const validUser = userData.validUser;

      cy.request({
        method: "POST",
        url: baseUrl,
        body: {
          email: validUser.email,
          password: validUser.password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(true);
        expect(response.body.message).to.eq("Login successful");
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("token");

        Cypress.env("userId", response.body.data.id);
        Cypress.env("authToken", response.body.data.token);
      });
    });
  });

  // Test 2 : login with invalid email
  it("Should fail to login with an unregistered email", () => {
    cy.fixture("userData.json").then((userData) => {
      const invalidUser = userData.invalidEmail;

      cy.request({
        method: "POST",
        url: baseUrl,
        body: invalidUser,
        headers: {
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.success).to.eq(false);
        expect(response.body.message).to.eq(
          "A valid email address is required"
        );
      });
    });
  });

  // Test 3 : login with wrong password
  it("Should fail to login with incorrect password", () => {
    cy.fixture("userData.json").then((userData) => {
      const wrongPasswordUser = userData.invalidPassword;

      cy.request({
        method: "POST",
        url: baseUrl,
        body: wrongPasswordUser,
        headers: {
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.success).to.eq(false);
        expect(response.body.message).to.eq(
          "Password must be between 6 and 30 characters"
        );
      });
    });
  });

  // Test 4 : login with missing fields
  it("Should return 400 when fields are missing", () => {
    cy.request({
      method: "POST",
      url: baseUrl,
      body: {},
      headers: {
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.eq("A valid email address is required");
    });
  });
});
