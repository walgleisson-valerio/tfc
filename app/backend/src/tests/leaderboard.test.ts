import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

import { Response } from 'superagent';
import { leaderboardMock, teamsInfoMock } from './mocks/leaderboard.mocks';
import LeaderboardService from '../services/LeaderboardService.service';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa a rota /leaderboard', () => {
  afterEach(()=>{
    // (User.findOne as sinon.SinonStub).restore();
  })

  it('Testa se retorna a classificação geral', async () => {
    sinon.stub(LeaderboardService, 'getTeamsInfo').resolves(leaderboardMock as any);
    sinon.stub(LeaderboardService, 'setRanking').resolves(teamsInfoMock);

    const response = await chai
      .request(app).get('/leaderboard');

    // console.log(response.body);
    
    expect(response.body).to.be.deep.equal(leaderboardMock);
  });
});
