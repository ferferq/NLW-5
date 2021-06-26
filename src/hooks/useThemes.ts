import { useContext } from 'react';
import { ThemesConfig } from '../contexts/lightOrDark';

export function useTheme () {
  const value = useContext(ThemesConfig);

  return value;
}