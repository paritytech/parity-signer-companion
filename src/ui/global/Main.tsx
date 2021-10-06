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
  font-size: var(--font-base-size);
  line-height: var(--font-base-line-height);
  color: var(--color-main-text);

  a {
    color: var(--color-faded-text);
    transition: var(--transition);
  }

  a:hover {
    color: var(--color-main-text);
  }

  h1 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: var(--font-title-size);
    line-height: var(--font-base-line-height);
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
