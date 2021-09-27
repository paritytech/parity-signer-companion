import React from 'react'
import styled from 'styled-components'
import { BaseProps } from '../types'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Media from '../components/Media'

const Main: React.FC<BaseProps> = ({ children, className }) => (
  <main className={className}>
    <Header />
    <Media />
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
    color: ${({ theme }: BaseProps) => theme.fadedTextColor};
    transition: ${({ theme }: BaseProps) => theme.transition};
  }

  a:hover {
    color: ${({ theme }: BaseProps) => theme.mainTextColor};
  }

  h1 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: ${({ theme }: BaseProps) => theme.titleFontSize};
    line-height: ${({ theme }: BaseProps) => theme.lineHeight};
    font-weight: bold;
  }

  p {
    margin: 0 0 0.5rem;
  }

  .emphasis {
    margin: 0 0 1.5rem;
  }

  .container {
    padding: 1rem;
  }
`
