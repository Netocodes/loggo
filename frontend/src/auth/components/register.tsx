import { MdOutlineNoteAlt } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { toast } from "react-hot-toast";

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  verify_password: string;
};
const secret = import.meta.env.VITE_REGISTER_URL;

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.password !== data.verify_password) {
       toast.error("Password does not match");
       return;
    }

    const requestedData = {
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      password: data.password,
      mobile_number: data.mobile,
    };
    const stringify = JSON.stringify({ requestedData: requestedData });

    const sendData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(secret, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: stringify,
        });

           if (res.status === 429) {
      // Handle rate limit
      const retryAfter = res.headers.get('Retry-After') || 15;
      toast.error(`Rate limited! Try again in ${retryAfter} minutes`);
      return;
    }

        if(!res.ok){
          const Errordata = await res.json();
           toast.error(Errordata.error)
          setIsLoading(false)
          return;
        }

        const data = await res.json();
        toast.success(data.message)
        await new Promise(resolve => setTimeout(resolve, 3000))
       window.location.href = '/login';
 

      } catch (error) {
        console.log(error);
        toast.error("error verifying data")
      }
      setIsLoading(false)
    };
    sendData();
    // alert(errors)
  };

  return (
    <div className=" flex items-center justify-center pb-12">
      <div className=" mt-7 w-full px-4 md:max-w-8/11 lg:max-w-5/11 backdrop-blur-md border border-blue-200 rounded-xl shadow-2xs dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-200 dark:text-white">
              Register here <MdOutlineNoteAlt />
            </h1>
          </div>

          <div className="mt-5">
            {/* <!-- Form --> */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-y-4">
                {/* <!-- Form Group --> */}
                <label
                  htmlFor="firstname"
                  className="flex flex-col gap-y-3 my-1 text-md text-gray-200"
                >
                  First Name :{" "}
                  <input
                    type="text"
                    {...register("firstname", { required: true, minLength: 2 })}
                    className="py-3 px-3 outline outline-gray-200 rounded-lg placeholder:text-gray-400 font-semibold text-gray-200"
                    placeholder="Enter Your FirstName"
                  />
                  {errors.firstname && (
                    <div className="text-red-500">
                      Don't you have a first Name!!!
                    </div>
                  )}
                </label>

                {/* <!-- End Form Group --> */}

                {/* <!-- Form Group --> */}
                <label
                  htmlFor="lastName"
                  className="flex flex-col gap-y-3 my-1 text-md text-gray-200"
                >
                  Last Name :{" "}
                  <input
                    type="text"
                    {...register("lastname", { required: true, minLength: 2 })}
                    className="py-3 px-3 outline outline-gray-200 rounded-lg placeholder:text-gray-400 font-semibold text-gray-200"
                    placeholder="Enter Your Last Name"
                  />
                  {errors.lastname && (
                    <div className="text-red-500">
                      Input your last name please 🙏
                    </div>
                  )}
                </label>

                {/* <!-- End Form Group --> */}

                {/* <!-- Form Group --> */}
                <label
                  htmlFor="Email"
                  className="flex flex-col gap-y-3 my-1 text-md text-gray-200"
                >
                  Email :{" "}
                  <input
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    className="py-3 px-3 outline outline-gray-200 rounded-lg placeholder:text-gray-400 font-semibold text-gray-200"
                    placeholder="Enter Your Working Email"
                  />
                  {errors.email && (
                    <div className="text-red-500">
                      Make sure to use a valid Email forgot password depends on
                      it
                    </div>
                  )}
                </label>

                {/* <!-- End Form Group --> */}

                {/* <!-- Form Group --> */}
                <label
                  htmlFor="mobile"
                  className="flex flex-col gap-y-3 my-1 text-md text-gray-200"
                >
                  Mobile Number :{" "}
                  <input
                    type="text"
                    {...register("mobile", { required: true, maxLength: 15 })}
                    className="py-3 px-3 outline outline-gray-200 rounded-lg placeholder:text-gray-400 font-semibold text-gray-200"
                    placeholder="Enter Your Mobile Number"
                  />
                  {errors.mobile && (
                    <div className="text-red-500">
                      This is your where you put your phone Number dipshit🤬
                    </div>
                  )}
                </label>

                {/* <!-- End Form Group --> */}
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
                      Keep it clean and simple, more than 6 words and less than
                      20words or get out{" "}
                    </div>
                  )}
                </label>
                {/* <!-- End Form Group --> */}
                {/* <!-- Form Group --> */}
                <label
                  htmlFor="verify_password"
                  className="relative flex flex-col gap-y-3 my-1 text-md text-gray-200"
                >
                  Verify Password :{" "}
                  <input
                    type={showVerifyPassword ? "text" : "password"}
                    {...register("verify_password", {
                      required: true,
                      minLength: 6,
                    })}
                    aria-invalid={errors.verify_password ? "true" : "false"}
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
                  {errors.verify_password && (
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
                  {isLoading ? "Creating User" : 'Sign Up'}
                </button>
              </div>
            </form>
            {/* <!-- End Form --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
