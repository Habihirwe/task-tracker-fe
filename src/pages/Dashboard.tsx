import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "../redux";
import {
  createTask,
  fetckTasks,
  selectTask,
  updateTask,
} from "../redux/slices/task";
import { Button, Modal, Table, TableProps, Tag, message } from "antd";
import Chart from "react-google-charts";
import { FiPlus } from "react-icons/fi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface DataType {
  key: string;
  name: string;
  subtasks: number;
  priority: string;
  status: string[];
  tags: string[];
}

const options = {
  title: "",
  pieHole: 0.4,
  width: 300,
  height: 180,
  is3D: false,
  colors: ["#BAEDBD", "#95A4FC", "#C6C7F8", "#1C1C1C"],
  legend: "bottom",
};

type Inputs = {
  title: string;
  description: string;
  priority: string;
  starteddate: string;
};

const dateOptions: any = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
export const date = new Date(Date.now());
export const intDateFormat = new Intl.DateTimeFormat("en-ZA", dateOptions);

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(selectTask);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, { key }) => (
        <a onClick={() => navigate(`/dashboard/task/${key}`)}>{text}</a>
      ),
    },
    {
      title: "Subtasks",
      dataIndex: "subtasks",
      key: "subtasks",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_, { tags, key }) => {
        console.log(tags, _);
        return (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "Start") {
                color = "green";
              }
              if (tag === "Cancel") {
                color = "volcano";
              }
              if (tag === "Details") {
                color = "geekblue";
              }
              return (
                <Tag
                  color={color}
                  key={tag}
                  className="cursor-pointer"
                  onClick={() => {
                    tag === "Start"
                      ? dispatch(
                          updateTask({ id: key, data: { status: "Started" } })
                        )
                          .then((res) => {
                            if (res.type === "task/update/fulfilled") {
                              message.success("Task set in queue successfully");
                            }
                          })
                          .then(() => {
                            dispatch(fetckTasks());
                          })
                      : tag === "Cancel"
                      ? dispatch(
                          updateTask({
                            id: key,
                            data: { status: "Canceled" },
                          })
                        )
                          .then((res) => {
                            if (res.type === "task/update/fulfilled") {
                              message.success("Task canceled successfully");
                            }
                          })
                          .then(() => {
                            dispatch(fetckTasks());
                          })
                      : navigate(`/dashboard/task/${key}`);
                  }}
                >
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const filteredTasks = tasks?.data?.data?.data?.filter((task: any) => {
    return task.status !== "Canceled";
  });

  const data: DataType[] = filteredTasks?.map((task: any) => {
    return {
      key: task._id,
      name: task.title,
      subtasks: task.subtasks.length,
      priority: task.priority,
      status: task.status,
      tags:
        task.status === "Queuing"
          ? ["Start", "Cancel"]
          : task.status === "completed" ||
            task.status === "Completed" ||
            task.status === "Canceled"
          ? ["Details"]
          : task.status === "Started"
          ? ["Cancel"]
          : [],
    };
  });

  useEffect(() => {
    dispatch(fetckTasks());
  }, [dispatch]);

  const resultData = tasks?.data?.data?.data?.reduce(
    (acc: any, task: any) => {
      const existingTaskIndex = acc.findIndex(
        (entry: any) => entry[0] === task.status
      );

      if (existingTaskIndex !== -1) {
        acc[existingTaskIndex][1]++;
      } else {
        acc.push([task.status, 1]);
      }

      return acc;
    },
    [["Task", "Task tracker"]]
  );

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    dispatch(createTask(data))
      .then((res) => {
        if (res.type === "task/create/fulfilled") {
          message.success("Task created successfully");
          setIsModalOpen(false);
        }
      })
      .then(() => {
        dispatch(fetckTasks());
      });
  };

  return (
    <div className="">
      <div>
        <Sidebar />
      </div>
      <div className="pl-56">
        <div className="flex items-start w-full justify-between p-5">
          <div>
            <h1>{intDateFormat.format(date)}</h1>
            <h1 className="text-slate-600 font-semibold my-2">Dashboard</h1>
            <Button
              className="flex items-center gap-2 bg-slate-500"
              style={{
                backgroundColor: "#979797",
                border: "none",
                color: "#fff",
              }}
              onClick={showModal}
            >
              <FiPlus /> Create Task
            </Button>
            <h1 className="text-slate-600 font-semibold my-2 mt-5">
              Today you have{" "}
              {tasks?.data?.data?.data && tasks?.data?.data?.data?.length} tasks
            </h1>
          </div>

          <div className="">
            <h1 className="text-lg font-semibold">Tasks Summary</h1>
            <h1 className="font-semibold">
              <span className="text-slate-600 font-medium">Last</span> 30 days
            </h1>
            <div className="border bg-white rounded-md w-fit h-fit mb-0">
              {" "}
              <Chart
                chartType="PieChart"
                width="100%"
                height="200px"
                data={resultData}
                options={options}
                className=""
              />
            </div>
          </div>
        </div>
        <div className="p-5">
          <Table columns={columns} dataSource={data} size="middle" />
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Create Task</h1>
        <form
          className="flex flex-col px-8 pb-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 rounded-lg p-2 mb-1"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
          <input
            type="description"
            placeholder="Description"
            className="border border-gray-300 rounded-lg p-2 mb-1 mt-5"
            {...register("description", { required: true })}
          />{" "}
          {errors.description && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
          <select
            id="small"
            className="block w-full p-2 text-sm border border-zinc-300 rounded-lg bg-gray-50 text-slate-800 mt-5"
            {...register("priority", {
              required: "select one option",
            })}
          >
            <option selected>Choose priority</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="High">High</option>
          </select>
          {errors.priority && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
          <input
            type="date"
            {...register("starteddate", { required: true })}
            className="border border-gray-300 rounded-lg p-2 mb-1 mt-5"
          />
          {errors.starteddate && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
          <button className="bg-pink-600 text-white rounded-lg p-2 mt-5">
            CREATE TASK
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
