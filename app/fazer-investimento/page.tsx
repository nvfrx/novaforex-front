// app/fazer-investimento/page.tsx
import DashboardLayout from '@/components/dashboard-layout'
import PageTransition from '@/components/page-transition'
import ProtectedRoute from '@/components/protected-route'
import InvestmentForm from '@/components/investment-form'

export default function InvestPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PageTransition>
          <div className="max-w-3xl mx-auto py-8">
            <InvestmentForm />
          </div>
        </PageTransition>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
