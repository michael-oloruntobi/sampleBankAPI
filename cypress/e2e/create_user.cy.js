describe("Create User API Test", () => {
  beforeEach(() => {
    cy.fixture("endpoints").then(function (endpoints) {
      this.endpoints = endpoints;
    });
    cy.fixture("param").then(function (param) {
      this.param = param;
    });
  });

  it("create a new user successfully", function () {
    cy.request({
      method: "POST",
      url: this.endpoints.create_user,
      headers: this.param.header,
      body: {
        username: this.param.username,
        email: this.param.email,
        password: this.param.password,
        first_name: this.param.first_name,
        last_name: this.param.last_name,
        age: this.param.age,
        pin: this.param.pin,
        address: {
          street: this.param.address.street,
          city: this.param.address.city,
          state: this.param.address.state,
          country: this.param.address.country,
          zipcode: this.param.address.zipcode,
        },
        phone_number: this.param.phone_number,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.user_id).to.equal(this.param.user_id);
      expect(response.body.username).to.equal(this.param.username);
      expect(response.body.email).to.equal(this.param.email);
      expect(response.body.first_name).to.equal(this.param.first_name);
      expect(response.body.last_name).to.equal(this.param.last_name);
      expect(response.body.status).to.equal(this.param.status);
      expect(response.body.wallet_id).to.equal(this.param.wallet_id);
      expect(response.body.created_at).to.exist;
    });
  });

  it("returns an error message when username field is blank", function () {
    cy.request({
      method: "POST",
      url: this.endpoints.create_user,
      headers: this.param.header,
      body: {
        username: "",
        email: this.param.email,
        password: this.param.password,
        first_name: this.param.first_name,
        last_name: this.param.last_name,
        age: this.param.age,
        pin: this.param.pin,
        address: {
          street: this.param.address.street,
          city: this.param.address.city,
          state: this.param.address.state,
          country: this.param.address.country,
          zipcode: this.param.address.zipcode,
        },
        phone_number: this.param.phone_number,
      },
      failOnStatusCode: false, // Allows the request to fail without Cypress treating it as an error
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal(this.param.status2);
      expect(response.body.message).to.equal("Username is required.");
    });
  });

  it("returns an error message when email field is blank", function () {
    cy.request({
      method: "POST",
      url: this.endpoints.create_user,
      headers: this.param.header,
      body: {
        username: this.param.username,
        email: "",
        password: this.param.password,
        first_name: this.param.first_name,
        last_name: this.param.last_name,
        age: this.param.age,
        pin: this.param.pin,
        address: {
          street: this.param.address.street,
          city: this.param.address.city,
          state: this.param.address.state,
          country: this.param.address.country,
          zipcode: this.param.address.zipcode,
        },
        phone_number: this.param.phone_number,
      },
      failOnStatusCode: false, // Allows the request to fail without Cypress treating it as an error
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal(this.param.status2);
      expect(response.body.message).to.equal("Email is required.");
    });
  });

  it("returns an error message when password field is blank", function () {
    cy.request({
      method: "POST",
      url: this.endpoints.create_user,
      headers: this.param.header,
      body: {
        username: this.param.username,
        email: this.param.email,
        password: "",
        first_name: this.param.first_name,
        last_name: this.param.last_name,
        age: this.param.age,
        pin: this.param.pin,
        address: {
          street: this.param.address.street,
          city: this.param.address.city,
          state: this.param.address.state,
          country: this.param.address.country,
          zipcode: this.param.address.zipcode,
        },
        phone_number: this.param.phone_number,
      },
      failOnStatusCode: false, // Allows the request to fail without Cypress treating it as an error
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal(this.param.status2);
      expect(response.body.message).to.equal("Password is required.");
    });
  });

  it("returns an error message when for duplicate username check", function () {
    cy.request({
      method: "POST",
      url: this.endpoints.create_user,
      headers: this.param.header,
      body: {
        username: this.param.username1,
        email: this.param.email,
        password: this.param.password,
        first_name: this.param.first_name,
        last_name: this.param.last_name,
        age: this.param.age,
        pin: this.param.pin,
        address: {
          street: this.param.address.street,
          city: this.param.address.city,
          state: this.param.address.state,
          country: this.param.address.country,
          zipcode: this.param.address.zipcode,
        },
        phone_number: this.param.phone_number,
      },
      failOnStatusCode: false, // Allows the request to fail without Cypress treating it as an error
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal(this.param.status2);
      expect(response.body.message).to.equal("Username has already been used");
    });
  });
});
