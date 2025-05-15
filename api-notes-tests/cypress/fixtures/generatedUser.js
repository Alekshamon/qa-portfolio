import { generateValidUser } from "../../support/generateUser";

describe("User Registration Tests", () => {
  it("Should create a user account with valid data", () => {
    const validUser = generateValidUser();

    cy.writeFile("cypress/fixtures/generatedUser.json", validUser);

    cy.request({
      method: "POST",
      url: "https://practice.expandtesting.com/notes/api/users/register",
      body: validUser,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.success).to.eq(true);
      expect(response.body.data).to.have.property("id");
      expect(response.body.data.name).to.eq(validUser.name);
      expect(response.body.data.email).to.eq(validUser.email);
    });
  });
});
