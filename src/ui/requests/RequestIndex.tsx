import React from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { BaseProps } from '../types'

type Props = BaseProps & {
  index: number
  total: number
  onChange: (index: number) => void
}

const RequestIndex: React.FC<Props> = ({
  className,
  index,
  total,
  onChange,
}) => {
  const prevActive = index > 0
  const nextActive = index < total - 1

  const onNext = () => onChange(Math.min(index + 1, total))
  const onPrev = () => onChange(Math.max(index - 1, 0))

  return (
    <div className={className}>
      <div className='transaction-container'>
        <Button className='secondary' disabled={!prevActive} onClick={onPrev}>
          ←
        </Button>
        <div className='label'>
          {index + 1} of {total}
        </div>
        <Button className='secondary' disabled={!nextActive} onClick={onNext}>
          →
        </Button>
      </div>
    </div>
  )
}

export default styled(RequestIndex)`
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
