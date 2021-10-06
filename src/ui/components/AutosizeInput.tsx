import React from 'react'
import styled from 'styled-components'
import { BaseProps } from '../types'

type Props = BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    onChange: (value: string) => void
  }

const AutosizeInput: React.FC<Props> = ({
  className,
  value,
  placeholder,
  onChange,
  ...rest
}) => {
  const [content, setContent] = React.useState<string>(value?.toString() || '')
  const [width, setWidth] = React.useState(0)
  const span = React.useRef<HTMLSpanElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.currentTarget.value)

  React.useEffect(() => {
    setWidth(span.current?.offsetWidth || 0)
    onChange(content)
  }, [content])

  return (
    <div className={className}>
      <span className='spacer' ref={span}>
        {content || placeholder}
      </span>
      <input
        value={content}
        placeholder={placeholder}
        style={{ width }}
        onChange={handleChange}
        {...rest}
      />
      <span className='border' />
    </div>
  )
}

export default styled(AutosizeInput)`
  display: inline-block;
  position: relative;

  input {
    all: unset;
    position: relative;
    max-width: 16rem;
    border-radius: 0.2rem 0.2rem 0 0;
    transition: background var(--transition);
  }

  input:hover,
  input:focus {
    background: var(--color-highlight);
  }

  .spacer {
    opacity: 0;
    position: absolute;
    white-space: nowrap;
    pointer-events: none;
  }

  .border {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--color-highlight);
  }
`
