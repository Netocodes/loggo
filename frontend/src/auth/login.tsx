import HeroBg from "../assets/quest.jpg";
import LoginForm from "./components/login";
const Login = () => {
  return (
    <div className="relative w-full">
      <div
        className="relative w-full mx-auto h-[80dvh] md:h-[100dvh] bg-fixed px-2"
        style={{
          backgroundImage: `url(${HeroBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-amber-500/5"></div>
        <div className="absolute bottom-0 left-1/2 w-full md:max-w-9/12 -translate-x-1/2 transform md:bottom-1/2 md:translate-y-1/2">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
