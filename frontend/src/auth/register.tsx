// import Silk from "../blocks/Backgrounds/Silk/Silk"
import HeroBg from "../assets/background.jpg"
import RegisterPage from "./components/register"
const Register = () => {
  return (
    <div className="relative bg-gray-900 py-6 px-2 bg-fixed"
        style={{backgroundImage: `url(${HeroBg})`, backgroundSize: 'cover', backgroundRepeat:"no-repeat", backgroundPosition: 'center',}}>
 <div className="absolute inset-0 bg-black/50"></div>
      {/* <div className="absolute  w-full h-full top-0 left-0 -z-1">
        <Silk />
      </div> */}
      <RegisterPage />
    </div>
  )
}

export default Register
