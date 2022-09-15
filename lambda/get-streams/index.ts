import { supabase } from './supabase';
import { fetchClientCredentials, fetchStreams } from './twitch';

export const handler = async () => {
  try {
    const { access_token } = await fetchClientCredentials();
    const { data: streamData } = await fetchStreams(access_token, {
      first: '100',
    });
    await supabase
      .rpc('insert_streams_with_timestamp', {
        streams: streamData,
      })
      .throwOnError();
  } catch (error) {
    console.error(error);
  }
};
