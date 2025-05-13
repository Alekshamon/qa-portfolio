/// <reference types="cypress" />

const profileUrl = "https://practice.expandtesting.com/notes/api/users/profile";

let token;

before(() => {
  cy.loginViaAPI().then((t) => {
    token = t;
  });
});

describe("Update User Profile - PATCH /users/profile", () => {
  it("Should update profile successfully with valid token and all fields", () => {
    cy.request({
      method: "PATCH",
      url: profileUrl,
      headers: {
        "x-auth-token": token,
      },
      body: {
        name: "Test Updated",
        phone: "0123456789",
        company: "Test Company",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true);
      expect(response.body.data).to.include({
        name: "Test Updated",
        phone: "0123456789",
        company: "Test Company",
      });
    });
  });

  it("Should fail to update profile without token", () => {
    cy.request({
      method: "PATCH",
      url: profileUrl,
      failOnStatusCode: false,
      body: {
        name: "Should Fail",
        phone: "0000000000",
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.eq(
        "No authentication token specified in x-auth-token header"
      );
    });
  });

  it("Should fail to update profile with missing name", () => {
    cy.request({
      method: "PATCH",
      url: profileUrl,
      headers: {
        "x-auth-token": token,
      },
      failOnStatusCode: false,
      body: {
        phone: "1234567890",
        company: "Missing Name",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.eq(
        "User name must be between 4 and 30 characters"
      );
    });
  });
});
