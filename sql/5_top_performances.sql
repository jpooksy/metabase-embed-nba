SELECT
    player_name AS player,
    points,
    SPLIT_PART(matchup, ' ', 2) || ' ' || SPLIT_PART(matchup, ' ', 3) AS opponent,
    TO_VARCHAR(game_date, 'Mon DD, YYYY') AS game_date
FROM analytics.stg_player_game_logs
WHERE season = '2025-26' AND game_type = 'Regular Season' AND team_abbreviation = {{team}}
ORDER BY points DESC, game_date
LIMIT 10
