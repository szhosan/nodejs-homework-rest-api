const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const app = require("../../app");
const { User } = require("../../models/userModel");
const gravatar = require("gravatar");

const { MONGO_URL_TEST, PORT = 3001 } = process.env;

describe("test", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => {
    server.close();
  });

  beforeEach((done) => {
    mongoose.connect(MONGO_URL_TEST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login route", async () => {
    const newUser = {
      email: "testuser@gmail.com",
      password: "test-user-password",
      avatarURL: gravatar.url(this.email),
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "testuser@gmail.com",
      password: "test-user-password",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
