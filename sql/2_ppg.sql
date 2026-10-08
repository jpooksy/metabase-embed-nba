WITH team_games AS (
SELECT game_id, SUM(points) AS points
FROM analytics.stg_player_game_logs
WHERE season = '2025-26' AND game_type = 'Regular Season' AND team_abbreviation = {{team}}
GROUP BY game_id
)
SELECT ROUND(AVG(points), 1) AS points_per_game
FROM team_games
