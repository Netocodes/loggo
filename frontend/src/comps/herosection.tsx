// import MagnetLines from "../blocks/Animations/MagnetLines/MagnetLines"
// import Silk from "../blocks/Backgrounds/Silk/Silk"
import HeroBg from "../assets/secureBg.jpg";
import HeroImg from "../assets/secure.png"
import { FaLaptopCode } from "react-icons/fa";
import SplitText from "../blocks/TextAnimations/SplitText/SplitText";

const HeroSection = () => {
  return (
    <div className=" flex flex-col-reverse md:flex-row items-center justify-start h-[80dvh] md:h-[45dvh] lg:h-[75dvh] " 
    style={{backgroundImage: `url(${HeroBg})`, backgroundSize: 'cover', backgroundRepeat:"no-repeat", backgroundPosition: 'center'}}>
{/* <div className="absolute w-full h-full">
      <Silk 
      color="#1e8035"
      />
  </div>      */}
   <div className="w-full lg:max-w-5/11 text-center backdrop-blur-sm border-r-2 rounded-lg border-y-2 border-white/25 pl-5 p-5 ">
   <SplitText
  text=" Welcome to Loggo "
  className="text-3xl text-white font-semibold text-center"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
/>
      
        <p className="text-md mt-5 text-center text-gray-300 max-w-2xl ">
          Loggo is a User login and signup demo WebApp, Structured to showcase how effortless, strictly secure and easy to use while being up to date on modern technologies.


        </p>
        <div className="mt-6  flex items-center justify-center gap-x-6">
          <a className="py-2 px-2 outline-2 text-lg flex items-center gap-2 text-white outline-teal-600 hover:outline-hidden  rounded-lg hover:bg-teal-600" href="#">
            Chat Developer <FaLaptopCode />
          </a>
          <a href="/register" className="py-2 px-2 text-lg flex items-center gap-2 text-blue-100 bg-teal-600 hover:bg-teal-700 rounded-lg">Start Auth demo👋</a>
        </div>
      </div>
      <div className="h-48 md:hidden z-20 flex items-center justify-center p-5 lg:p-0">
        <img className="w-full h-full object-cover rounded-lg" src={HeroImg} alt="Secure Lock" />
      </div>
    </div>
  );
};

export default HeroSection;
