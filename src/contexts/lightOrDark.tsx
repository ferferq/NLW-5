import { createContext, ReactNode, useEffect, useState } from 'react';

type theme = 'light' | 'dark' ;

type ThemesConfigContext = {
  theme: theme;
  themesConfig: () => void;
}

type ThemesContextProviderProps = {
  children: ReactNode;
}

export const ThemesConfig = createContext({} as ThemesConfigContext);

export function LightOrDarkThemeContext (props: ThemesContextProviderProps) {
  const [themeConfig, setTheme] = useState<theme>(() => {
    const storagedTheme = localStorage.getItem('theme');

    return (storagedTheme ?? 'light') as theme;
  });

  useEffect(() => {
    localStorage.setItem('theme', themeConfig);
  }, [themeConfig]);

  function themesConfig () {
    setTheme(themeConfig === 'light' ? 'dark' : 'light');
  }
 
  return (
    <ThemesConfig.Provider value={{theme: themeConfig , themesConfig}}>
    {props.children}
    </ThemesConfig.Provider>
  )
}