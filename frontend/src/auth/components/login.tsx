import { MdOutlineNoteAlt } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

type loginType = {
  email: string;
  password: string;
};
const secret = import.meta.env.VITE_LOGIN_URL;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const navigate = useNavigate();
  // const captureLoad = () => {
  //   setIsLoading(!isLoading)
  // }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>();
  const onsubmit: SubmitHandler<loginType> = async (data) => {
    setIsLoading(true);
    try {
      const requestedData = {
        email: data.email,
        password: data.password,
      };
      const stringify = JSON.stringify({ requestedData: requestedData });
      const LoginUser = async () => {
        setIsLoading(true);
        const resp = await fetch(secret, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: stringify,
        });

        if (resp.status === 429) {
          // Handle rate limit
          const retryAfter = resp.headers.get("Retry-After") || 15;
          toast.error(`Rate limited! Try again in ${retryAfter} minutes`);
          setIsLoading(false);
          return;
        }

        if (!resp.ok) {
          const errorRes = await resp.json();
          toast.error(errorRes.error);
          setIsLoading(false);
          return;
        }
        const Data = await resp.json();
        console.log(Data);
        toast.success(Data.message);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        // navigate('/secure-page')
        window.location.href = "/secure-page";
      };
      LoginUser();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative">
      <div className="w-full flex  ">
        <div className="mx-auto w-full px-4 lg:max-w-5/11 backdrop-blur-md border border-blue-200 rounded-xl shadow-2xs dark:border-neutral-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="flex items-center justify-center gap-2 text-2xl font-bold text-md text-gray-900 dark:text-white">
                Log in <MdOutlineNoteAlt />
              </h1>

              <div className="mt-5">
                <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
                  <div className="grid gap-y-4">
                    <label htmlFor="email">
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full py-3 px-3 outline outline-gray-200 rounded-lg placeholder:text-gray-800 font-semibold text-md text-gray-900"
                        placeholder="Enter your email "
                        autoComplete="Email"
                      />
                      {errors.email && (
                        <div className="text-red-500 text-left mt-2">
                          Check This Email Shitbag
                        </div>
                      )}
                    </label>
                    <label htmlFor="password" className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: true,
                          minLength: 6,
                          maxLength: 30,
                        })}
                        className="w-full py-3 px-3 outline outline-gray-200 rounded-lg placeholder:text-gray-800 font-semibold text-md text-gray-900"
                        placeholder="Please enter your password"
                        autoComplete="Password"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                        className="absolute top-4 cursor-pointer right-4 text-white"
                      >
                        {showPassword ? (
                          <FaRegEye size={20} />
                        ) : (
                          <FaRegEyeSlash size={20} />
                        )}
                      </button>

                      {errors.password && (
                        <div className="text-red-500 text-left mt-2">
                          Put Your correct password here
                        </div>
                      )}
                    </label>

                    <a
                      className="underline flex items-center justify-end text-white "
                      href="/forgot_password"
                    >
                      {" "}
                      Forgot Password
                    </a>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full my-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isLoading ? "logging in ..." : "Log In"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
