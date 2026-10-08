import { useState, useContext } from 'react'
import { InteractiveDashboard } from '@metabase/embedding-sdk-react'
import { AnalyticsContext } from "./analytics-provider"

import { ThemeSwitcher } from './theme-switcher'
import { TEAMS } from './teams'

// The "Team Pulse" dashboard in Metabase. Its "Team" filter (slug: team) is
// wired to every card; this app owns the filter value instead of Metabase's UI.
const TEAM_DASHBOARD_ID = Number(import.meta.env.VITE_TEAM_DASHBOARD_ID)

export const AnalyticsDashboard = () => {
  const {email, themeKey} = useContext(AnalyticsContext)
  const [team, setTeam] = useState('GSW')

  return (
    <div className={`analytics-root theme-${themeKey}`}>
      <div className="analytics-container">
        <div className="analytics-header">
          <div>

          </div>

          <div className="analytics-header-right">
            <select
              className="dashboard-select"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            >
              {TEAMS.map(({ abbr, name }) => (
                <option key={abbr} value={abbr}>
                  {name}
                </option>
              ))}
            </select>

            <ThemeSwitcher />
          </div>
        </div>

        {/** Reload the dashboard when user changes with the key prop */}
        <InteractiveDashboard
          dashboardId={TEAM_DASHBOARD_ID}
          parameters={{ team }}
          hiddenParameters={['team']}
          withTitle
          withDownloads
          key={email}
        />
      </div>
    </div>
  )
}
