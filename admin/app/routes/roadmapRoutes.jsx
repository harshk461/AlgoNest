import { SunMoon, Key, FileText, RefreshCw, ShieldAlert } from "lucide-react";

const roadmapRoutes = [
  {
    path: "/roadmap/create-roadmap",
    sideBarProps: {
      displayText: "Create Roadmap",
      icon: <FileText size={20} />, // 📄 File icon for creating a roadmap
    },
  },
  {
    path: "/roadmap/all-roadmaps",
    sideBarProps: {
      displayText: "All Roadmaps",
      icon: <RefreshCw size={20} />, // 🔄 Refresh for viewing all roadmaps
    },
  },
  {
    path: "/roadmap/add-topic",
    sideBarProps: {
      displayText: "Add Topic",
      icon: <Key size={20} />, // 🔑 Key icon for adding topics
    },
  },
  {
    path: "/roadmap/all-topics",
    sideBarProps: {
      displayText: "All Topics",
      icon: <SunMoon size={20} />, // 🌗 Sun & Moon for managing topics
    },
  },
];

export default roadmapRoutes;
