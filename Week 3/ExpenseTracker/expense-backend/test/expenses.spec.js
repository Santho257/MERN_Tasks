import { beforeEach, describe, test } from "mocha";
import { User } from "../src/models/users.model.js";
import { generateToken } from "../src/services/jwt.service.js";
import { ExpenseList } from "../src/models/expenseList.model.js";
import { Expense } from "../src/models/expenses.model.js";
import { BASE_URL } from "../src/constants.js";
import { server } from "../src/index.js";
import { chai, expect } from "./chai.js";

describe.only("Expense Tests", () => {
    const url = `${BASE_URL}/expenses`
    let token, expenseList;
    before(done => {
        User.create({
            email: "test@gmail.com",
            name: "Test User",
            password: "Test@123"
        }).then(user => {
            token = generateToken({ id: user.id, name: user.name });
            ExpenseList.create({
                title: "Test Expense List",
                createdBy: user.id
            }).then(exp => {
                expenseList = exp.id;
                done();
            })
        }).catch((err) => {
            console.log(err);
            done(err)
        });
    });

    describe("POST /expenses", () => {
        test("success", done => {
            chai.request.execute(server)
                .post(url)
                .send({
                    source: "Test Expense 1",
                    amount: 10,
                    category: "food",
                    date: "2025-01-02",
                    expenseList
                })
                .set('Authorization', token)
                .end((err, res) => {
                    expect(res).has.status(201);
                    expect(res.body).to.be.an('object').that.has.a.property('data');
                    expect(res.body.data).to.be.an('object').that.has.a.property('_id');
                    expect(res.body.data._id).to.be.a('string');
                    done();
                });
        });
        test("Wrong feilds", done => {
            chai.request.execute(server)
                .post(url)
                .send({
                    amount: -10,
                    category: "foood",
                    date: "2026-01-02",
                    expenseList
                })
                .set('Authorization', token)
                .end((err, res) => {
                    expect(res).has.status(400);
                    expect(res.body).to.be.an('object').that.has.a.property('errors');
                    expect(res.body.errors).to.be.an('object').that.has.a.property('amount');
                    expect(res.body.errors.amount).to.be.a('string').equals("Amount must be greater than zero");
                    expect(res.body.errors).to.be.an('object').that.has.a.property('source');
                    expect(res.body.errors.source).to.be.a('string').equals("Source cannot be empty");
                    expect(res.body.errors).to.be.an('object').that.has.a.property('category');
                    expect(res.body.errors.category).to.be.a('string').equals("FOOOD is not supported");
                    done();
                });
        });
        test('Providing Wrong expenseId', done => {
            const fakeId = expenseList.slice(0, 20) + "1234";
            chai.request.execute(server)
                .post(url)
                .send({
                    source: "Test Expense 1",
                    amount: 10,
                    category: "food",
                    date: "2025-01-02",
                    expenseList: fakeId
                })
                .set('Authorization', token)
                .end((err, res) => {
                    expect(res).has.status(404);
                    expect(res.body).to.be.an('object').that.has.a.property('errors');
                    expect(res.body.errors).to.be.an('object').that.has.a.property('expenseList');
                    expect(res.body.errors.expenseList).to.be.a('string').equals(`${fakeId} not found`);
                    done();
                })
        });
        test("Accessing other Expense", done => {
            chai.request.execute(server)
                .post(`${BASE_URL}/auth/signup`)
                .send({ email: "test1@test.com", password: "Test@123", name: "Test User 2" })
                .then(user => {
                    chai.request.execute(server)
                        .post(url)
                        .send({
                            source: "Test Expense 1",
                            amount: 10,
                            category: "food",
                            date: "2025-01-02",
                            expenseList
                        })
                        .set('Authorization', user.body.data.token)
                        .end((err, res) => {
                            expect(res).has.status(403);
                            expect(res.body).to.be.an('object').that.has.a.property('errors');
                            expect(res.body.errors).to.be.an('object').that.has.a.property('token');
                            expect(res.body.errors.token).to.be.a('string').equals(`Not authorized`);
                            User.deleteMany({}).then(() => {
                                done();
                            })
                        });
                });
        });
        after((done) => {
            Expense.deleteMany({}).then(() => {
                done();
            })
        });
    });
    describe("GET /expenses/expenselists/:id", () => {
        before(done => {
            Expense.create({
                source: "Test Expense 1",
                amount: 10,
                category: "food",
                date: "2025-01-02",
                expenseList
            }).then(() => done());
        });
        test("Success", done => {
            chai.request.execute(server)
                .get(`${url}/explists/${expenseList}`)
                .set("Authorization", token)
                .end((err, res) => {
                    expect(res).has.status(200);
                    expect(res.body).to.be.an('object').that.has.a.property('data');
                    expect(res.body.data).to.be.an('array');
                    expect(res.body.data.length).equals(1);
                    done();
                })
        });
        test("Unknown Explist ID", done => {
            chai.request.execute(server)
                .get(`${url}/explists/${expenseList}a`)
                .set("Authorization", token)
                .end((err, res) => {
                    expect(res).has.status(400);
                    expect(res.body).to.be.an('object').that.has.a.property('errors');
                    expect(res.body.errors).to.be.an('object').has.property('id');
                    expect(res.body.errors.id).to.be.a('string').equals(expenseList+"a is not ObjectID");
                    done();
                })
        });
        test("Not Found ID", done => {
            const fakeId = expenseList.slice(0, 20) + "1234"
            chai.request.execute(server)
                .get(`${url}/explists/${fakeId}`)
                .set("Authorization", token)
                .end((err, res) => { 
                    expect(res).has.status(404);
                    expect(res.body).to.be.an('object').that.has.a.property('errors');
                    expect(res.body.errors).to.be.an('object').has.property('expenseList');
                    expect(res.body.errors.expenseList).to.be.a('string').equals(`${fakeId} not found`);
                    done();
                })
        });
        test("Accessing other Expense", done => {
            chai.request.execute(server)
                .post(`${BASE_URL}/auth/signup`)
                .send({ email: "test1@test.com", password: "Test@123", name: "Test User 2" })
                .then(user => {
                    chai.request.execute(server)
                        .get(`${url}/explists/${expenseList}`)
                        .set('Authorization', user.body.data.token)
                        .end((err, res) => {
                            expect(res).has.status(403);
                            expect(res.body).to.be.an('object').that.has.a.property('errors');
                            expect(res.body.errors).to.be.an('object').that.has.a.property('token');
                            expect(res.body.errors.token).to.be.a('string').equals(`Not authorized`);
                            User.deleteMany({}).then(() => {
                                done();
                            })
                        });
                });
        });
        after((done) => {
            Expense.deleteMany({}).then(() => {
                done();
            })
        });
    });
    

    afterEach((done) => {
        Expense.deleteMany({}).then(() => {
            done();
        })
    });
    after(done => {
        User.deleteMany({})
            .then(() => {
                ExpenseList.deleteMany({})
                    .then(() => {
                        done();
                    })
            })
            .catch(done);
    })
})