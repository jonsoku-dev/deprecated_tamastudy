/*eslint no-undef: "off"*/

const assert = require('chai').assert;
const expect = require('chai').expect;
const UserService = require('../../../services/user.service');

describe('유저 서비스 테스트', function () {
  it('findUserById', async function () {
    const { user } = await UserService.findUserById({
      userId: 102,
    });
    const username = user.username;
    expect(username).to.equal('짬뽕');
  });
  it('findByUserEmail', async function () {
    const { user } = await UserService.findUserByEmail({
      email: 'admin@gmail.com',
    });
    const username = user.username;
    expect(username).to.equal('짬뽕');
  });
  it('createUser', async function () {
    const { user } = await UserService.createUser({
      requestBody: {
        username: 'test',
        email: 'test@test.com',
        password: '1234',
      },
    });
    assert.isNotNull(user);
    if (user) {
      await user.destroy();
    }
  });
});
