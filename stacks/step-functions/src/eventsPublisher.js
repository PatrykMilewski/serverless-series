import 'source-map-support/register';
import eventbridge from '@serverless-series/utils/src/aws/eventbridge';

export const handler = async (event, context) => {
  await eventbridge
    .putEvents({
      Entries: [
        {
          Source: 'serverlessSeries.stateMachine.start',
          DetailType: 'Event that can be used to start state machine.',
          Detail: JSON.stringify(event),
        },
      ],
    })
    .promise();

  return 'State machine should start soon!'
};

