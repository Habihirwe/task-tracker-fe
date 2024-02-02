import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { DataType, date, intDateFormat } from "../pages/Dashboard";
import { useDispatch, useSelector } from "../redux";
import { fetckTasks, selectTask } from "../redux/slices/task";
import { useNavigate } from "react-router-dom";

const InQueue: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(selectTask);

  const data: DataType[] = tasks?.data?.data?.data?.filter((task: any) => {
    return task.status === "Queuing";
  });

  useEffect(() => {
    dispatch(fetckTasks());
  }, [dispatch]);
  return (
    <div className="pl-56">
      <Sidebar />
      <div className="p-5">
        <h1>{intDateFormat.format(date)}</h1>
        <div className="flex flex-wrap gap-3 justify-start content-center mx-auto pt-5">
          {data ? (
            data?.map((task: any) => {
              return (
                <div
                  className="w-60 h-60 bg-zinc-50 shadow-lg p-2 rounded-md border cursor-pointer"
                  onClick={() => {
                    navigate(`/dashboard/task/${task._id}`);
                  }}
                >
                  <h1 className="flex items-center gap-2">
                    <p
                      className={`w-2 h-2 rounded-full ${
                        task.priority === "Low"
                          ? "bg-red-400"
                          : task.priority === "Medium"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                      }`}
                    ></p>{" "}
                    {task.priority}
                  </h1>
                  <h1 className="my-2 text-slate-600 text-lg font-semibold">
                    {task.title}
                  </h1>
                  <p>{task.description}</p>
                </div>
              );
            })
          ) : (
            <h1>No data</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default InQueue;
