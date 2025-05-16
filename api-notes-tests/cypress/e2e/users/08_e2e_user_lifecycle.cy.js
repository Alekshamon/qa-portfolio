/// <reference types="cypress" />

describe("E2E User Lifecycle", () => {
  const baseUrl = "https://practice.expandtesting.com/notes/api/users";
  const registerUrl = `${baseUrl}/register`;
  const loginUrl = `${baseUrl}/login`;
  const profileUrl = `${baseUrl}/profile`;
  const logoutUrl = `${baseUrl}/logout`;
  const deleteUrl = `${baseUrl}/delete-account`;

  const randomId = Date.now();
  const newUser = {
    name: `TestUser${randomId}`,
    email: `testuser${randomId}@example.com`,
    password: "Password123!",
  };

  let token;

  it("1. Should register a new user", () => {
    cy.request({
      method: "POST",
      url: registerUrl,
      body: newUser,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.success).to.eq(true);
    });
  });

  it("2. Should login with the new user", () => {
    cy.request({
      method: "POST",
      url: loginUrl,
      body: {
        email: newUser.email,
        password: newUser.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true);
      token = response.body.data.token;
      expect(token).to.exist;
    });
  });

  it("3. Should update the user profile", () => {
    cy.request({
      method: "PATCH",
      url: profileUrl,
      headers: {
        "x-auth-token": token,
      },
      body: {
        name: `${newUser.name}_Updated`,
        phone: "0123456789",
        company: "Cypress Inc",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true);
      expect(response.body.data.name).to.include("_Updated");
    });
  });

  it("4. Should logout the user", () => {
    cy.request({
      method: "DELETE",
      url: logoutUrl,
      headers: {
        "x-auth-token": token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true);
    });
  });

  it("5. Should login again after logout", () => {
    cy.request({
      method: "POST",
      url: loginUrl,
      body: {
        email: newUser.email,
        password: newUser.password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.data.token;
    });
  });

  it("6. Should delete the user account", () => {
    cy.request({
      method: "DELETE",
      url: deleteUrl,
      headers: {
        "x-auth-token": token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true);
      expect(response.body.message).to.include("Account successfully deleted");
    });
  });
});
