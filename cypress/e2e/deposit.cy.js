describe("Deposit API Test", () => {
  beforeEach(() => {
    cy.fixture("endpoints").then(function (endpoints) {
      this.endpoints = endpoints;
    });
    cy.fixture("param").then(function (param) {
      this.param = param;
    });
  });

  it("send a deposit request successfully", function () {
    cy.request({
      method: "POST",
      url: this.endpoints.deposit,
      headers: this.param.header,
      body: {
        user_id: this.param.user_id,
        wallet_id: this.param.wallet_id,
        currency: this.param.currency,
        amount: 100.0,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Deposit request received.");
      expect(response.body.status).to.equal(this.param.status1);
      expect(response.body.data.user_id).to.equal(this.param.user_id);
      expect(response.body.data.wallet_id).to.equal(this.param.wallet_id);
      expect(response.body.data.amount).to.equal(100);
      expect(response.body.data.transaction_id).to.equal("123ABC456DEF");
    });
  });

  it("returns an error message when user id field is blank", function () {
    cy.request({
      method: "POST",
      url: this.endpoints.deposit,
      headers: this.param.header,
      body: {
        user_id: "",
        wallet_id: this.param.wallet_id,
        currency: this.param.currency,
        amount: 100.0,
      },
      failOnStatusCode: false, // Allows the request to fail without Cypress treating it as an error
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal(this.param.status2);
      expect(response.body.message).to.equal("User ID is required.");
    });
  });

  it("returns an error message when wallet id field is blank", function () {
    cy.request({
      method: "POST",
      url: this.endpoints.deposit,
      headers: this.param.header,
      body: {
        user_id: this.param.user_id,
        wallet_id: "",
        currency: this.param.currency,
        amount: 100.0,
      },
      failOnStatusCode: false, // Allows the request to fail without Cypress treating it as an error
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal(this.param.status2);
      expect(response.body.message).to.equal("Wallet ID is required.");
    });
  });

  it("returns an error message when amount is invalid: negative amount", function () {
    cy.request({
      method: "POST",
      url: this.endpoints.deposit,
      headers: this.param.header,
      body: {
        user_id: this.param.user_id,
        wallet_id: this.param.wallet_id,
        currency: this.param.currency,
        amount: -100.0,
      },
      failOnStatusCode: false, // Allows the request to fail without Cypress treating it as an error
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal(this.param.status2);
      expect(response.body.message).to.equal("Negative numbers not allowed");
    });
  });

  it("returns an error message when amount is invalid: string", function () {
    cy.request({
      method: "POST",
      url: this.endpoints.deposit,
      headers: this.param.header,
      body: {
        user_id: this.param.user_id,
        wallet_id: this.param.wallet_id,
        currency: this.param.currency,
        amount: "100.00",
      },
      failOnStatusCode: false, // Allows the request to fail without Cypress treating it as an error
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal(this.param.status2);
      expect(response.body.message).to.equal(
        "Invalid amount. String not allowed"
      );
    });
  });
});
