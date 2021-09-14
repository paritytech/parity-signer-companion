import {
  faArrowLeft,
  faCog,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from '@polkadot/extension-ui/components/Link'
import useOutsideClick from '@polkadot/extension-ui/hooks/useOutsideClick'
import MenuAdd from '@polkadot/extension-ui/partials/MenuAdd'
import MenuSettings from '@polkadot/extension-ui/partials/MenuSettings'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import type { ExtThemeProps } from '../types'

interface Props extends ExtThemeProps {
  showAdd?: boolean
  showBackArrow?: boolean
  showSettings?: boolean
  smallMargin?: boolean
  text?: React.ReactNode
}

const Header: React.FC<Props> = ({
  children,
  className,
  showAdd,
  showBackArrow,
  showSettings,
  smallMargin = false,
  text,
}) => {
  const [isAddOpen, setShowAdd] = useState(false)
  const [isSettingsOpen, setShowSettings] = useState(false)
  const addRef = useRef(null)
  const setRef = useRef(null)

  useOutsideClick(addRef, (): void => {
    isAddOpen && setShowAdd(!isAddOpen)
  })

  useOutsideClick(setRef, (): void => {
    isSettingsOpen && setShowSettings(!isSettingsOpen)
  })

  const toggleAdd = () => setShowAdd((isAddOpen) => !isAddOpen)

  const toggleSettings = () =>
    setShowSettings((isSettingsOpen) => !isSettingsOpen)

  return (
    <div className={`${className} ${smallMargin ? 'smallMargin' : ''}`}>
      <div className='container'>
        <div className='branding'>
          {showBackArrow && (
            <Link className='backlink' to='/'>
              <FontAwesomeIcon className='arrowLeftIcon' icon={faArrowLeft} />
            </Link>
          )}
          <span className='logoText'>{text || 'polkadot{.js}'}</span>
        </div>
        <div className='popupMenus'>
          {showAdd && (
            <div className='popupToggle' onClick={toggleAdd}>
              <FontAwesomeIcon
                className={`plusIcon ${isAddOpen ? 'selected' : ''}`}
                icon={faPlusCircle}
                size='lg'
              />
            </div>
          )}
          {showSettings && (
            <div
              className='popupToggle'
              data-toggle-settings
              onClick={toggleSettings}
            >
              <FontAwesomeIcon
                className={`cogIcon ${isSettingsOpen ? 'selected' : ''}`}
                icon={faCog}
                size='lg'
              />
            </div>
          )}
        </div>
        {isAddOpen && <MenuAdd reference={addRef} />}
        {isSettingsOpen && <MenuSettings reference={setRef} />}
        {children}
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

      .logo {
        height: 28px;
        width: 28px;
        margin: 8px 12px 12px 0;
      }

      .logoText {
        color: ${({ theme }: ExtThemeProps) => theme.textColor};
        font-family: ${({ theme }: ExtThemeProps) => theme.fontFamily};
        font-size: 20px;
        line-height: 27px;
      }
    }

    .popupMenus {
      align-self: center;

      .popupToggle {
        display: inline-block;
        vertical-align: middle;

        &:last-child {
          margin-right: 24px;
        }

        &:hover {
          cursor: pointer;
        }
      }

      .popupToggle + .popupToggle {
        margin-left: 8px;
      }
    }
  }

  .plusIcon,
  .cogIcon {
    color: ${({ theme }: ExtThemeProps) => theme.iconNeutralColor};

    &.selected {
      color: ${({ theme }: ExtThemeProps) => theme.primaryColor};
    }
  }

  .arrowLeftIcon {
    color: ${({ theme }: ExtThemeProps) => theme.labelColor};
    margin-right: 1rem;
  }

  .backlink {
    color: ${({ theme }: ExtThemeProps) => theme.labelColor};
    min-height: 52px;
    text-decoration: underline;
    width: min-content;

    &:visited {
      color: ${({ theme }: ExtThemeProps) => theme.labelColor};
    }
  }

  &.smallMargin {
    margin-bottom: 15px;
  }
`
