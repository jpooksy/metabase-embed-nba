SELECT SUM(three_point_made) / NULLIF(SUM(three_point_attempted), 0) AS three_point_pct
FROM analytics.stg_player_game_logs
WHERE season = '2025-26' AND game_type = 'Regular Season' AND team_abbreviation = {{team}}
