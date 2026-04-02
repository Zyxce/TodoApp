import { renderHook, act } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('возвращает initialValue, если в localStorage ничего нет', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'))
    expect(result.current[0]).toBe('default')
  })

  test('читает значение из localStorage при первом рендере', () => {
    localStorage.setItem('testKey', JSON.stringify('savedValue'))
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'))
    expect(result.current[0]).toBe('savedValue')
  })

  test('обновляет состояние и localStorage через setValue', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 0))
    act(() => {
      result.current[1](42)
    })
    expect(result.current[0]).toBe(42)
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify(42))
  })

  test('поддерживает функциональное обновление (prev => prev + 1)', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 5))
    act(() => {
      result.current[1]((prev) => prev + 1)
    })
    expect(result.current[0]).toBe(6)
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify(6))
  })
})
