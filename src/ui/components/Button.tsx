import styled from 'styled-components'
import { ThemeProps } from '../types'

export const Button = styled.button`
  display: inline-block;
  background: ${({ theme }: ThemeProps) => theme.buttonBgColor};
  border: none;
  border-radius: 0.2rem;
  color: ${({ theme }: ThemeProps) => theme.buttonTextColor};
  font-size: ${({ theme }: ThemeProps) => theme.fontSize};
  line-height: ${({ theme }: ThemeProps) => theme.lineHeight};
  margin: 0;
  font-family: ${({ theme }: ThemeProps) => theme.fontFamily};
  white-space: nowrap;
  text-decoration: none;
  padding: 0.4rem 1rem 0.4rem;
  cursor: pointer;
  transition: ${({ theme }: ThemeProps) => theme.transition};

  &:hover {
    background: ${({ theme }: ThemeProps) => theme.buttonBgHoverColor};
  }
`
