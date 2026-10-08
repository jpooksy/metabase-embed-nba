import { AnalyticsProvider } from './analytics-provider'
import { EmbeddingProvider } from './embedding-provider'
import { AnalyticsDashboard } from './analytics-dashboard'

import './analytics.css'

export const AnalyticsPage = () => (
  <AnalyticsProvider>
    <EmbeddingProvider>
      <AnalyticsDashboard />
    </EmbeddingProvider>
  </AnalyticsProvider>
)