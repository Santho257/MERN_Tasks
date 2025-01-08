import * as chaiModule from 'chai';
import chaiHttp  from "chai-http";

const chai = chaiModule.use(chaiHttp);
const {expect} = chaiModule;

export {chai, expect}