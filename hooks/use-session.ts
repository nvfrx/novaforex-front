'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/axios'

export function useSession() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get('/auth/me')
        setSession(data)                              
      } catch {
        setSession(null)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return { session, loading }
}