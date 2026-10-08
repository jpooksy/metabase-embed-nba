import {createContext, useState, type ReactNode} from 'react'

export type ThemeKey = 'light' | 'dark'

type AnalyticsContextType = {
  themeKey: ThemeKey
  email?: string
  setThemeKey: (themeKey: ThemeKey) => void
}

export const AnalyticsContext = createContext<AnalyticsContextType>({
  themeKey: 'light',
  setThemeKey: () => {},
});

// Demo provider that adds the state for the example theme switcher component.
// Delete this once you've played around with the theme switcher, and use your
// own application's theming instead.
export const AnalyticsProvider = ({children}: {children: ReactNode}) => {
  const [themeKey, setThemeKey] = useState<ThemeKey>('light');

  return (
    <AnalyticsContext.Provider value={{themeKey, setThemeKey}}>
      {children}
    </AnalyticsContext.Provider>
  )
}
