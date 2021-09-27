import React, { useEffect, useState } from 'react'

const RESET_TIME = 1000

export const useTimedReset = <T>(
  v: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(v)

  useEffect(() => {
    if (value === v) return

    setTimeout(() => setValue(v), RESET_TIME)
  })

  return [value, setValue]
}
