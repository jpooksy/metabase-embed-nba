WITH team_games AS (
SELECT game_id, MAX(game_date) AS game_date, MAX(win_loss) AS win_loss
FROM analytics.stg_player_game_logs
WHERE season = '2025-26' AND game_type = 'Regular Season' AND team_abbreviation = {{team}}
GROUP BY game_id
)
SELECT
    game_date,
    SUM(IFF(win_loss = 'W', 1, 0)) OVER (ORDER BY game_date) AS wins
FROM team_games
ORDER BY game_date
