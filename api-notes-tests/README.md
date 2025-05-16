# ✅ API Test Automation with Cypress - Notes App

This project demonstrates complete API test automation for the **Notes Management API** from [Expand Testing](https://practice.expandtesting.com/notes/api/api-docs/).  
It is built using **Cypress** and follows best practices for test organization, coverage, and reporting.

---

## 🔧 Tech Stack

- 🧪 [Cypress](https://www.cypress.io/) — API testing framework
- 📊 [Mochawesome](https://github.com/adamgruber/mochawesome) — HTML test report generator
- 📁 JSON Fixtures — dynamic and reusable test data

---

## ✅ Covered Features

This project covers all **CRUD operations and authentication** related to:

### 🧍 User Endpoints
- `POST /users/register` — Create account
- `POST /users/login` — Authenticate user
- `GET /users/profile` — Get user profile
- `PATCH /users/profile` — Update profile
- `PATCH /users/change-password` — Change password
- `POST /users/forgot-password` — Trigger password reset
- `POST /users/reset-password` — Reset password with token
- `DELETE /users/logout` — Logout
- `DELETE /users/delete-account` — Delete account

### 🗒️ Notes Endpoints
- `POST /notes` — Create note
- `GET /notes` — List notes
- `GET /notes/{id}` — Get note by ID
- `PUT /notes/{id}` — Full update of a note
- `PATCH /notes/{id}` — Mark note as completed
- `DELETE /notes/{id}` — Delete note

---

## ▶️ How to Run Tests Locally

```bash
# Install dependencies
npm install

# Open Cypress GUI
npx cypress open

# Run all tests in headless mode
npx cypress run

# Run only auth tests
npm run e2e:auth

# Run only users tests
npm run e2e:users

# Run only notes tests
npm run e2e:notes

```

## Test Report (Mochawesome)

- After running the tests with npx cypress run, open the report:

cypress/reports/mochawesome.html

- It includes:

- Test status (pass/fail)

- Detailed request/response

- Screenshots on failure (optional)

## End-to-End Scenario

The notes_e2e.cy.js file performs a complete flow:

- Login

- Create a note

- Get the note

- Update the note

- Patch its status

- Delete the note

Useful for smoke testing or demo.

