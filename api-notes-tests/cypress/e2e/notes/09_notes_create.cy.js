/// <reference types="cypress" />

describe("POST /notes - Create Note", () => {
  const createNoteUrl = "https://practice.expandtesting.com/notes/api/notes";
  let token;

  before(() => {
    cy.loginStaticUser().then((t) => {
      token = t;
    });
  });

  // Test 1 : note created successfully
  it("Should create a note with all expected fields", () => {
    const newNote = {
      title: "Note test",
      description: "This note was created during automated testing",
      category: "Home",
    };

    cy.request({
      method: "POST",
      url: createNoteUrl,
      headers: {
        "x-auth-token": token,
      },
      body: newNote,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true);
      expect(response.body.message).to.eq("Note successfully created");
      expect(response.body.data).to.have.property("id");
    });
  });

  // Test 2 : failure without token
  it("Should fail without token", () => {
    cy.request({
      method: "POST",
      url: createNoteUrl,
      failOnStatusCode: false,
      body: {
        title: "Note no token",
        description: "Missing token",
        category: "Home",
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.include("No authentication token");
    });
  });

  // Test 3 : failure with invalid token
  it("Should fail with invalid token", () => {
    cy.request({
      method: "POST",
      url: createNoteUrl,
      failOnStatusCode: false,
      headers: {
        "x-auth-token": "invalid-token-123",
      },
      body: {
        title: "Note invalid token",
        description: "Should fail",
        category: "Work",
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.include(
        "Access token is not valid or has expired, you will need to login"
      );
    });
  });

  // Test 4 : failure without title
  it("Should fail without title", () => {
    cy.request({
      method: "POST",
      url: createNoteUrl,
      headers: {
        "x-auth-token": token,
      },
      failOnStatusCode: false,
      body: {
        description: "No title provided",
        category: "Home",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.include(
        "Title must be between 4 and 100 characters"
      );
    });
  });

  // Test 5 : failure without description
  it("Should fail without description", () => {
    cy.request({
      method: "POST",
      url: createNoteUrl,
      headers: {
        "x-auth-token": token,
      },
      failOnStatusCode: false,
      body: {
        title: "No description",
        category: "Home",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.include(
        "Description must be between 4 and 1000 characters"
      );
    });
  });

  // Test 6 : failure without category
  it("Should fail without category", () => {
    cy.request({
      method: "POST",
      url: createNoteUrl,
      headers: {
        "x-auth-token": token,
      },
      failOnStatusCode: false,
      body: {
        title: "No category",
        description: "Missing category",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.include(
        "Category must be one of the categories: Home, Work, Personal"
      );
    });
  });

  // Test 7 : empty values
  it("Should fail with empty values", () => {
    cy.request({
      method: "POST",
      url: createNoteUrl,
      headers: {
        "x-auth-token": token,
      },
      failOnStatusCode: false,
      body: {
        title: "",
        description: "",
        category: "",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.eq(false);
      expect(response.body.message).to.include(
        "Title must be between 4 and 100 characters"
      );
    });
  });

  // Test 8 : failure with too long values
  it("Should handle very long input fields", () => {
    const longString = "A".repeat(1000);

    cy.request({
      method: "POST",
      url: createNoteUrl,
      headers: {
        "x-auth-token": token,
      },
      failOnStatusCode: false,
      body: {
        title: longString,
        description: longString,
        category: longString,
      },
    }).then((response) => {
      expect([200, 400]).to.include(response.status);
    });
  });
});
