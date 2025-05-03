'use client'

import { useEffect, useState } from 'react'

export function useSession() {
  const [session, setSession] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token') // ajuste se usar outro nome
    if (token) {
      setSession(token)
    } else {
      setSession(null)
    }
    setLoading(false)
  }, [])

  return { session, loading }
}