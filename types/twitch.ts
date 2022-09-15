export type FetchClientCredentialsData = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

type FetchClientCredentialsError = {
  status: number;
  message: string;
};

export type FetchClientCredentialsResponse =
  | FetchClientCredentialsData
  | FetchClientCredentialsError;

export type FetchStreamsOptions = {
  after?: string;
  before?: string;
  first?: string;
  game_id?: string;
  language?: string;
  user_id?: string;
  user_login?: string;
};

export type FetchStreamsData = {
  data: Array<{
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    game_name: string;
    type: string;
    title: string;
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
    tag_ids: Array<string>;
    is_mature: boolean;
  }>;
  pagination: {
    cursor: string;
  };
};

type FetchStreamsError = {
  error: string;
  status: number;
  message: string;
};

export type FetchStreamsResponse = FetchStreamsData | FetchStreamsError;
