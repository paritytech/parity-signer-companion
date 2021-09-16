import React from 'react'
import styled from 'styled-components'
import { ThemeProps } from '../types'

interface Props {
  className?: string
}

const Main: React.FC<Props> = ({ children, className }) => {
  return <main className={className}>{children}</main>
}

export default styled(Main)(
  ({ theme }: ThemeProps) => `
  display: flex;
  flex-direction: column;
  height: calc(100vh - 2px);
  background: ${theme.background};
  color: ${theme.textColor};
  font-size: ${theme.fontSize};
  line-height: ${theme.lineHeight};
  border: 1px solid ${theme.inputBorderColor};

  * {
    font-family: ${theme.fontFamily};
  }

  > * {
    padding-left: 24px;
    padding-right: 24px;
  }
`
)
