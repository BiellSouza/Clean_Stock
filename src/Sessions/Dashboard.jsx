import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  Calendar,
  ChevronDown,
  LayerArrowUp,
  PackageSearch,
  Search,
  ShelvingUnit,
  Wallet,
} from "lucide-react";
import CardsDashboard from "./cards/CardsDashboard";
import SidebarComponent from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";

function Dashboard() {
  return (
    <div className="min-h-screen pb-8">
      <div className="">
        <SidebarComponent />
      </div>

      <div>
        
      </div>
    </div>
  );
}

export default Dashboard;
