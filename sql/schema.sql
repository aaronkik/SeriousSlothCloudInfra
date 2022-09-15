CREATE TABLE IF NOT EXISTS public.stream_history_timestamp (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  time timestamptz NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.stream_history_timestamp IS 'The time streams are fetched from the Twitch API';

CREATE TABLE IF NOT EXISTS public.stream_history (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  stream_id text NOT NULL,
  user_id text NOT NULL,
  user_login text NOT NULL,
  user_name text NOT NULL,
  game_id text NOT NULL,
  game_name text NOT NULL,
  stream_title text NOT NULL,
  viewer_count int NOT NULL,
  started_at timestamptz NOT NULL,
  language text NOT NULL,
  is_mature boolean NOT NULL,
  stream_history_timestamp_id int NOT NULL REFERENCES public.stream_history_timestamp(id)
);

COMMENT ON TABLE public.stream_history IS 'Streams fetched from the Twitch API';

ALTER TABLE public.stream_history_timestamp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stream_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow client to select stream history timestamp" ON public.stream_history_timestamp
  FOR SELECT USING (auth.role() = 'anon');
CREATE POLICY "Allow client to select stream history" ON public.stream_history
  FOR SELECT USING (auth.role() = 'anon');