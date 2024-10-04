import { GrChapterAdd } from "react-icons/gr";
import { CiCalculator2 } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";
import { MdLogout } from "react-icons/md";

export const API_URL = "http://192.168.100.192:3000/";

export const MENU_ITEMS = [
  {
    name: "Characters",
    route: "/characterspage",
    icon: <GrChapterAdd />,
  },
  {
    name: "Customer",
    route: "/customerspage",
    icon: <MdHeadsetMic />,
  },
  {
    name: "Add Task",
    route: "/addtaskspage",
    icon: <FaTasks />,
  },
  {
    name: "Counter",
    route: "/counterpage",
    icon: <CiCalculator2 />,
  },
  {
    name: "Logout",
    route: "",
    icon: <MdLogout />,
  },
];

export const NO_LAYOUT_ROUTES = ["register", "login"];
