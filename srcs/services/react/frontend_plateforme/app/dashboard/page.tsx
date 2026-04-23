import DashboardLayout from "./components/dashboard/DashboardLayout"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <DashboardLayout />
    </div>
  );
}
