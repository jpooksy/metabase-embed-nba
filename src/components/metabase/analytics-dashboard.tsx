import { useState, useContext, useReducer } from 'react'
import { InteractiveDashboard, InteractiveQuestion } from '@metabase/embedding-sdk-react'
import { AnalyticsContext } from "./analytics-provider"

import { ThemeSwitcher } from './theme-switcher'

export const AnalyticsDashboard = () => {
  const {email, themeKey} = useContext(AnalyticsContext)
  const [dashboardId, setDashboardId] = useState(DASHBOARDS[0].id)

  const [isCreateQuestion, toggleCreateQuestion] = useReducer((s) => !s, false)

  const isDashboard = !isCreateQuestion

  return (
    <div className={`analytics-root theme-${themeKey}`}>
      <div className="analytics-container">
        <div className="analytics-header">
          <div>
            
          </div>

          <div className="analytics-header-right">
            {isDashboard && (
              <select
                className="dashboard-select"
                onChange={(e) => setDashboardId(Number(e.target.value))}
              >
                {DASHBOARDS.map((dashboard) => (
                  <option key={dashboard.id} value={dashboard.id}>
                    {dashboard.name}
                  </option>
                ))}
              </select>
            )}

            <a href="#!" onClick={toggleCreateQuestion}>
              {isCreateQuestion ? 'Back to dashboard' : 'Create Question'}
            </a>

            <ThemeSwitcher />
          </div>
        </div>

        {/** Reload the dashboard when user changes with the key prop */}
        {isDashboard && (
          <InteractiveDashboard
            dashboardId={dashboardId}
            withTitle
            withDownloads
            key={email}
          />
        )}

        {isCreateQuestion && <InteractiveQuestion questionId="new" />}
      </div>
    </div>
  )
}

const DASHBOARDS = [
  {
    "id": 11,
    "name": "Orders"
  },
  {
    "id": 12,
    "name": "People"
  },
  {
    "id": 13,
    "name": "Products"
  }
]