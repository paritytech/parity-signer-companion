import React from 'react'
import styled from 'styled-components'
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
      <div>
        {index + 1}/{totalItems}
      </div>
      <div>
        <button onClick={prevClick}>Prev</button>
        <button onClick={nextClick}>Next</button>
      </div>
    </div>
  )
}

export default styled(TransactionIndex)`
  display: flex;
  align-items: center;
`
