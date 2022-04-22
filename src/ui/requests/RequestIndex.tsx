import React from 'react'
import { Button } from '../components/Button'

type Props = {
  index: number
  total: number
  onChange: (index: number) => void
}

export const RequestIndex: React.FC<Props> = ({ index, total, onChange }) => {
  const prevActive = index > 0
  const nextActive = index < total - 1

  const onNext = () => onChange(Math.min(index + 1, total))
  const onPrev = () => onChange(Math.max(index - 1, 0))

  return (
    <div className='flex justify-center mb-2'>
      <div className='flex items-center'>
        <Button disabled={!prevActive} onClick={onPrev}>
          ←
        </Button>
        <div className='px-4'>
          {index + 1} of {total}
        </div>
        <Button disabled={!nextActive} onClick={onNext}>
          →
        </Button>
      </div>
    </div>
  )
}
