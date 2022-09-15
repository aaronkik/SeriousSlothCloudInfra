import {
  aws_events as events,
  aws_events_targets as eventTarget,
  aws_lambda as lambda,
  aws_lambda_nodejs as lambdaNodejs,
  Duration,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class SeriousSlothCloudInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * @see https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda-readme.html
     */
    const lambdaFn = new lambdaNodejs.NodejsFunction(
      this,
      'get-twitch-streams',
      {
        architecture: lambda.Architecture.ARM_64,
        description:
          'Fetches streams from the GET /streams Twitch API and inserts data to a postgres instance',
        entry: 'lambda/get-streams/index.ts',
        environment: {
          SUPABASE_SERVICE_SECRET: process.env.SUPABASE_SERVICE_SECRET ?? '',
          SUPABASE_URL: process.env.SUPABASE_URL ?? '',
          TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID ?? '',
          TWITCH_SECRET: process.env.TWITCH_SECRET ?? '',
        },
        handler: 'handler',
        memorySize: 1024,
        runtime: lambda.Runtime.NODEJS_16_X,
        timeout: Duration.minutes(2),
      }
    );

    const lambdaTarget = new eventTarget.LambdaFunction(lambdaFn, {
      maxEventAge: Duration.minutes(2),
      retryAttempts: 2,
    });

    new events.Rule(this, 'get-twitch-streams-cron', {
      schedule: events.Schedule.cron({
        minute: '0/60',
      }),
      targets: [lambdaTarget],
    });
  }
}
