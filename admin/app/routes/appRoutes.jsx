import { GitPullRequest, GitPullRequestArrow } from "lucide-react";

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
];

export default appRoutes;
