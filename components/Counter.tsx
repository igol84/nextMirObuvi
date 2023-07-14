'use client'

import {useState} from 'react'

interface Dictionary{
  label:string
  increment: string
  decrement: string
}

interface Props{
  dictionary: Dictionary
}

export default function Counter({dictionary}: Props) {
  const [count, setCount] = useState(0)
  return (
    <p>
      {dictionary.label}{' '}
      <button onClick={() => setCount((n) => n - 1)}>
        {dictionary.decrement}
      </button>
      {' '}
      {count}{' '}
      <button onClick={() => setCount((n) => n + 1)}>
        {dictionary.increment}
      </button>
    </p>
  )
}
