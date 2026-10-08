SELECT
    player_name,
    ROUND(SUM(points) / COUNT(DISTINCT game_id), 1) AS points_per_game
FROM analytics.stg_player_game_logs
WHERE season = '2025-26' AND game_type = 'Regular Season' AND team_abbreviation = {{team}}
GROUP BY player_name
HAVING COUNT(DISTINCT game_id) >= 20
ORDER BY points_per_game DESC
LIMIT 8
