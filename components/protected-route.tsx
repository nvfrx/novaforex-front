// components/ProtectedRoute.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from '@/hooks/use-session'

interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { session, loading } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/login')
    }
  }, [session, loading, router])

  if (loading || !session) {
    return <div className="p-4">Carregando...</div>
  }

  return <>{children}</>
}

export default ProtectedRoute