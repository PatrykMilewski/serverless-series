import { handler } from '../src/writer';

const context = {};

it('example test', async () => {

  const event = {
    hello: 'event',
  };

  await handler(event, context);

});
