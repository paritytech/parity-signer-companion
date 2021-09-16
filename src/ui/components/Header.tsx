import React from 'react'
import styled from 'styled-components'
import { EXT_NAME } from '../../utils/constants'
import { BaseProps } from '../types'
import { goHome, goTo } from '../utils/routing'

type Props = BaseProps & {
  showAdd?: boolean
  showBackArrow?: boolean
  smallMargin?: boolean
  text?: React.ReactNode
}

const Header: React.FC<Props> = ({
  className,
  showAdd,
  showBackArrow,
  smallMargin,
  text,
}) => {
  const toggleAdd = () => goTo('/account/import-qr')

  return (
    <div className={`${className} ${smallMargin ? 'smallMargin' : ''}`}>
      <div className='container'>
        <div className='branding'>
          {showBackArrow && (
            <button className='backlink' onClick={goHome}>
              Back
            </button>
          )}
          <span className='logoText'>{text || EXT_NAME}</span>
        </div>
        <div className='popupMenus'>
          {showAdd && (
            <button className='popupToggle' onClick={toggleAdd}>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default styled(Header)`
  max-width: 100%;
  box-sizing: border-box;
  font-weight: normal;
  margin: 0;
  position: relative;
  margin-bottom: 25px;

  && {
    padding: 0 0 0;
  }

  > .container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid ${({ theme }: Props) => theme.inputBorderColor};
    min-height: 70px;

    .branding {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${({ theme }: Props) => theme.labelColor};
      font-family: ${({ theme }: Props) => theme.fontFamily};
      text-align: center;
      margin-left: 24px;

      .logoText {
        color: ${({ theme }: Props) => theme.textColor};
        font-family: ${({ theme }: Props) => theme.fontFamily};
        font-size: 20px;
        line-height: 27px;
      }
    }

    .backLink {
      display: inline-block;
      vertical-align: middle;
    }

    .popupMenus {
      align-self: center;

      .popupToggle {
        display: inline-block;
        vertical-align: middle;

        &:last-child {
          margin-right: 24px;
        }
      }

      .popupToggle + .popupToggle {
        margin-left: 8px;
      }
    }
  }

  &.smallMargin {
    margin-bottom: 15px;
  }
`
