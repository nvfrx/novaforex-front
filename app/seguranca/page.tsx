import SecuritySettings from "@/components/security-settings"
import DashboardLayout from "@/components/dashboard-layout"
import PageTransition from "@/components/page-transition"

export default function SecurityPage() {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-4xl mx-auto">
          <SecuritySettings />
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}
