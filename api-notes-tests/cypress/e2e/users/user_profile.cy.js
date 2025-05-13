/// <reference types="cypress" />

const profileUrl = "https://practice.expandtesting.com/notes/api/users/profile";

describe("User Profile Tests", () => {
  let token;

  before(() => {
    cy.loginViaAPI().then((t) => {
      token = t;
    });
  });

  // Test 1 : get user profile with valid token
  it("Should retrieve profile with valid token", () => {
    cy.then(() => {
      expect(token).to.exist;
      cy.request({
        method: "GET",
        url: profileUrl,
        headers: {
          "x-auth-token": token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(true);
        expect(response.body.data).to.have.property("email");
      });
    });
  });
});

// Test 2 : get user profile without token
it("Should fail to retrieve profile without token", () => {
  cy.request({
    method: "GET",
    url: profileUrl,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(401);
    expect(response.body.success).to.eq(false);
    expect(response.body.message).to.eq(
      "No authentication token specified in x-auth-token header"
    );
  });
});

// Test 3 : get user profile with invalid token
it("Should fail to retrieve profile with invalid token", () => {
  cy.request({
    method: "GET",
    url: profileUrl,
    headers: {
      Authorization: "Bearer invalidtoken12345",
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(401);
    expect(response.body.success).to.eq(false);
    expect(response.body.message).to.eq(
      "No authentication token specified in x-auth-token header"
    );
  });
});

// Test 4 : get user profile with malformed Authorization header
it("Should fail with malformed Authorization header", () => {
  cy.request({
    method: "GET",
    url: profileUrl,
    headers: {
      Authorization: "Token 12345",
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(401);
    expect(response.body.success).to.eq(false);
    expect(response.body.message).to.eq(
      "No authentication token specified in x-auth-token header"
    );
  });
});
