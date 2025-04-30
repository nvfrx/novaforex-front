import SupportPage from "@/components/support-page"
import DashboardLayout from "@/components/dashboard-layout"
import PageTransition from "@/components/page-transition"

export default function Support() {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-6xl mx-auto">
          <SupportPage />
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}
