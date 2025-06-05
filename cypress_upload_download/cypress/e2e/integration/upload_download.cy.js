describe("File upload and download tests", () => {
  beforeEach(() => {
    cy.visit("https://filebin.net/");
  });

  it("Upload file and download it in Zip format", () => {
    cy.get("#fileField").attachFile("fileToUpload.png");

    cy.contains("It contains 1 uploaded file").should("be.visible");

    cy.contains("Download files").click();

    cy.contains("Zip")
      .should("have.attr", "href")
      .then((href) => {
        const absoluteLink = "https://filebin.net" + href;

        cy.downloadFile(
          absoluteLink,
          "mydownloads/zipFiles",
          "downloadedFromCypress.zip"
        );

        cy.readFile(
          "mydownloads/zipFiles/downloadedFromCypress.zip",
          "binary",
          { timeout: 10000 }
        ).should((buffer) => {
          expect(buffer.length).to.be.greaterThan(100);
        });
      });
  });
});
