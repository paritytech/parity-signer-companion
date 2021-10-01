import styled from 'styled-components'
import { ThemeProps } from '../types'

export const Button = styled.button`
  display: inline-block;
  background: ${({ theme }: ThemeProps) => theme.buttonBgColor};
  border: none;
  border-radius: 0.2rem;
  color: ${({ theme }: ThemeProps) => theme.buttonTextColor};
  font-size: ${({ theme }: ThemeProps) => theme.fontSize};
  line-height: 1;
  margin: 0;
  font-family: ${({ theme }: ThemeProps) => theme.fontFamily};
  white-space: nowrap;
  text-decoration: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: ${({ theme }: ThemeProps) => theme.transition};

  &:hover {
    background: ${({ theme }: ThemeProps) => theme.buttonBgHoverColor};
  }

  &.secondary {
    padding: 0.4rem 0;
    color: ${({ theme }: ThemeProps) => theme.fadedTextColor};
    background: none;
  }

  &.secondary:hover {
    color: ${({ theme }: ThemeProps) => theme.mainTextColor};
  }
`
