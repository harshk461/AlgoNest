import {
  GitBranch,
  GitPullRequest,
  GitPullRequestArrow,
  User,
} from "lucide-react";
import ProtectedRoute from "@/utils/ProtectedRoute";

const appRoutes = [
  {
    path: "/all-problems",
    sideBarProps: {
      displayText: "All Problems",
      icon: <GitPullRequest />,
    },
  },
  {
    path: "/add-problem",
    sideBarProps: {
      displayText: "Add Problem",
      icon: <GitPullRequestArrow />,
    },
  },
  {
    path: "/approve-problem",
    sideBarProps: {
      displayText: "Approve Problem",
      icon: <GitBranch />,
    },
  },
  {
    path: "/users",
    sideBarProps: {
      displayText: "Users",
      icon: <User />,
    },
  },
];

export default appRoutes;
