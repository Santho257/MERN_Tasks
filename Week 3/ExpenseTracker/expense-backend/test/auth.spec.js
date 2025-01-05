import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { beforeEach, describe, it } from "mocha";
import {app} from "../src/index.js";
import { User } from "../src/models/users.model.js";
import { BASE_URL } from "../src/constants.js";

const chai = chaiModule.use(chaiHttp);
const expect = chaiModule.expect;

describe.only("Auth Tests", () => {
  const baseurl = `${BASE_URL}/auth`
  beforeEach((done) => {
    User.deleteMany({}).then((res) => {
      done();
    });
  });
  describe("Signup tests", () => {
    const url = `${baseurl}/signup`;
    it("POST /auth/signup perfect", (done) => {
      chai.request
        .execute(app)
        .post(url)
        .send({
          email: "santho@gmail.com",
          password: "santho@257",
          name: "Santhosh",
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.be.an("object");
          expect(res.body.data).to.have.property("token");
          expect(res.body.data.token).to.be.a("string");
          done();
        });
    });
    it("POST /auth/signup missing fields", (done) => {
      chai.request
        .execute(app)
        .post(url)
        .send({
          email: "santho@gmail.com",
          password: "",
          name: "Santhosh",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors).to.be.an("object");
          expect(res.body.errors).to.have.property("password");
          expect(res.body.errors.password).to.be.a("string");
          expect(res.body.errors.password).to.be.equal("Password is required");
          done();
        });
    });
    it("POST /auth/signup existing email", (done) => {
      User.create({
        email: "santho@gmail.com",
        password: "santho@257",
        name: "Santhosh",
      }).then(() => {
        chai.request
          .execute(app)
          .post(url)
          .send({
            email: "santho@gmail.com",
            password: "Santho@257",
            name: "Santhosh",
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors).to.be.an("object");
            expect(res.body.errors).to.have.property("email");
            expect(res.body.errors.email).to.be.a("string");
            expect(res.body.errors.email).to.be.equal(
              "santho@gmail.com already exists!"
            );
            done();
          });
      });
    });
  });
  describe("Login tests", () => {
    const url = `${baseurl}/login`;
    it("POST /auth/login successful", (done) => {
      User.create({
        email: "santho@gmail.com",
        password: "Santho@257",
        name: "Santhosh",
      }).then(() => {
        chai.request
          .execute(app)
          .post(url)
          .send({
            email: "santho@gmail.com",
            password: "Santho@257",
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("data");
            expect(res.body.data).to.be.an("object");
            expect(res.body.data).to.have.property("token");
            expect(res.body.data.token).to.be.a("string");
            done();
          });
      });
    });
    it("POST /auth/login Empty field", (done) => {
      chai.request
        .execute(app)
        .post(url)
        .send({
          password: "Santho@257",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors).to.be.an("object");
          expect(res.body.errors).to.have.property("email");
          expect(res.body.errors.email).to.be.equal("email is required");
          done();
        });
    });
    it("POST /auth/login Email Not found", (done) => {
      chai.request
        .execute(app)
        .post(url)
        .send({
          email: "santho@gmail.com",
          password: "Santho@257",
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors).to.be.an("object");
          expect(res.body.errors).to.have.property("email");
          expect(res.body.errors.email).to.be.equal(
            `santho@gmail.com doesn't exist`
          );
          done();
        });
    });
    it("POST /auth/login Password Mismatch", (done) => {
      User.create({
        email: "santho@gmail.com",
        password: "Santho@257",
        name: "Santhosh",
      }).then(() => {
        chai.request
          .execute(app)
          .post(url)
          .send({
            email: "santho@gmail.com",
            password: "santho@257",
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors");
            expect(res.body.errors).to.be.an("object");
            expect(res.body.errors).to.have.property("password");
            expect(res.body.errors.password).to.be.a("string");
            expect(res.body.errors.password).to.be.equal("password doesn't match");
            done();
          });
      });
    });
  })
});
