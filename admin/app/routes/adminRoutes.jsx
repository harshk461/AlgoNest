const adminRoutes = [
  {
    path: "/admin/dashboard",
    sideBarProps: {
      displayText: "Dashboard",
      icon: "Home",
    },
  },
  {
    path: "/admin/manage-users",
    sideBarProps: {
      displayText: "Manage Users",
      icon: "Users",
    },
  },
  {
    path: "/admin/roles-permissions",
    sideBarProps: {
      displayText: "Roles & Permissions",
      icon: "ShieldCheck",
    },
  },
  {
    path: "/admin/audit-logs",
    sideBarProps: {
      displayText: "Audit Logs",
      icon: "ClipboardList",
    },
  },
];

export default adminRoutes;
