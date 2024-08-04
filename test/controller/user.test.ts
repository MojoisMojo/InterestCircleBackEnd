import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { Exclusion } from 'typeorm';

describe('test/controller/user.test.ts', () => {
  it('should POST /users/register', async () => {
    // create app
    const app = await createApp<Framework>();

    // make request
    const result = await createHttpRequest(app).post('/users/register').query({
      name: 'Mojo',
      email: '221900175@smail.nju.edu.cn',
      password: 'Mojo1234',
    });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('OK');
    expect(result.body.data.status).toBe('success');
    expect(result.body.data.user.name).toBe('Mojo');

    // close app
    await close(app);
  });
});
