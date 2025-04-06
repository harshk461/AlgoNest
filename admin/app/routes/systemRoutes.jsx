const systemRoutes = [
  {
    path: "/system/settings",
    sideBarProps: {
      displayText: "System Settings",
      icon: "Cog", // ⚙️ General settings icon
    },
  },
  {
    path: "/system/settings/general",
    sideBarProps: {
      displayText: "General Settings",
      icon: "Settings",
    },
  },
  {
    path: "/system/settings/notifications",
    sideBarProps: {
      displayText: "Notification Settings",
      icon: "Bell", // 🔔 Notifications icon
    },
  },
  {
    path: "/system/settings/security",
    sideBarProps: {
      displayText: "Security Settings",
      icon: "Shield", // 🛡️ Security icon
    },
  },
  {
    path: "/system/logs",
    sideBarProps: {
      displayText: "System Logs",
      icon: "ClipboardList", // 📋 Logs icon
    },
  },
  {
    path: "/system/backups",
    sideBarProps: {
      displayText: "Backups",
      icon: "Archive", // 📦 Backups icon
    },
  },
  {
    path: "/system/updates",
    sideBarProps: {
      displayText: "System Updates",
      icon: "RefreshCw", // 🔄 Updates icon
    },
  },
  {
    path: "/system/api-keys",
    sideBarProps: {
      displayText: "API Keys Management",
      icon: "Key", // 🔑 API keys icon
    },
  },
  {
    path: "/system/integrations",
    sideBarProps: {
      displayText: "Integrations",
      icon: "Plug", // 🔌 Integrations icon
    },
  },
];

export default systemRoutes;
