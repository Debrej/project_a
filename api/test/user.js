module.exports = function(server, request) {
  it("responds to /user", () => {
    request(server)
      .get("/user")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end(err => {
        if (err) throw err;
      });
  });
};
