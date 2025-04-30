import InvestmentsList from "@/components/investments-list"
import DashboardLayout from "@/components/dashboard-layout"
import PageTransition from "@/components/page-transition"

export default function MyInvestmentsPage() {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-5xl mx-auto">
          <InvestmentsList />
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}
