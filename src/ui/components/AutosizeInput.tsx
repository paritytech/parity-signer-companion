import React from 'react'

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void
}

export const AutosizeInput: React.FC<Props> = ({
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
    <div className='inline-block relative'>
      <span
        className='opacity-0 absolute whitespace-nowrap pointer-events-none'
        ref={span}
      >
        {content || placeholder}
      </span>
      <input
        className='relative max-w-xs transition-colors bg-_bg-300 text-_crypto-400 outline-none border-b border-_border-400 hover:border-_border-500 focus:border-_border-500'
        value={content}
        placeholder={placeholder}
        style={{ width }}
        onChange={handleChange}
        {...rest}
      />
    </div>
  )
}
