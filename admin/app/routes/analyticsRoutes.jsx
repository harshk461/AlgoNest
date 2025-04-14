import { BarChart3, LineChart } from "lucide-react"; // import icons from lucide-react

const analyticsRoutes = [
  {
    path: "/analytics/user-analytics",
    sideBarProps: {
      displayText: "User Analytics",
      icon: <BarChart3 />, // Lucide icon component
    },
  },
  {
    path: "/analytics/system-analytics",
    sideBarProps: {
      displayText: "System Analytics",
      icon: <LineChart />, // Lucide icon component
    },
  },
];

export default analyticsRoutes;
