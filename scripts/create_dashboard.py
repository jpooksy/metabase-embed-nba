"""Create the "Team Pulse" dashboard in Metabase from the queries in sql/.

Usage (reads VITE_METABASE_INSTANCE_URL and VITE_METABASE_API_KEY from .env):
    uv run --no-project scripts/create_dashboard.py <database_id>
"""

import json
import sys
import urllib.request
import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ENV = dict(
    line.split("=", 1)
    for line in (ROOT / ".env").read_text().splitlines()
    if "=" in line and not line.startswith("#")
)
BASE = ENV["VITE_METABASE_INSTANCE_URL"].rstrip("/")
KEY = ENV["VITE_METABASE_API_KEY"]
DATABASE_ID = int(sys.argv[1])
TEAM_PARAM_ID = "team"


def api(method, path, body=None):
    req = urllib.request.Request(
        f"{BASE}/api{path}",
        method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"x-api-key": KEY, "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read() or "null")


def pct(col):
    return {json.dumps(["name", col]): {"number_style": "percent", "decimals": 1}}


def titles(**cols):
    return {json.dumps(["name", col]): {"column_title": title} for col, title in cols.items()}


# (sql file, card name, display, visualization settings, dashboard position)
CARDS = [
    ("1_record.sql", "Record", "scalar", {}, dict(row=0, col=0, size_x=8, size_y=3)),
    ("2_ppg.sql", "Points per game", "scalar", {}, dict(row=0, col=8, size_x=8, size_y=3)),
    ("3_three_pct.sql", "3PT %", "scalar", {"column_settings": pct("THREE_POINT_PCT")}, dict(row=0, col=16, size_x=8, size_y=3)),
    ("4_top_scorers.sql", "Top scorers (PPG)", "row",
     {"graph.dimensions": ["PLAYER_NAME"], "graph.metrics": ["POINTS_PER_GAME"], "graph.show_values": True},
     dict(row=3, col=0, size_x=12, size_y=8)),
    ("5_top_performances.sql", "Best single-game performances", "table",
     {"column_settings": {
         **titles(PLAYER="Player", POINTS="PTS", OPPONENT="Opponent", GAME_DATE="Date"),
     }},
     dict(row=3, col=12, size_x=12, size_y=8)),
]

collection = api("POST", "/collection", {"name": "NBA Team Pulse", "color": "#509EE3"})

dashboard = api("POST", "/dashboard", {
    "name": "Team Pulse · 2025-26",
    "collection_id": collection["id"],
    "parameters": [{
        "id": TEAM_PARAM_ID, "name": "Team", "slug": "team",
        "type": "string/=", "sectionId": "string", "default": ["GSW"],
    }],
})

dashcards = []
for i, (sql_file, name, display, viz, pos) in enumerate(CARDS):
    card = api("POST", "/card", {
        "name": name,
        "display": display,
        "visualization_settings": viz,
        "collection_id": collection["id"],
        "dataset_query": {
            "type": "native",
            "database": DATABASE_ID,
            "native": {
                "query": (ROOT / "sql" / sql_file).read_text(),
                "template-tags": {"team": {
                    "id": str(uuid.uuid4()), "name": "team", "display-name": "Team",
                    "type": "text", "required": True, "default": "GSW",
                }},
            },
        },
    })
    dashcards.append({
        "id": -(i + 1), "card_id": card["id"], **pos,
        "parameter_mappings": [{
            "parameter_id": TEAM_PARAM_ID, "card_id": card["id"],
            "target": ["variable", ["template-tag", "team"]],
        }],
    })
    print(f"card {card['id']}: {name}")

api("PUT", f"/dashboard/{dashboard['id']}", {"dashcards": dashcards})
print(f"dashboard {dashboard['id']}: {BASE}/dashboard/{dashboard['id']}")
