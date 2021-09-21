import React from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { BaseProps } from '../types'

type Props = BaseProps & {
  index: number
  totalItems: number
  onNextClick: () => void
  onPreviousClick: () => void
}

const TransactionIndex: React.FC<Props> = ({
  className,
  index,
  onNextClick,
  onPreviousClick,
  totalItems,
}) => {
  const previousClickActive = index > 0
  const nextClickActive = index < totalItems - 1

  const prevClick = () => previousClickActive && onPreviousClick()
  const nextClick = () => nextClickActive && onNextClick()

  return (
    <div className={className}>
      <div className='transaction-container'>
        <Button className='secondary' onClick={prevClick}>
          ←
        </Button>
        <div className='label'>
          {index + 1} of {totalItems}
        </div>
        <Button className='secondary' onClick={nextClick}>
          →
        </Button>
      </div>
    </div>
  )
}

export default styled(TransactionIndex)`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;

  .transaction-container {
    display: flex;
    align-items: center;
  }

  .label {
    padding: 0 1rem;
  }
`
