import {createContext, useState} from 'react'

/**
 * @typedef {Object} AnalyticsContextType
 * @property {'light'|'dark'} themeKey - The current theme key.
 * @property {null} [email] - Email of the user.
 * @property {(themeKey: 'light'|'dark') => void} setThemeKey - Function to update the theme.
 */

export const AnalyticsContext = createContext(
  /** @type {AnalyticsContextType} */ ({})
);

// Demo provider that adds the state for the example theme switcher component.
// Delete this once you've played around with the theme switcher, and use your
// own application's theming instead.
export const AnalyticsProvider = ({children}) => {
  const [themeKey, setThemeKey] = useState(/** @type {'light'|'dark'} */ ('light'));

  return (
    <AnalyticsContext.Provider value={{themeKey, setThemeKey}}>
      {children}
    </AnalyticsContext.Provider>
  )
}