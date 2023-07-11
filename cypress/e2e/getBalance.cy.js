describe("Get Balance API Test", () => {
  beforeEach(() => {
    cy.fixture("endpoints").then(function (endpoints) {
      this.endpoints = endpoints;
    });
    cy.fixture("param").then(function (param) {
      this.param = param;
    });
  });

  it("send a get balance request successfully", function () {
    cy.request({
      method: "GET",
      url: this.endpoints.getbalance,
      headers: this.param.header,
      body: {
        user_id: this.param.user_id,
        wallet_id: this.param.wallet_id,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Balance retrieved successfully.");
      expect(response.body.status).to.equal(this.param.status1);
      expect(response.body.data.user_id).to.equal(this.param.user_id);
      expect(response.body.data.wallet_id).to.equal(this.param.wallet_id);
      expect(response.body.data.balance).to.equal(250);
      expect(response.body.data.currency).to.equal(this.param.currency);
    });
  });

  it("returns an error message when user id field is blank", function () {
    cy.request({
      method: "GET",
      url: this.endpoints.getbalance,
      headers: this.param.header,
      body: {
        user_id: "",
        wallet_id: this.param.wallet_id,
      },
      failOnStatusCode: false, // Allows the request to fail without Cypress treating it as an error
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal(this.param.status2);
      expect(response.body.message).to.equal("User ID is required.");
    });
  });

  it("returns an error message for an invalid user id", function () {
    cy.request({
      method: "GET",
      url: this.endpoints.getbalance,
      headers: this.param.header,
      body: {
        user_id: "888888BBBBBBBBBB",
        wallet_id: this.param.wallet_id,
      },
      failOnStatusCode: false, // Allows the request to fail without Cypress treating it as an error
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal(this.param.status2);
      expect(response.body.message).to.equal("User ID is invalid.");
    });
  });

  it("returns an error message when wallet id field is blank", function () {
    cy.request({
      method: "GET",
      url: this.endpoints.getbalance,
      headers: this.param.header,
      body: {
        user_id: this.param.user_id,
        wallet_id: "",
      },
      failOnStatusCode: false, // Allows the request to fail without Cypress treating it as an error
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal(this.param.status2);
      expect(response.body.message).to.equal("Wallet ID is required.");
    });
  });

  it("returns an error message for an invalid wallet id", function () {
    cy.request({
      method: "GET",
      url: this.endpoints.getbalance,
      headers: this.param.header,
      body: {
        user_id: this.param.user_id,
        wallet_id: "88292929BBNNNNN",
      },
      failOnStatusCode: false, // Allows the request to fail without Cypress treating it as an error
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal(this.param.status2);
      expect(response.body.message).to.equal("Wallet ID is invalid.");
    });
  });
});
