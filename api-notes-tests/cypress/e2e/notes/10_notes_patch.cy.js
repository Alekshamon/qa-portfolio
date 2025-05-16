/// <reference types="cypress" />

describe("PATCH /notes/{id} - Update note completion status", () => {
  const baseUrl = "https://practice.expandtesting.com/notes/api";
  const createNoteUrl = `${baseUrl}/notes`;
  const patchNoteUrl = (id) => `${baseUrl}/notes/${id}`;
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
            title: "Note to complete",
            description: "Initial status: not completed",
            category: "Home",
          },
        });
      })
      .then((res) => {
        noteId = res.body.data.id;
      });
  });

  //  Test 1
  it("Should update completed status to true", () => {
    cy.request({
      method: "PATCH",
      url: patchNoteUrl(noteId),
      headers: {
        "x-auth-token": token,
      },
      body: {
        completed: true,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.eq(true);
      expect(res.body.message).to.eq("Note successfully Updated");
      expect(res.body.data.completed).to.eq(true);
    });
  });

  // Test 2
  it("Should fail to update without token", () => {
    cy.request({
      method: "PATCH",
      url: patchNoteUrl(noteId),
      body: {
        completed: false,
      },
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
      method: "PATCH",
      url: patchNoteUrl(noteId),
      headers: {
        "x-auth-token": "invalid-token-123",
      },
      body: {
        completed: false,
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.success).to.eq(false);
    });
  });

  // Test 4
  it("Should return error for invalid note ID", () => {
    cy.request({
      method: "PATCH",
      url: patchNoteUrl("invalid-id-xyz"),
      headers: {
        "x-auth-token": token,
      },
      body: {
        completed: true,
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect([400, 500]).to.include(res.status);
      expect(res.body.success).to.eq(false);
    });
  });
});
