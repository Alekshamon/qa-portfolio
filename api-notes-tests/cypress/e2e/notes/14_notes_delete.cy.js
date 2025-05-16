/// <reference types="cypress" />

describe("DELETE /notes/{id} - Delete a note", () => {
  const baseUrl = "https://practice.expandtesting.com/notes/api";
  const createNoteUrl = `${baseUrl}/notes`;
  const deleteNoteUrl = (id) => `${baseUrl}/notes/${id}`;
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
            title: "Note to delete",
            description: "This note will be deleted",
            category: "Home",
          },
        });
      })
      .then((res) => {
        noteId = res.body.data.id;
      });
  });

  // Test 1
  it("Should delete a note with a valid ID and token", () => {
    cy.request({
      method: "DELETE",
      url: deleteNoteUrl(noteId),
      headers: {
        "x-auth-token": token,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.eq(true);
      expect(res.body.message).to.eq("Note successfully deleted");
    });
  });

  // Test 2
  it("Should fail to delete a note without token", () => {
    cy.request({
      method: "DELETE",
      url: deleteNoteUrl(noteId),
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
      method: "DELETE",
      url: deleteNoteUrl(noteId),
      headers: {
        "x-auth-token": "invalid-token-123",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.success).to.eq(false);
    });
  });

  //  Test 4
  it("Should return error for invalid or non-existent note ID", () => {
    cy.request({
      method: "DELETE",
      url: deleteNoteUrl("invalid-note-id-xyz"),
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
