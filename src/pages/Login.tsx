import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, useDispatch } from "../redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(login(data)).then((res) => {
      if (res.type === "user/login/fulfilled") {
        message.success("Login successful");
        navigate("/dashboard");
      }
    });
  };
  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-full max-w-md h-fit bg-white shadow-lg rounded-lg">
          <div className="flex justify-center items-center h-16 text-2xl font-bold">
            SIGN IN
          </div>
          <form
            className="flex flex-col px-8 pb-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-2 mb-1"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-lg p-2 mb-1 mt-5"
              {...register("password", { required: true })}
            />{" "}
            {errors.password && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
            <button className="bg-pink-600 text-white rounded-lg p-2 mt-5">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
