/// <reference types="cypress" />

describe("PUT /notes/{id} - Update a note", () => {
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
            title: "Note to update",
            description: "Original content",
            category: "Personal",
          },
        });
      })
      .then((res) => {
        noteId = res.body.data.id;
      });
  });

  // Test 1
  it("Should update the note with valid data", () => {
    const updatedNote = {
      title: "Updated Title",
      description: "Updated description",
      category: "Home",
      completed: true,
    };

    cy.request({
      method: "PUT",
      url: getNoteUrl(noteId),
      headers: {
        "x-auth-token": token,
      },
      body: updatedNote,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.eq(true);
      expect(res.body.message).to.eq("Note successfully Updated");

      const note = res.body.data;
      expect(note.id).to.eq(noteId);
      expect(note.title).to.eq(updatedNote.title);
      expect(note.description).to.eq(updatedNote.description);
      expect(note.category).to.eq(updatedNote.category);
      expect(note.completed).to.eq(true);
    });
  });

  // Test 2
  it("Should fail to update without token", () => {
    cy.request({
      method: "PUT",
      url: getNoteUrl(noteId),
      failOnStatusCode: false,
      body: {
        title: "Fail title",
        description: "Should not update",
        category: "Home",
        completed: false,
      },
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.success).to.eq(false);
      expect(res.body.message).to.include("No authentication token");
    });
  });

  //  Test 3
  it("Should fail with invalid token", () => {
    cy.request({
      method: "PUT",
      url: getNoteUrl(noteId),
      failOnStatusCode: false,
      headers: {
        "x-auth-token": "invalid-token-abc",
      },
      body: {
        title: "Should not update",
        description: "Invalid token",
        category: "Work",
        completed: false,
      },
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.success).to.eq(false);
    });
  });

  //  Test 4
  it("Should fail with invalid title", () => {
    cy.request({
      method: "PUT",
      url: getNoteUrl(noteId),
      headers: {
        "x-auth-token": token,
      },
      failOnStatusCode: false,
      body: {
        title: "a", // trop court
        description: "Short title test",
        category: "Work",
        completed: false,
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.success).to.eq(false);
      expect(res.body.message).to.include("Title must be between");
    });
  });

  //  Test 5
  it("Should return error for invalid note ID", () => {
    cy.request({
      method: "PUT",
      url: getNoteUrl("invalid-note-id-123"),
      headers: {
        "x-auth-token": token,
      },
      failOnStatusCode: false,
      body: {
        title: "Valid title",
        description: "Valid desc",
        category: "Work",
        completed: false,
      },
    }).then((res) => {
      expect([400, 500]).to.include(res.status);
      expect(res.body.success).to.eq(false);
    });
  });
});
