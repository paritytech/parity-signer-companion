import React, { useEffect } from 'react'
import { useTimer } from '../../hooks/useTimer'
import { forgetAccount } from '../../messaging/uiActions'
import cancelIcon from '../assets/cancel.svg'
import { Address } from './Address'
import { Button } from './Button'

type Props = {
  address?: string
  genesisHash?: string | null
  name?: string
}

export const Key: React.FC<Props> = ({ ...account }) => {
  const timer = useTimer()
  const removing = timer.started

  useEffect(() => {
    if (timer.fired)
      forgetAccount(account.address as string).catch(console.error)
  }, [timer.fired])

  return (
    <div className=''>
      {!removing && (
        <Address
          address={account.address}
          genesisHash={account.genesisHash}
          name={account.name}
          key={account.address}
        />
      )}
      {!removing && (
        <div className='icon cancel highlighted' onClick={timer.start}>
          <img src={cancelIcon} />
        </div>
      )}
      {removing && (
        <div className='removed'>
          <div>
            Removing &ldquo;{account.name}&rdquo; — {timer.value}s
          </div>
          <Button onClick={timer.reset}>Undo</Button>
        </div>
      )}
    </div>
  )
}

// TODO:
// export default styled(Key)`
//   position: relative;

//   .removed {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     height: 3rem;
//     padding: 0.5rem;
//     border: 2px dashed var(--color-card-bg);
//     border-radius: 0.2rem;
//   }

//   .logo {
//     padding: 0.25rem;
//     padding-right: 0rem;
//   }

//   .logo svg {
//     cursor: default;
//   }

//   .content {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     padding: 0 0.5rem;
//   }

//   .name {
//     margin-top: -0.1rem;
//     margin-bottom: 0.1rem;
//   }

//   .address {
//     display: flex;
//     align-items: center;
//     font-size: var(--font-small-size);
//     color: var(--color-faded-text);
//   }

//   .hash {
//     padding: 0 0.2rem;
//   }

//   .icon {
//     width: 1rem;
//     height: 1rem;
//   }

//   .cancel {
//     position: absolute;
//     top: 0.2rem;
//     right: 0.2rem;
//   }

//   .highlighted {
//     border-radius: 0.2rem;
//     transition: var(--transition);
//     cursor: pointer;
//   }

//   .highlighted:hover {
//     background: var(--color-highlight);
//   }

//   & + & {
//     margin-top: 0.2rem;
//   }
// `
