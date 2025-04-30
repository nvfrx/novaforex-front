import FinancialStatement from "@/components/financial-statement"
import DashboardLayout from "@/components/dashboard-layout"
import PageTransition from "@/components/page-transition"

export default function FinancialStatementPage() {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-6xl mx-auto">
          <FinancialStatement />
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}
