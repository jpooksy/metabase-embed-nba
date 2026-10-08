WITH team_games AS (
SELECT game_id, MAX(win_loss) AS win_loss
FROM analytics.stg_player_game_logs
WHERE season = '2025-26' AND game_type = 'Regular Season' AND team_abbreviation = {{team}}
GROUP BY game_id
)
SELECT SUM(IFF(win_loss = 'W', 1, 0)) || '-' || SUM(IFF(win_loss = 'L', 1, 0)) AS record
FROM team_games
