import {useContext, useMemo, type ReactNode} from 'react'
import {MetabaseProvider, type MetabaseAuthConfig, type MetabaseTheme} from '@metabase/embedding-sdk-react'

import { AnalyticsContext, type ThemeKey } from './analytics-provider'

const authConfig: MetabaseAuthConfig = {
  metabaseInstanceUrl: import.meta.env.VITE_METABASE_INSTANCE_URL,
  apiKey: import.meta.env.VITE_METABASE_API_KEY
}

// Demo provider that wraps the MetabaseProvider with a custom theme and auth configuration.
// In a real app, the theme would be managed by your application.
export const EmbeddingProvider = ({children}: {children: ReactNode}) => {
  const {themeKey} = useContext(AnalyticsContext)
  const theme = useMemo(() => THEMES[themeKey], [themeKey])

  return (
    <MetabaseProvider authConfig={authConfig} theme={theme}>
      {children}
    </MetabaseProvider>
  )
}

// Sample themes for Metabase components.
const THEMES: Record<ThemeKey, MetabaseTheme> = {
  // Light theme
  light: {
    colors: {
      brand: '#509EE3',
      filter: '#7172AD',
      'text-primary': '#4C5773',
      'text-secondary': '#696E7B',
      'text-tertiary': '#949AAB',
      border: '#EEECEC',
      background: '#F9FBFC',
      'background-hover': '#F9FBFC',
      positive: '#84BB4C',
      negative: '#ED6E6E'
    }
  },

  // Dark theme
  dark: {
    colors: {
      brand: '#509EE3',
      filter: '#7172AD',
      'text-primary': '#FFFFFF',
      'text-secondary': '#FFFFFF',
      'text-tertiary': '#FFFFFF',
      border: '#5A5F6B',
      background: '#2D353A',
      'background-hover': '#2D353A',
      positive: '#84BB4C',
      negative: '#ED6E6E'
    }
  }
}