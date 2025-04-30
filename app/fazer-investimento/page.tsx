import InvestmentForm from "@/components/investment-form"
import DashboardLayout from "@/components/dashboard-layout"
import PageTransition from "@/components/page-transition"

export default function InvestPage() {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-3xl mx-auto">
          <InvestmentForm />
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}
