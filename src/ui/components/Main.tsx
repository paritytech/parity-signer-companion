import React from 'react'
import styled from 'styled-components'
import { BaseProps } from '../types'
import Footer from './Footer'
import Header from './Header'

const Main: React.FC<BaseProps> = ({ children, className }) => (
  <main className={className}>
    <Header />
    <div className='container'>{children}</div>
    <Footer />
  </main>
)

export default styled(Main)`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: ${({ theme }: BaseProps) => theme.fontSize};
  line-height: ${({ theme }: BaseProps) => theme.lineHeight};
  color: ${({ theme }: BaseProps) => theme.mainTextColor};

  a {
    color: ${({ theme }: BaseProps) => theme.mainTextColor};
  }

  .container {
    padding: 1rem;
  }
`
