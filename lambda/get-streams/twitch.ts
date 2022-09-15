import fetch, { Headers } from 'node-fetch';
import {
  FetchClientCredentialsData,
  FetchClientCredentialsResponse,
  FetchStreamsData,
  FetchStreamsOptions,
  FetchStreamsResponse,
} from '~/types/twitch';

const clientId = process.env.TWITCH_CLIENT_ID;
const secret = process.env.TWITCH_SECRET;

if (!clientId) throw new Error('Missing process.env.TWITCH_CLIENT_ID');
if (!secret) throw new Error('Missing process.env.TWITCH_SECRET');

/**
 * @see https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#client-credentials-grant-flow
 */
export const fetchClientCredentials =
  async (): Promise<FetchClientCredentialsData> => {
    const twitchAccessTokenResponse = await fetch(
      'https://id.twitch.tv/oauth2/token',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: secret,
          grant_type: 'client_credentials',
        }).toString(),
      }
    );

    const payload =
      (await twitchAccessTokenResponse.json()) as FetchClientCredentialsResponse;

    if (!twitchAccessTokenResponse.ok || !('access_token' in payload)) {
      return await Promise.reject(payload);
    }

    return payload;
  };

/**
 * @see https://dev.twitch.tv/docs/api/reference#get-streams
 */
export const fetchStreams = async (
  accessToken: string,
  options: FetchStreamsOptions
): Promise<FetchStreamsData> => {
  const fetchStreamSearchParams = new URLSearchParams(options).toString();

  const streamsResponse = await fetch(
    `https://api.twitch.tv/helix/streams?${fetchStreamSearchParams}`,
    {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': clientId,
      }),
    }
  );

  const payload = (await streamsResponse.json()) as FetchStreamsResponse;

  if (!streamsResponse.ok || !('data' in payload)) {
    return await Promise.reject(payload);
  }

  return payload;
};
