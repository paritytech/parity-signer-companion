import useOutsideClick from '@polkadot/extension-ui/hooks/useOutsideClick'
import MenuSettings from '@polkadot/extension-ui/partials/MenuSettings'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { EXT_NAME } from '../../utils/constants'
import type { ExtThemeProps } from '../types'
import { goTo } from '../utils/goTo'

interface Props extends ExtThemeProps {
  showAdd?: boolean
  showBackArrow?: boolean
  showSettings?: boolean
  smallMargin?: boolean
  text?: React.ReactNode
}

const Header: React.FC<Props> = ({
  className,
  showAdd,
  showBackArrow,
  showSettings,
  smallMargin,
  text,
}) => {
  const [isSettingsOpen, setShowSettings] = useState(false)
  const setRef = useRef(null)

  useOutsideClick(setRef, (): void => {
    isSettingsOpen && setShowSettings(!isSettingsOpen)
  })

  const toggleAdd = () => goTo('/account/import-qr')

  const toggleSettings = () =>
    setShowSettings((isSettingsOpen) => !isSettingsOpen)

  const toggleBack = () => goTo('/')

  return (
    <div className={`${className} ${smallMargin ? 'smallMargin' : ''}`}>
      <div className='container'>
        <div className='branding'>
          {showBackArrow && (
            <button className='backlink' onClick={toggleBack}>
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
          {showSettings && (
            <button className='popupToggle' onClick={toggleSettings}>
              Settings
            </button>
          )}
        </div>
        {isSettingsOpen && <MenuSettings reference={setRef} />}
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
    border-bottom: 1px solid
      ${({ theme }: ExtThemeProps) => theme.inputBorderColor};
    min-height: 70px;

    .branding {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${({ theme }: ExtThemeProps) => theme.labelColor};
      font-family: ${({ theme }: ExtThemeProps) => theme.fontFamily};
      text-align: center;
      margin-left: 24px;

      .logoText {
        color: ${({ theme }: ExtThemeProps) => theme.textColor};
        font-family: ${({ theme }: ExtThemeProps) => theme.fontFamily};
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
