import React from 'react'
import styled from 'styled-components'
import { BaseProps } from '../types'

const Main: React.FC<BaseProps> = ({ children, className }) => {
  return <main className={className}>{children}</main>
}

export default styled(Main)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }: BaseProps) => theme.background};
  color: ${({ theme }: BaseProps) => theme.textColor};
  font-size: ${({ theme }: BaseProps) => theme.fontSize};
  line-height: ${({ theme }: BaseProps) => theme.lineHeight};
`
