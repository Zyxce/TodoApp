import React, { useState } from 'react'

const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value
      setStoredValue(newValue)
      localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
