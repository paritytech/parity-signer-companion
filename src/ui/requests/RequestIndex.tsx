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
    <div className=''>
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

// TODO:
// export default styled(RequestIndex)`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 0.5rem;

//   .transaction-container {
//     display: flex;
//     align-items: center;
//   }

//   .label {
//     padding: 0 1rem;
//   }
// `
