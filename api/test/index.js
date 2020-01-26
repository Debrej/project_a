const request = require("supertest");
const server = require("../index.js");

describe("project a api", function() {
  after(function() {
    server.close();
  });
  describe("has user requests", function() {
    require("./user.js")(server, request);
  });
});
