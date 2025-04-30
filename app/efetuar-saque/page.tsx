import WithdrawalForm from "@/components/withdrawal-form"
import DashboardLayout from "@/components/dashboard-layout"
import PageTransition from "@/components/page-transition"

export default function WithdrawalPage() {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-3xl mx-auto">
          <WithdrawalForm />
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}
