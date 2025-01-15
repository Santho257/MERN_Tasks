import { afterEach, describe, test } from "mocha";
import User from "../../src/models/users.model.js";
import { chai, expect } from "../chai.js";
import { BASE_URL } from "../../src/constants.js";
import logger from "../../src/config/logger.config.js";
import { server } from "../../src/index.js";

describe("Authentication Tests", () => {
    before((done) => {
        logger.silent = true;
        User.deleteMany({}).then(() => { done(); });
    });
    describe("POST /auth/signup Tests", () => {
        const url = `${BASE_URL}/auth/signup`;

        test("Suceess", done => {
            chai.request.execute(server).post(url)
                .send({
                    email: "test@testmail.com",
                    password: "Test@123",
                    name: "Test User"
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object').that.has.property("data");
                    expect(res.body.data).to.be.an('object').that.has.property("token");
                    expect(res.body.data.token).to.be.a('string');
                    done();
                });
        });
        test("Email Required", done => {
            chai.request.execute(server).post(url)
                .send({
                    email: "",
                    password: "Test@123",
                    name: "Test User"
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object').that.has.property("errors");
                    expect(res.body.errors).to.be.an('object').that.has.property("email");
                    expect(res.body.errors.email).to.be.a('string').equals("Email is required");
                    done();
                });
        });
        test("Password Length Error", done => {
            chai.request.execute(server).post(url)
                .send({
                    email: "test@testmail.com",
                    password: "Test",
                    name: "Test User"
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object').that.has.property("errors");
                    expect(res.body.errors).to.be.an('object').that.has.property("password");
                    expect(res.body.errors.password).to.be.a('string').equals("Password must be atleast 6 letters");
                    done();
                });
        });

        afterEach((done) => {
            User.deleteMany({}).then(() => { done(); });
        });
    });

    describe("POST /auth/login Tests", () => {
        const url = `${BASE_URL}/auth/login`;

        before(done => {
            User.create({ email: "test@testmail.com", password: "Test@123", name: "Test User" }).then(() => { done() });
        });

        test("Suceess", done => {
            chai.request.execute(server)
                .post(url)
                .send({ email: "test@testmail.com", password: "Test@123" })
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object").that.has.property("data");
                    expect(res.body.data).to.be.an("object").that.has.property("token");
                    expect(res.body.data.token).to.be.a("string");
                    done()
                })
                .catch(err => {
                    console.log(err);
                    done(err)
                })
        });
        test("Wrong password login", done => {
            chai.request.execute(server)
                .post(url)
                .send({ email: "test@testmail.com", password: "Test@1234" })
                .then(res => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").that.has.property("errors");
                    expect(res.body.errors).to.be.an("object").that.has.property("password");
                    expect(res.body.errors.password).to.be.a("string").equals("password doesn't match");
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done(err);
                })
        });
        test("No User found", done => {
            chai.request.execute(server)
                .post(url)
                .send({ email: "test1@testmail.com", password: "Test@1234" })
                .then(res => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an("object").that.has.property("errors");
                    expect(res.body.errors).to.be.an("object").that.has.property("email");
                    expect(res.body.errors.email).to.be.a("string").equals("test1@testmail.com doesn't exist");
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done(err);
                })
        });

        after(done => {
            User.deleteMany({}).then(() => { done() });
        });
    })
    after((done) => {
        logger.silent = false
        User.deleteMany({}).then(() => { done() });
    });
})