import { before, beforeEach, describe, test } from "mocha";
import { ExpenseList } from "../src/models/expenseList.model.js";
import { BASE_URL } from "../src/constants.js";
import { User } from "../src/models/users.model.js";
import { generateToken } from "../src/services/jwt.service.js";
import { server } from "../src/index.js";
import { chai, expect } from "./chai.js";

describe.only("Expense List Tests", () => {
    const url = `${BASE_URL}/explists`;
    let token;
    before((done) => {
        User.create({
            email: "test@gmail.com",
            password: "Test@123",
            name: "Test User",
        }).then((res) => {
            id = res._id;
            token = generateToken({ id, name: res.name });
            done();
        });
    });
    beforeEach((done) => {
        ExpenseList.deleteMany({}).then((res) => {
            done();
        });
    });
    describe("POST /explist checking", () => {
        test("POST /explists success", (done) => {
            chai.request
                .execute(server)
                .post(url)
                .set("Authorization", token)
                .send({
                    title: "Test Expense List",
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("object");
                    expect(res.body).to.have.property("data");
                    expect(res.body.data).to.be.an("object");
                    expect(res.body.data).to.have.property("_id");
                    expect(res.body.data._id).to.be.a("string");
                    done();
                });
        });
        test("POST /explists no title", (done) => {
            chai.request
                .execute(server)
                .post(url)
                .set("Authorization", token)
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object");
                    expect(res.body).to.have.property("errors");
                    expect(res.body.errors).to.be.an("object");
                    expect(res.body.errors).to.have.property("title");
                    expect(res.body.errors.title).to.be.a("string");
                    expect(res.body.errors.title).to.equal("Title is required");
                    done();
                });
        });
    });
    describe("GET /explists", () => {
        test('GET /explists Success', (done) => {
            ExpenseList.create({
                title: "Test List",
                createdBy: id
            }).then(() => {
                chai.request.execute(server)
                    .get(url)
                    .set("Authorization", token)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('data');
                        expect(res.body.data).to.be.an('array');
                        expect(res.body.data[0]).to.be.an('object');
                        expect(res.body.data[0]).to.have.property('title');
                        expect(res.body.data[0].title).to.be.a('string');
                        expect(res.body.data[0].title).to.equal('Test List');
                        done();
                    })
            })
        })
        test('GET /explists Not sending token', (done) => {
            ExpenseList.create({
                title: "Test List",
                createdBy: id
            }).then(() => {
                chai.request.execute(server)
                    .get(url)
                    .end((err, res) => {
                        expect(res).to.have.status(401);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('errors');
                        expect(res.body.errors).to.be.an('object');
                        expect(res.body.errors).to.have.property('token');
                        expect(res.body.errors.token).to.be.a('string');
                        expect(res.body.errors.token).equals('Token not found');
                        done();
                    })
            })
        });
        test('GET /explists Modified token', (done) => {
            ExpenseList.create({
                title: "Test List",
                createdBy: id
            }).then(() => {
                chai.request.execute(server)
                    .get(url)
                    .set("Authorization", "invalid.token.sent")
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('errors');
                        expect(res.body.errors).to.be.an('object');
                        expect(res.body.errors).to.have.property('token');
                        expect(res.body.errors.token).to.be.a('string');
                        expect(res.body.errors.token).equals('Invalid Token');
                        done();
                    })
            })
        })
    });
    describe("GET /explist/:id", () => {
        let expId;
        beforeEach((done) => {
            ExpenseList.create({
                title: "Test List",
                createdBy: id
            }).then((exp) => {
                expId = exp.id;
                done()
            })
        })
        test("success", done => {
            chai.request.execute(server)
                .get(`${url}/${expId}`)
                .set("Authorization", token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data).to.have.property('_id');
                    expect(res.body.data.id).to.be.a('string');
                    expect(res.body.data.id).to.equal(expId);
                    expect(res.body.data).to.have.property('title');
                    expect(res.body.data.title).to.be.a('string');
                    expect(res.body.data.title).to.equal('Test List');
                    done();
                })
        })
        test("Invalid ID", done => {
            chai.request.execute(server)
                .get(`${url}/invalid`)
                .set("Authorization", token)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('errors');
                    expect(res.body.errors).to.be.an('object');
                    expect(res.body.errors).that.has.property('id');
                    expect(res.body.errors.id).to.be.a('string');
                    expect(res.body.errors.id).equals('invalid is not ObjectID');
                    done();
                })
        });
        test("Not found ID", (done) => {
            const fakeId = expId.slice(0, 20) + "1234";
            chai.request.execute(server)
                .get(`${url}/${fakeId}`)
                .set("Authorization", token)
                .end((err, res) => {
                    try {
                        expect(res).to.have.status(404);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('errors');
                        expect(res.body.errors).to.be.an('object');
                        expect(res.body.errors).that.has.property('id');
                        expect(res.body.errors.id).to.be.a('string');
                        expect(res.body.errors.id).equals('Not found');
                        done();
                    }
                    catch (err) {
                        done(err)
                    }
                })
        })
        test("Trying to access other data", (done) => {
            chai.request
            .execute(server)
            .post(`${BASE_URL}/auth/signup`)
            .send({
                email: "test1@gmail.com",
                password: "Test@123",
                name: "Test User1",
            }).then((user) => {
                chai.request.execute(server)
                    .get(`${url}/${expId}`)
                    .set("Authorization", user.body.data.token)
                    .then((res) => {
                        try {
                            expect(res).to.have.status(403);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property('errors');
                            expect(res.body.errors).to.be.an('object');
                            expect(res.body.errors).that.has.property('token');
                            expect(res.body.errors.token).to.be.a('string');
                            expect(res.body.errors.token).equals('Access Denied');
                            done();
                        }
                        catch (err) {
                            done(err)
                        }
                    }).catch(err => {
                        console.log("Error");
                        done(err);
                    })
            })
        })
        afterEach((done) => {
            ExpenseList.deleteMany({}).then(() => done()).catch(done);
        })
    })
    after((done) => {
        User.deleteMany({}).then((res) => {
            done();
        });
    });
});
