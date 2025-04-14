import {
  FileText,
  RefreshCw,
  Folder
} from "lucide-react";

const problemRoutes = [
  {
    path: "/problems/add-problem",
    sideBarProps: {
      displayText: "Create Problem",
      icon: <FileText />,
    },
  },
  {
    path: "/problems/all-problems",
    sideBarProps: {
      displayText: "All Problems",
      icon: <RefreshCw />,
    },
  },
  {
    path: "/problems/approve-problem",
    sideBarProps: {
      displayText: "Approve Problems",
      icon: <Folder />,
    },
  },
  {
    path: "/problems/deleted-problems",
    sideBarProps: {
      displayText: "Deleted Problem",
      icon: <Folder />,
    },
  },
  {
    path: "/problems/toggle",
    sideBarProps: {
      displayText: "Toggle Problem",
      icon: <Folder />,
    },
  }
];

export default problemRoutes;
