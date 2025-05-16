/// <reference types="cypress" />

describe("User Registration Tests", () => {
  // Test 1 : create a user account
  it("Should create a user account with valid data", () => {
    cy.fixture("userData.json").then((userData) => {
      const validUser = userData.validUser;

      cy.request({
        method: "POST",
        url: "https://practice.expandtesting.com/notes/api/users/register",
        body: {
          name: validUser.name,
          email: validUser.email,
          password: validUser.password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.success).to.eq(true);
        expect(response.body.message).to.eq(
          "User account created successfully"
        );
        expect(response.body.data).to.have.property("id");
        expect(response.body.data.name).to.eq(validUser.name);
        expect(response.body.data.email).to.eq(validUser.email);
      });
    });
  });

  // Test 2 : if email is invalid
  it("Should return an error if email is invalid", () => {
    cy.fixture("userData.json").then((userData) => {
      const invalidEmail = userData.invalidEmail;

      cy.request({
        method: "POST",
        url: "https://practice.expandtesting.com/notes/api/users/register",
        body: {
          name: invalidEmail.name,
          email: invalidEmail.email,
          password: invalidEmail.password,
        },
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

  // Test 2 : if password is too short
  it("Should return an error if password is too short", () => {
    cy.fixture("userData.json").then((userData) => {
      const invalidPassword = userData.invalidPassword;

      cy.request({
        method: "POST",
        url: "https://practice.expandtesting.com/notes/api/users/register",
        body: {
          name: invalidPassword.name,
          email: invalidPassword.email,
          password: invalidPassword.password,
        },
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

  // Test 3 : if username is too short
  it("Should return an error if username is too short", () => {
    cy.fixture("userData.json").then((userData) => {
      const invalidUsername = userData.invalidUsername;

      cy.request({
        method: "POST",
        url: "https://practice.expandtesting.com/notes/api/users/register",
        body: {
          name: invalidUsername.name,
          email: invalidUsername.email,
          password: invalidUsername.password,
        },
        headers: {
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.success).to.eq(false);
        expect(response.body.message).to.eq(
          "User name must be between 4 and 30 characters"
        );
      });
    });
  });
});
