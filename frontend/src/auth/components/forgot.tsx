import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
type forgotData = {
  email: string;
};
const key_url = import.meta.env.VITE_FORGOT_PASSWORD_URL;
const ForgotForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotData>();
  const onSubmit: SubmitHandler<forgotData> = (data) => {
    const mail = data.email;
    const stringify = JSON.stringify({ email: mail });
    const SendMail = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(key_url, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: stringify,
        });
        
      if (res.status === 429) {
      // Handle rate limit
      const retryAfter = res.headers.get('Retry-After') || 15;
      toast.error(`Rate limited! Try again in ${retryAfter} minutes`);
       return;
    }

        if (!res.ok) {
          const errorData = await res.json();
          toast.error(errorData.error);
          return;
        }

        const data = await res.json();
        await new Promise(resolve => setTimeout(resolve, 2000))
        toast.success(data.message);
        navigate('/login')
        // find how to bring out the data returned from the backend
      } catch (error) {
        console.log(error);
      } finally{
        setIsLoading(false)
      }
    };
    SendMail();
  };
  return (
    <div>
      <div className=" flex items-center justify-center pb-12">
        <div className=" mt-7 w-full px-4 md:max-w-5/11 backdrop-blur-md border border-blue-200 rounded-xl shadow-2xs  dark:border-neutral-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-200 dark:text-white">
                Forgot password
              </h1>
              <p className="text-gray-800">
                I knew you wouldn't remember Dipshit
              </p>
              <div className="mt-5">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-y-4">
                    <label htmlFor="email">
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full py-3 px-3 outline outline-gray-200 rounded-lg placeholder:text-gray-400 font-semibold text-gray-200"
                        placeholder=" Input your already registed mail"
                        autoComplete="Email"
                      />
                      {errors.email && (
                        <div className="text-red-500 text-left mt-2">
                          Check This Email Shitbag
                        </div>
                      )}
                    </label>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full my-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white  focus:outline-hidden focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                     {isLoading ? "sending mail..." : "Recive Mail 📧"}
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

export default ForgotForm;
