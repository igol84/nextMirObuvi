'use client'

import {useState} from 'react'
import {useDictionaryTranslate} from "@/dictionaries/hooks";

export default function Counter() {
  const [count, setCount] = useState(0)
  const d = useDictionaryTranslate("counter")
  return (
    <p>
      {d('label')}{' '}
      <button onClick={() => setCount((n) => n - 1)}>
        {d('decrement')}
      </button>
      {' '}
      {count}{' '}
      <button onClick={() => setCount((n) => n + 1)}>
        {d('increment')}
      </button>
    </p>
  )
}
