import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import { ExtThemeProps } from '../types'

type Props = ExtThemeProps & {
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
  const previousClickActive = index !== 0
  const nextClickActive = index < totalItems - 1

  const prevClick = () => previousClickActive && onPreviousClick()

  const nextClick = () => nextClickActive && onNextClick()

  return (
    <div className={className}>
      <div>
        <span className='currentStep'>{index + 1}</span>
        <span className='totalSteps'>/{totalItems}</span>
      </div>
      <div>
        <FontAwesomeIcon
          className={`arrowLeft ${previousClickActive ? 'active' : ''}`}
          icon={faArrowLeft}
          onClick={prevClick}
          size='sm'
        />
        <FontAwesomeIcon
          className={`arrowRight ${nextClickActive ? 'active' : ''}`}
          icon={faArrowRight}
          onClick={nextClick}
          size='sm'
        />
      </div>
    </div>
  )
}

export default styled(TransactionIndex)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  padding-right: 24px;

  .arrowLeft,
  .arrowRight {
    display: inline-block;
    color: ${({ theme }: Props) => theme.iconNeutralColor};

    &.active {
      color: ${({ theme }: Props) => theme.primaryColor};
      cursor: pointer;
    }
  }

  .arrowRight {
    margin-left: 0.5rem;
  }

  .currentStep {
    color: ${({ theme }: Props) => theme.primaryColor};
    font-size: ${({ theme }: Props) => theme.labelFontSize};
    line-height: ${({ theme }: Props) => theme.labelLineHeight};
    margin-left: 10px;
  }

  .totalSteps {
    font-size: ${({ theme }: Props) => theme.labelFontSize};
    line-height: ${({ theme }: Props) => theme.labelLineHeight};
    color: ${({ theme }: Props) => theme.textColor};
  }
`
