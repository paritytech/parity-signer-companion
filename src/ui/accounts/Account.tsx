import { AccountJson } from '@polkadot/extension-base/background/types'
import Address from '../components/Address'
import React from 'react'
import styled from 'styled-components'
import { ThemeProps } from '../types'

interface Props extends AccountJson {
  className?: string
  parentName?: string
}

const Account: React.FC<Props> = ({
  address,
  className,
  genesisHash,
  name,
}) => {
  return (
    <div className={className}>
      <Address
        address={address}
        className='address'
        genesisHash={genesisHash}
        name={name}
      />
    </div>
  )
}

export default styled(Account)`
  .address {
    margin-bottom: 8px;
  }

  .editName {
    position: absolute;
    flex: 1;
    left: 70px;
    top: 10px;
    width: 350px;

    .danger {
      background-color: ${({ theme }: ThemeProps) => theme.bodyColor};
      margin-top: -13px;
      width: 330px;
    }

    input {
      height: 30px;
      width: 350px;
    }

    &.withParent {
      top: 16px;
    }
  }

  .menuItem {
    border-radius: 8px;
    display: block;
    font-size: 15px;
    line-height: 20px;
    margin: 0;
    min-width: 13rem;
    padding: 4px 16px;

    .genesisSelection {
      margin: 0;
    }
  }
`
