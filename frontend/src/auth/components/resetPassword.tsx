import { useForm, SubmitHandler } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";

type submit = {
  password: string;
  verifyPassword: string;
};
const secretUrl = import.meta.env.VITE_RESET_PASSWORD_URL
const ResetPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<submit>();
     const params = new URLSearchParams(window.location.search);
     const tokens = params.get('token')
     

  const onSubmit: SubmitHandler<submit> = async (data) => {
    if (!data) {
      return toast.error("Could not get any data");
    }
    const { password, verifyPassword } = data;
    if (password !== verifyPassword) {
      return toast.error("Passwords do not match");
    }
    setIsLoading(true)
    try {
      const requestedData = {
        token: tokens,
        newPassword: password
      }
      const stringed = JSON.stringify({requestedData: requestedData})
      const res = await fetch(secretUrl, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: stringed
      })
  
           if (res.status === 429) {
      // Handle rate limit
      const retryAfter = res.headers.get('retry-after') || 15;
      toast.error(`Too many Requests, Try again in ${retryAfter} minutes`);
      return;
    }

      if(!res.ok){
        const errorData = await res.json()
        toast.error(errorData.error)
        return;
      }

     
      const goodData = await res.json()
      toast.success(goodData.message)
      await new Promise(resolve => setTimeout(resolve, 3000))
      

    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoading(false)
    }
  };
  return (
    <div className=" flex items-center justify-center pb-12">
      <div className=" mt-7 w-full px-4 md:max-w-5/11 backdrop-blur-md border border-blue-200 rounded-xl shadow-2xs  dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-200 dark:text-white">
              Change password
            </h1>
            <div className="mt-5">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4 text-left">
                  {/* <!-- Form Group --> */}
                  <label
                    htmlFor="password"
                    className="relative flex flex-col gap-y-3 my-1 text-md text-gray-200"
                  >
                    Password :{" "}
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 30,
                      })}
                      className=" py-3 px-3 outline outline-gray-200 rounded-lg placeholder:text-gray-400 font-semibold text-gray-200"
                      placeholder="Enter Your Password"
                      autoComplete="password"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                      }}
                      className="absolute top-13 cursor-pointer right-4"
                    >
                      {showPassword ? (
                        <FaRegEye size={20} />
                      ) : (
                        <FaRegEyeSlash size={20} />
                      )}
                    </button>
                    {errors.password && (
                      <div className="text-red-500">
                        Keep it clean and simple, more than 6 words and less
                        than 20words or get out{" "}
                      </div>
                    )}
                  </label>
                  {/* <!-- End Form Group --> */}
                  {/* <!-- Form Group --> */}
                  <label
                    htmlFor="verifyPassword"
                    className="relative flex flex-col gap-y-3 my-1 text-md text-gray-200"
                  >
                    Verify Password :{" "}
                    <input
                      type={showVerifyPassword ? "text" : "password"}
                      {...register("verifyPassword", {
                        required: true,
                        minLength: 6,
                      })}
                      aria-invalid={errors.verifyPassword ? "true" : "false"}
                      className="py-3 px-3 outline outline-gray-200 rounded-lg placeholder:text-gray-400 font-semibold text-gray-200"
                      placeholder="Re Enter your Password"
                      autoComplete=""
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowVerifyPassword(!showVerifyPassword);
                      }}
                      className="absolute top-13 cursor-pointer right-4"
                    >
                      {showVerifyPassword ? (
                        <FaRegEye size={20} />
                      ) : (
                        <FaRegEyeSlash size={20} />
                      )}
                    </button>
                    {errors.verifyPassword && (
                      <div className="text-red-500">
                        Keep it the same with your password{" "}
                      </div>
                    )}
                  </label>

                  {/* <!-- End Form Group --> */}

                  <button
                    type="submit"
                    className="w-full my-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    disabled={isLoading}
                  >
                    
                    {isLoading ? "Changing..." : "Change password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
