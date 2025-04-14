import {
  Home,
  Users,
  ShieldCheck,
  ClipboardList
} from "lucide-react";

const adminRoutes = [
  {
    path: "/admin/all-roles",
    sideBarProps: {
      displayText: "Roles & Permissions",
      icon: <ShieldCheck />,
    },
  },
  {
    path: "/admin/add-role",
    sideBarProps: {
      displayText: "Add Role",
      icon: <ClipboardList />,
    },
  },
];

export default adminRoutes;
