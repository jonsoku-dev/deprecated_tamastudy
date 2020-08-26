const assert = require('chai').assert;
const expect = require('chai').expect;
const UserService = require('../../../services/user.service');

describe('유저 서비스 테스트', function () {
  it('createUser', async function () {
    const { user } = await UserService.createUser({
      requestBody: {
        username: 'test',
        email: 'test@test.com',
        password: '1234',
      },
    });
    assert.isNotNull(user);
    await user.destroy();
  });
  it('findUserById', async function () {
    const { user: newUser } = await UserService.createUser({
      requestBody: {
        username: 'test',
        email: 'test@test.com',
        password: '1234',
      },
    });
    const { user: findUser } = await UserService.findUserById({
      userId: newUser.id,
    });
    const username = findUser.username;
    expect(username).to.equal('test');
    await findUser.destroy();
  });
  it('findByUserEmail', async function () {
    const { user: newUser } = await UserService.createUser({
      requestBody: {
        username: 'test',
        email: 'test@test.com',
        password: '1234',
      },
    });
    const { user: findUser } = await UserService.findUserByEmail({
      email: newUser.email,
    });
    const email = findUser.email;
    expect(email).to.equal('test@test.com');
    await findUser.destroy();
  });
});
