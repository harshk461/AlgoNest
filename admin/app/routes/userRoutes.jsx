import {
  Users,
  LayoutDashboard,
  UserX,
  Trash2,
  Activity,
} from "lucide-react";

const userRoutes = [
  {
    path: "/users/client-users",
    sideBarProps: {
      displayText: "Client Users",
      icon: <Users />,
    },
  },
  {
    path: "/users/dashboard-users",
    sideBarProps: {
      displayText: "Dashboard Users",
      icon: <LayoutDashboard />,
    },
  },
  {
    path: "/users/ban",
    sideBarProps: {
      displayText: "Banned Users",
      icon: <UserX />,
    },
  },
  {
    path: "/users/deleted-client-users",
    sideBarProps: {
      displayText: "Deleted Users",
      icon: <Trash2 />,
    },
  },
  {
    path: "/users/activity",
    sideBarProps: {
      displayText: "User Activity",
      icon: <Activity />,
    },
  },
];

export default userRoutes;
