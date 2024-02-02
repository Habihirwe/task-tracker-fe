import React from "react";
import profImg from "../assets/profile.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { PiChartLineUpBold } from "react-icons/pi";
import { HiMiniQueueList } from "react-icons/hi2";
import { FaFlagCheckered } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const url = window.location.href;
  const splitUrl = url.split("/");

  const active = splitUrl[splitUrl.length - 1];
  return (
    <div>
      <aside className="fixed top-0 left-0 z-40 w-56 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 relative">
          <ul className="space-y-2 font-medium relative">
            <li className="flex items-center gap-2 pt-3 pb-6">
              <img
                src={profImg}
                alt="Profile Image"
                className="w-14 aspect-square rounded-full"
              />
              <p className="font-bold">Olivier Habihirwe</p>
            </li>
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-red-100 group ${
                  active === "dashboard" && "bg-red-100"
                }`}
              >
                <MdDashboard className="text-slate-500" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/in_progress"
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-red-100 group ${
                  active === "in_progress" && "bg-red-100"
                }`}
              >
                <PiChartLineUpBold className="text-slate-500" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  In Progress
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/queue"
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-red-100 group ${
                  active === "queue" && "bg-red-100"
                }`}
              >
                <HiMiniQueueList className="text-slate-500" />
                <span className="flex-1 ms-3 whitespace-nowrap">Queue</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/completed"
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-red-100 group ${
                  active === "completed" && "bg-red-100"
                }`}
              >
                <FaFlagCheckered className="text-slate-500" />
                <span className="flex-1 ms-3 whitespace-nowrap">Completed</span>
              </Link>
            </li>
          </ul>
          <div className="absolute bottom-4 w-[90%]">
            <span
              className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-red-400 group ${
                active === "completed" && "bg-red-100"
              }`}
              onClick={() => {
                localStorage.removeItem("userToken");
                navigate("/login");
              }}
            >
              <MdLogout className="text-slate-700" />
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
