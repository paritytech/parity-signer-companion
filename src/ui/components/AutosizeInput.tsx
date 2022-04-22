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
  const isContentChangedRef = React.useRef(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isContentChangedRef.current) isContentChangedRef.current = true
    setContent(e.currentTarget.value)
  }

  React.useEffect(() => {
    const newContent = value?.toString()
    if (newContent && newContent !== content) setContent(newContent)
  }, [value])

  React.useEffect(() => {
    setWidth(span.current?.offsetWidth || 0)
    if (isContentChangedRef.current) onChange(content)
  }, [content])

  return (
    <div className={className}>
      <span className='autoresize-spacer' ref={span}>
        {content || placeholder}
      </span>
      <input
        value={content}
        placeholder={placeholder}
        style={{ width }}
        onChange={handleChange}
        {...rest}
      />
      <span className='bordered' />
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

  .autoresize-spacer {
    opacity: 0;
    position: absolute;
    white-space: nowrap;
    pointer-events: none;
  }

  .bordered {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--color-highlight);
  }
`
