CREATE OR REPLACE FUNCTION insert_streams_with_timestamp (streams jsonb) RETURNS SETOF stream_history AS $$
    DECLARE
      _stream_history_timestamp_id int;
    BEGIN 
      INSERT INTO stream_history_timestamp DEFAULT VALUES RETURNING id INTO _stream_history_timestamp_id;
      RETURN QUERY INSERT INTO stream_history (
        stream_id,
        user_id,
        user_login,
        user_name,
        game_id,
        game_name,
        stream_title,
        viewer_count,
        started_at,
        language,
        is_mature,
        stream_history_timestamp_id
      ) 
      SELECT 
        streams_data ->> 'id',
        streams_data ->> 'user_id',
        streams_data ->> 'user_login',
        streams_data ->> 'user_name',
        streams_data ->> 'game_id',
        streams_data ->> 'game_name',
        streams_data ->> 'title',
        (streams_data ->> 'viewer_count')::int,
        (streams_data ->> 'started_at')::text::timestamptz,
        streams_data ->> 'language',
        (streams_data ->> 'is_mature')::boolean,
        _stream_history_timestamp_id
       FROM jsonb_array_elements(streams) as t(streams_data)
      RETURNING *;
    END;
  $$ LANGUAGE plpgsql;