import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DashboardCards from "./DashboardCards";
import RecentPayments from "./RecentPayments";
import NewEmployee from "./NewEmployee";
import SalesBarChart from './SalesBarChart';



const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-gray-100">
          <DashboardCards />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-10">
            <RecentPayments />
            <NewEmployee />
            <SalesBarChart />

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
