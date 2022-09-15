#!/usr/bin/env node
import 'dotenv/config';
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SeriousSlothCloudInfraStack } from '../lib/serious_sloth_cloud_infra-stack';

const app = new cdk.App();

// eslint-disable-next-line no-new
new SeriousSlothCloudInfraStack(app, 'SeriousSlothCloudInfraStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'eu-west-2',
  },
});

app.synth();
