/// <reference types="cypress" />

describe("GET /notes/{id} - Retrieve a single note", () => {
  const baseUrl = "https://practice.expandtesting.com/notes/api";
  const getNoteUrl = (id) => `${baseUrl}/notes/${id}`;
  const createNoteUrl = `${baseUrl}/notes`;
  let token;
  let noteId;

  before(() => {
    cy.loginViaAPI()
      .then((t) => {
        token = t;

        return cy.request({
          method: "POST",
          url: createNoteUrl,
          headers: {
            "x-auth-token": token,
          },
          body: {
            title: "Note for GET by ID",
            description: "This note will be retrieved by ID",
            category: "Work",
          },
        });
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        noteId = response.body.data.id;
      });
  });

  // Test 1
  it("Should retrieve a note by valid ID", () => {
    cy.request({
      method: "GET",
      url: getNoteUrl(noteId),
      headers: {
        "x-auth-token": token,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.eq(true);
      expect(res.body.message).to.eq("Note successfully retrieved");

      const note = res.body.data;
      expect(note.id).to.eq(noteId);
      expect(note.title).to.eq("Note for GET by ID");
      expect(note).to.have.property("description");
      expect(note).to.have.property("completed");
      expect(note).to.have.property("created_at");
      expect(note).to.have.property("updated_at");
      expect(note).to.have.property("user_id");
    });
  });

  // Test 2
  it("Should fail to retrieve note without token", () => {
    cy.request({
      method: "GET",
      url: getNoteUrl(noteId),
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.success).to.eq(false);
      expect(res.body.message).to.include("No authentication token");
    });
  });

  // Test 3
  it("Should fail with invalid token", () => {
    cy.request({
      method: "GET",
      url: getNoteUrl(noteId),
      headers: {
        "x-auth-token": "invalid-token-xyz",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.success).to.eq(false);
    });
  });

  // Test 4
  it("Should return 400 or 500 for invalid note ID", () => {
    cy.request({
      method: "GET",
      url: getNoteUrl("invalid-id-123"),
      headers: {
        "x-auth-token": token,
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect([400, 500]).to.include(res.status);
      expect(res.body.success).to.eq(false);
    });
  });
});
