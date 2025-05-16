/// <reference types="cypress" />

describe("Logout and Delete Account - Protected DELETE routes", () => {
  const logoutUrl = "https://practice.expandtesting.com/notes/api/users/logout";
  const deleteUrl =
    "https://practice.expandtesting.com/notes/api/users/delete-account";

  let token;

  before(() => {
    cy.loginViaAPI().then((t) => {
      token = t;
      cy.log("Token:", token);
    });
  });

  // =======================
  // /users/logout
  // =======================

  it("Should successfully logout with valid token", () => {
    cy.request({
      method: "DELETE",
      url: logoutUrl,
      headers: {
        "x-auth-token": token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true);
      expect(response.body.message).to.include(
        "User has been successfully logged out"
      );
    });
  });

  it("Should fail to logout without token", () => {
    cy.request({
      method: "DELETE",
      url: logoutUrl,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.eq(
        "No authentication token specified in x-auth-token header"
      );
    });
  });

  it("Should fail to logout with invalid token", () => {
    cy.request({
      method: "DELETE",
      url: logoutUrl,
      failOnStatusCode: false,
      headers: {
        "x-auth-token": "invalid-token-123",
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.eq(
        "Access token is not valid or has expired, you will need to login"
      );
    });
  });

  // =======================
  // /users/delete-account
  // =======================

  describe("Delete account after re-login", () => {
    it("Should fail to delete account without token", () => {
      cy.request({
        method: "DELETE",
        url: deleteUrl,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.success).to.eq(false);
      });
    });

    it("Should fail to delete account with invalid token", () => {
      cy.request({
        method: "DELETE",
        url: deleteUrl,
        failOnStatusCode: false,
        headers: {
          "x-auth-token": "invalid-token-xyz",
        },
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.success).to.eq(false);
      });
    });

    it("Should successfully delete account with valid token", () => {
      cy.loginViaAPI().then((token) => {
        cy.request({
          method: "DELETE",
          url: deleteUrl,
          headers: {
            "x-auth-token": token,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.success).to.eq(true);
          expect(response.body.message).to.include(
            "Account successfully deleted"
          );
        });
      });
    });
  });
});
