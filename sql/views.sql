CREATE OR REPLACE VIEW stream_history_timestamp_with_total_view_count AS
SELECT
  stream_history_timestamp.*,
  SUM(stream_history.viewer_count) AS total_viewer_count,
  COUNT(*) AS total_streams
FROM
  stream_history_timestamp
  LEFT JOIN stream_history ON stream_history_timestamp.id = stream_history.stream_history_timestamp_id
GROUP BY
  stream_history_timestamp.id;