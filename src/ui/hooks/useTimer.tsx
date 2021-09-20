import { useEffect, useRef, useState } from 'react'

const DEFAULT_COUNTER = 10

export const useTimer = (defaultValue = DEFAULT_COUNTER) => {
  const counterInterval = useRef<ReturnType<typeof setInterval>>()
  const [value, setValue] = useState(defaultValue)
  const started = value < defaultValue
  const fired = value === 0
  const decreaseValue = () => setValue((v) => v - 1)

  const start = () => {
    decreaseValue()
    counterInterval.current = setInterval(decreaseValue, 1000)
  }
  const reset = () => {
    counterInterval.current && clearInterval(counterInterval.current)
    setValue(defaultValue)
  }

  useEffect(() => {
    if (value < 0) reset()
  }, [value])

  useEffect(
    () => () =>
      counterInterval.current && clearInterval(counterInterval.current),
    []
  )

  return { value, defaultValue, start, reset, started, fired }
}
