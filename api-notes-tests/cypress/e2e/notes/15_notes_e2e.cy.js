/// <reference types="cypress" />

describe("E2E Notes Management Flow", () => {
  const baseUrl = "https://practice.expandtesting.com/notes/api";
  const createNoteUrl = `${baseUrl}/notes`;
  const noteUrl = (id) => `${baseUrl}/notes/${id}`;

  let token;
  let noteId;

  const noteData = {
    title: "E2E Test Note",
    description: "This is a complete test flow",
    category: "Work",
  };

  const updatedNote = {
    title: "Updated E2E Title",
    description: "Updated description content",
    category: "Personal",
    completed: false,
  };

  before(() => {
    cy.loginViaAPI().then((t) => {
      token = t;
    });
  });

  it("Should perform full CRUD flow for a note", () => {
    // Step 1: Create a note
    cy.request({
      method: "POST",
      url: createNoteUrl,
      headers: {
        "x-auth-token": token,
      },
      body: noteData,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.eq(true);
      noteId = res.body.data.id;
    });

    // Step 2: Get the note by ID
    cy.then(() => {
      cy.request({
        method: "GET",
        url: noteUrl(noteId),
        headers: {
          "x-auth-token": token,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data.title).to.eq(noteData.title);
        expect(res.body.data.category).to.eq(noteData.category);
      });
    });

    // Step 3: Update the note with PUT
    cy.then(() => {
      cy.request({
        method: "PUT",
        url: noteUrl(noteId),
        headers: {
          "x-auth-token": token,
        },
        body: updatedNote,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data.title).to.eq(updatedNote.title);
        expect(res.body.data.description).to.eq(updatedNote.description);
        expect(res.body.data.category).to.eq(updatedNote.category);
        expect(res.body.data.completed).to.eq(false);
      });
    });

    // Step 4: Patch the note (set completed to true)
    cy.then(() => {
      cy.request({
        method: "PATCH",
        url: noteUrl(noteId),
        headers: {
          "x-auth-token": token,
        },
        body: {
          completed: true,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data.completed).to.eq(true);
      });
    });

    // Step 5: Delete the note
    cy.then(() => {
      cy.request({
        method: "DELETE",
        url: noteUrl(noteId),
        headers: {
          "x-auth-token": token,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.success).to.eq(true);
      });
    });
  });
});
