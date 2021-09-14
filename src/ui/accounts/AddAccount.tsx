import useTranslation from '@polkadot/extension-ui/hooks/useTranslation'
import Header from '@polkadot/extension-ui/partials/Header'
import React from 'react'
import styled from 'styled-components'
import type { ExtThemeProps } from '../types'
import { goTo } from '../utils/goTo'

const AddAccount: React.FC<ExtThemeProps> = ({ className }) => {
  const { t } = useTranslation()
  const onClick = () => goTo('/account/create')

  return (
    <>
      <Header showAdd showSettings text={t('Add Account')} />
      <div className={className}>
        <div className='image'>
          <button onClick={onClick}>Add</button>
        </div>
        <div className='no-accounts'>
          <p>
            {t(
              "You currently don't have any accounts. Create your first account to get started."
            )}
          </p>
        </div>
      </div>
    </>
  )
}

export default styled(AddAccount)(
  ({ theme }: ExtThemeProps) => `
    color: ${theme.textColor};
    height: 100%;

    h3 {
      color: ${theme.textColor};
      margin-top: 0;
      font-weight: normal;
      font-size: 24px;
      line-height: 33px;
      text-align: center;
    }

    > .image {
      display: flex;
      justify-content: center;
    }

    > .no-accounts p {
      text-align: center;
      font-size: 16px;
      line-height: 26px;
      margin: 0 30px;
      color: ${theme.subTextColor};
    }
`
)
