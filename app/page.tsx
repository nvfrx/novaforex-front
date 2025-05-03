import Dashboard from "@/components/dashboard"
import PageTransition from "@/components/page-transition"
import ProtectedRoute from "@/components/protected-route"

export default function Home() {
  return (
    <ProtectedRoute>
      <PageTransition>
        <Dashboard />
      </PageTransition>
    </ProtectedRoute>
  )
}
