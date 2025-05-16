/// <reference types="cypress" />

const changePasswordUrl =
  "https://practice.expandtesting.com/notes/api/users/change-password";

let token;
let currentPassword;
let newPassword = "NewPass123!";

before(() => {
  cy.fixture("userData.json").then((userData) => {
    currentPassword = userData.validUser.password;

    cy.loginViaAPI().then((t) => {
      token = t;
      cy.log("Token: " + token);
    });
  });
});

after(() => {
  cy.request({
    method: "POST",
    url: changePasswordUrl,
    headers: {
      "x-auth-token": token,
    },
    body: {
      currentPassword: newPassword,
      newPassword: currentPassword,
    },
  });
});

describe("Change Password - POST /users/change-password", () => {
  // Test 1 : Change password with valid token and correct current password
  it("Should successfully change password with correct current password", () => {
    cy.request({
      method: "POST",
      url: changePasswordUrl,
      headers: {
        "x-auth-token": token,
      },
      body: {
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true);
      expect(response.body.message).to.eq(
        "The password was successfully updated"
      );
    });
  });

  // Test 2 : Change password with incorrect current password
  it("Should fail with incorrect current password", () => {
    cy.request({
      method: "POST",
      url: changePasswordUrl,
      headers: {
        "x-auth-token": token,
      },
      failOnStatusCode: false,
      body: {
        currentPassword: "wrongpassword",
        newPassword: "AnotherNewPass123!",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.eq("The current password is incorrect");
    });
  });

  // Test 3 : Change password without new password
  it("Should fail with missing newPassword", () => {
    cy.request({
      method: "POST",
      url: changePasswordUrl,
      headers: {
        "x-auth-token": token,
      },
      failOnStatusCode: false,
      body: {
        currentPassword: currentPassword,
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.eq(
        "New password must be between 6 and 30 characters"
      );
    });
  });
});
