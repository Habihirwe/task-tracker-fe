import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../redux";
import {
  createSubTask,
  fetckTask,
  selectTask,
  updateSubTask,
} from "../redux/slices/task";
import Sidebar from "./Sidebar";
import { intDateFormat } from "../pages/Dashboard";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal, message } from "antd";
import { FaPlusCircle } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";

type Inputs = {
  title: string;
  description: string;
};

type Inputs2 = {
  status: string;
};

const SubTasks: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTask);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [subTaskId, setSubTaskId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<Inputs2>();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
  const handleUpdateOk = () => {
    setIsUpdateModalOpen(false);
  };
  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
  };

  const url = window.location.href;
  const splitUrl = url.split("/");

  const activeId = splitUrl[splitUrl.length - 1];

  const subTasks = tasks?.value?.data?.data?.subtasks;

  const inQueue = subTasks?.filter((task: any) => {
    return task.status === "Queuing";
  });
  const inProgress = subTasks?.filter((task: any) => {
    return task.status === "Started";
  });
  const completed = subTasks?.filter((task: any) => {
    return task.status === "Completed";
  });

  const date = tasks?.value?.data?.data?.dateCreated
    ? new Date(tasks?.value?.data?.data?.dateCreated)
    : new Date(Date.now());

  const nextDay = date.setDate(date.getDate() + 1);

  useEffect(() => {
    dispatch(fetckTask(activeId));
  }, [dispatch]);

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    const values = {
      id: activeId,
      data,
    };
    dispatch(createSubTask(values))
      .then((res) => {
        if (res.type === "task/sub/create/fulfilled") {
          message.success("Sub Task created successfully");
          setIsModalOpen(false);
        }
      })
      .then(() => {
        dispatch(fetckTask(activeId));
      });
  };

  const onUpdate = (data: any) => {
    const values = {
      id: subTaskId,
      data,
    };
    dispatch(updateSubTask(values))
      .then((res) => {
        if (res.type === "task/sub/update/fulfilled") {
          message.success("Sub Task updated successfully");
          setIsUpdateModalOpen(false);
        }
      })
      .then(() => {
        dispatch(fetckTask(activeId));
      });
  };

  return (
    <div className="pl-56">
      <Sidebar />
      <div className="p-5">
        {" "}
        <h1 className="text-xl text-slate-600 font-semibold mb-4">
          {tasks?.value?.data?.data?.title}
        </h1>
        <div className="w-full flex justify-between items-start py-4 gap-3">
          <div className="w-fit min-w-[233px] flex flex-col bg-slate-50 justify-between items-start shadow-md p-4 rounded-sm">
            <h1 className="flex items-center">
              <span className="text-base font-semibold mr-2">Date added: </span>
              {intDateFormat.format(date)}
            </h1>
            <h1 className="flex items-center">
              <span className="text-base font-semibold mr-2">Deadline: </span>
              {intDateFormat.format(new Date(nextDay))}
            </h1>
            <h1 className="flex items-center">
              <span className="text-base font-semibold mr-2">Priority: </span>
              {tasks?.value?.data?.data?.priority}
            </h1>
            <h1 className="flex items-center">
              <span className="text-base font-semibold mr-2">Status: </span>
              {tasks?.value?.data?.data?.status}
            </h1>
          </div>
          <div className="w-full flex flex-col bg-slate-50 justify-between items-start shadow-md p-4 rounded-sm h-[100%]">
            {tasks?.value?.data?.data?.description}
          </div>
          <div className="w-fit  min-w-[134px] flex flex-col bg-slate-50 justify-between items-start shadow-md p-4 rounded-sm">
            <h1 className="flex items-center">
              <span className="text-base font-semibold mr-2">
                All subtasks:{" "}
              </span>
              {subTasks ? subTasks?.length : 0}
            </h1>
            <h1 className="flex items-center">
              <span className="text-base font-semibold mr-2">Queue: </span>
              {inQueue ? inQueue?.length : 0}
            </h1>
            <h1 className="flex items-center">
              <span className="text-base font-semibold mr-2">
                In Progress:{" "}
              </span>
              {inProgress ? inProgress?.length : 0}
            </h1>
            <h1 className="flex items-center">
              <span className="text-base font-semibold mr-2">Completed: </span>
              {completed ? completed?.length : 0}
            </h1>
          </div>
        </div>
        <div className="flex items-start gap-2 justify-start">
          <div className="bg-zinc-200 shadow-lg rounded-md w-72 p-4 min-h-24">
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-slate-600 font-semibold mb-4">
                Queue
              </h1>
              <FaPlusCircle className="text-slate-600" onClick={showModal} />
            </div>
            <div className="flex flex-col items-center gap-2">
              {inQueue?.map((task: any) => {
                return (
                  <div className="w-full h-60 bg-fuchsia-100 shadow-lg p-2 rounded-md border">
                    <div className="flex items-center justify-between">
                      <h1 className="my-2 text-slate-600 text-base font-semibold">
                        {task.title}
                      </h1>{" "}
                      <BiDotsVerticalRounded
                        className="text-slate-600 text-lg"
                        onClick={() => {
                          setSubTaskId(task?._id);
                          showUpdateModal();
                        }}
                      />
                    </div>
                    <p>{task.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-zinc-200 shadow-lg rounded-md w-72 p-4 min-h-24">
            {" "}
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-slate-600 font-semibold mb-4">
                In Progress
              </h1>
            </div>
            <div className="flex flex-col items-center gap-2">
              {inProgress?.map((task: any) => {
                return (
                  <div className="w-full h-60 bg-fuchsia-100 shadow-lg p-2 rounded-md border">
                    <div className="flex items-center justify-between">
                      <h1 className="my-2 text-slate-600 text-base font-semibold">
                        {task.title}
                      </h1>{" "}
                      <BiDotsVerticalRounded
                        className="text-slate-600 text-lg"
                        onClick={() => {
                          setSubTaskId(task?._id);
                          showUpdateModal();
                        }}
                      />
                    </div>
                    <p>{task.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-zinc-200 shadow-lg rounded-md w-72 p-4 min-h-24">
            {" "}
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-slate-600 font-semibold mb-4">
                Completed
              </h1>
            </div>
            <div className="flex flex-col items-center gap-2">
              {completed?.map((task: any) => {
                return (
                  <div className="w-full h-60 bg-fuchsia-100 shadow-lg p-2 rounded-md border">
                    <h1 className="flex items-center gap-2">{task.priority}</h1>
                    <h1 className="my-2 text-slate-600 text-base font-semibold">
                      {task.title}
                    </h1>
                    <p>{task.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Create Sub Task</h1>
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
          <button className="bg-pink-600 text-white rounded-lg p-2 mt-5">
            CREATE SUB-TASK
          </button>
        </form>
      </Modal>
      <Modal
        open={isUpdateModalOpen}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
        footer={null}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Update Sub Task</h1>
        <form
          className="flex flex-col px-8 pb-8"
          onSubmit={handleSubmit2(onUpdate)}
        >
          <select
            id="small"
            className="block w-full p-2 text-sm border border-zinc-300 rounded-lg bg-gray-50 text-slate-800 mt-5"
            {...register2("status", {
              required: "select one option",
            })}
          >
            <option selected>Choose status</option>
            <option value="Started">Started</option>
            <option value="Queuing">Queuing</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </select>
          {errors2.status && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
          <button className="bg-pink-600 text-white rounded-lg p-2 mt-5">
            UPDATE SUB-TASK
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SubTasks;
