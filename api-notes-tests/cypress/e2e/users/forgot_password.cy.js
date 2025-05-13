/// <reference types="cypress" />

describe("Forgot Password - POST /users/forgot-password", () => {
  const forgotPasswordUrl =
    "https://practice.expandtesting.com/notes/api/users/forgot-password";

  // Test 1 : email valide
  it("Should send reset link for valid email", () => {
    cy.fixture("userData.json").then((userData) => {
      const currentEmail = userData.validUser.email;

      cy.request({
        method: "POST",
        url: forgotPasswordUrl,
        body: {
          email: currentEmail,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(true);
        expect(response.body.message).to.include(
          "Password reset link successfully sent"
        );
      });
    });
  });

  // Test 2 : empty email
  it("Should fail with empty email", () => {
    cy.request({
      method: "POST",
      url: forgotPasswordUrl,
      failOnStatusCode: false,
      body: {
        email: "",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.eq("A valid email address is required");
    });
  });

  // Test 3 : email invalide
  it("Should fail with invalid email format", () => {
    cy.request({
      method: "POST",
      url: forgotPasswordUrl,
      failOnStatusCode: false,
      body: {
        email: "not-an-email",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.eq("A valid email address is required");
    });
  });
});
