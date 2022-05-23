import request from "supertest";
import { app } from "../../app";

it("fails when non existing email is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  const email = "test@test.com";
  const password = "password";
  const wrongPassword = "";

  await request(app)
    .post("/api/users/signup")
    .send({
      email: email,
      password: password,
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: email, password: wrongPassword })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  const email = "test@test.com";
  const password = "password";

  await request(app)
    .post("/api/users/signup")
    .send({
      email: email,
      password: password,
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: email, password: password })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
