import NetworkStatement from "@/components/network-statement"
import DashboardLayout from "@/components/dashboard-layout"
import PageTransition from "@/components/page-transition"

export default function NetworkStatementPage() {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-6xl mx-auto">
          <NetworkStatement />
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}
