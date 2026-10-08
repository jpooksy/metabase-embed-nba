# metabase-embed-nba

The [Metabase embedding SDK](https://www.metabase.com/docs/latest/embedding/sdk/introduction) quickstart, plus one step past it: a team dropdown in the React app that drives the embedded dashboard's filter. Data is 2025-26 NBA player game logs in Snowflake.

The dropdown is plain React state passed to the SDK's controlled `parameters` prop. `hiddenParameters` hides Metabase's own filter widget so the app owns the control:

```tsx
const [team, setTeam] = useState('GSW')

<InteractiveDashboard
  dashboardId={TEAM_DASHBOARD_ID}
  parameters={{ team }}
  hiddenParameters={['team']}
/>
```

See [`src/components/metabase/analytics-dashboard.tsx`](src/components/metabase/analytics-dashboard.tsx).

> Hiding a filter is a UI choice, not a permission. To restrict which rows a user can see, use JWT SSO with row-level security instead of the API key used here for local dev.

## Run it

1. `npx @metabase/embedding-sdk-react@latest start` (Docker + Node 20+). This starts Metabase at http://localhost:3366.
2. In Metabase admin, add a Snowflake database (key-pair auth) that can read `ANALYTICS.STG_PLAYER_GAME_LOGS`.
3. `cp .env.example .env` and fill in the API key.
4. `uv run --no-project scripts/create_dashboard.py <database_id>` creates the "Team Pulse" dashboard from [`sql/`](sql). Put the printed dashboard ID in `.env`.
5. `npm install && npm run dev` → http://localhost:5173

## Quickstart snags (SDK 0.63.1)

- **Needs an existing `package.json`.** The CLI didn't scaffold a React app, so I created one with Vite first.
- **"Token does not match the setup token."** The CLI hardcodes `MB_SETUP_TOKEN`, which the latest Metabase image ignores. I patched `node_modules/@metabase/embedding-sdk-react/dist/cli.js` locally to read the instance's real setup token.
- **`<AnalyticsPage />` isn't mounted.** I added it to `App.tsx` by hand.
- **`npm run build` fails.** The generated `.tsx` files use JSDoc types, so `tsc` errors out. Typed the context and providers.
