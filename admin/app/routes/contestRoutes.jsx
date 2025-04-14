import {
  CalendarCheck,
  Archive,
  PlusCircle
} from "lucide-react";

const contestRoutes = [
  {
    path: "/contests/upcoming-contests",
    sideBarProps: {
      displayText: "Upcoming Contests",
      icon: <CalendarCheck />,
    },
  },
  {
    path: "/contests/past-contests",
    sideBarProps: {
      displayText: "Past Contests",
      icon: <Archive />,
    },
  },
  {
    path: "/contests/create-contest",
    sideBarProps: {
      displayText: "Create Contest",
      icon: <PlusCircle />,
    },
  },
];

export default contestRoutes;
