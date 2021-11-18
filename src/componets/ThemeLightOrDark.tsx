import { ButtonHTMLAttributes } from 'react';

import '../styles/themeLightordark.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  idDark?: boolean;
  themeAdd?: string | undefined;
};

export function ThemeLightOrDark ({idDark = false, themeAdd = '', ...props}: ButtonProps) {
  return (
  <button className={`theme ${idDark ? 'dark' : ''} ${themeAdd ? themeAdd : ''}`} {... props}/>
  );
}