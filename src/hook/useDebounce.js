import { useState, useEffect } from 'react'

const useDebounce = (inputValue, delay) => {
  const [value, setValue] = useState()
  useEffect(() => {
    const timmer = setTimeout(() => {
      setValue(inputValue)
    }, delay)
    return () => clearTimeout(timmer)
  }, [inputValue, delay])
  return value
}

export default useDebounce
