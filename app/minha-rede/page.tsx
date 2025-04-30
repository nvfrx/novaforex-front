import NetworkAccordion from "@/components/network-accordion"
import DashboardLayout from "@/components/dashboard-layout"
import PageTransition from "@/components/page-transition"

export default function NetworkPage() {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-6xl mx-auto">
          <NetworkAccordion />
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}
