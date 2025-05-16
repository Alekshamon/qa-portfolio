Cypress.Commands.add("loginViaAPI", () => {
  return cy.fixture("userData.json").then((userData) => {
    const validUser = userData.validUser;

    return cy
      .request({
        method: "POST",
        url: "https://practice.expandtesting.com/notes/api/users/login",
        body: {
          email: validUser.email,
          password: validUser.password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const token = response.body.data.token;
        Cypress.env("authToken", token);
        return token;
      });
  });
});

Cypress.Commands.add("loginStaticUser", () => {
  return cy.fixture("userData.json").then((data) => {
    return cy
      .request({
        method: "POST",
        url: "https://practice.expandtesting.com/notes/api/users/login",
        body: {
          email: data.staticUser.email,
          password: data.staticUser.password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const token = response.body.data.token;
        Cypress.env("token", token);
        return token;
      });
  });
});
