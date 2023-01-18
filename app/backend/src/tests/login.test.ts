import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/UserModel';
import Jwt from '../utils/Jwt.util';

import { Response } from 'superagent';
import { tokenMock, userMock } from './mocks/login.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa a rota /login', () => {
  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Testa se é possível realizar o login', async () => {
    sinon.stub(User, 'findOne').resolves(userMock as any);
    sinon.stub(Jwt, 'createToken').resolves(tokenMock.token);

    const response = await chai
      .request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    expect(response.body).to.be.deep.equal(tokenMock);
  });
});
