import DashboardNavbar from "../components/DashboardNavbar";
import DashboardHero from "../components/DashboardHero";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0b0c16]">
      <DashboardNavbar />

      <div className="px-6 py-10 m-3">
        <DashboardHero />
      </div>
    </div>
  );
};

export default Dashboard;