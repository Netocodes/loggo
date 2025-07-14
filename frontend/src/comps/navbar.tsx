import { ImShield } from "react-icons/im";
import { useState } from "react";
import { GrClose, GrNavigate } from "react-icons/gr";
import useUserContext from "../context/useUser";
import UserPage from "./userPage";


const Navbar = () => {
const [isOpen, setOpen] = useState<boolean>(false)
const {user} = useUserContext(); 



const handleNav = () => {
  setOpen(!isOpen)
}


  return (
    <div className="bg-black">
      <nav className=" z-50 backdrop-blur-sm bg-black/75  shadow-md fixed top-0 w-full border-b border-gray-500 dark:border-gray-700 transition-all duration-300 ease-in-out">
  <div className="w-full md:max-w-6xl mx-auto px-4">
    <div className="flex items-center justify-between">

      <div className="flex space-x-4">
        {/* <!-- logo --> */}
        <div>
          <a href="/" className="flex items-center gap-x-2 py-5 px-2 text-gray-700 hover:text-gray-900">
           <ImShield className="size-8 text-green-400" />
            <span className="font-bold text-2xl text-gray-100">Loggo</span>
          </a>
        </div>

        {/* <!-- primary nav --> */}
        <div className="hidden md:flex items-center space-x-1">
          <a href="#" className="py-5 px-3 text-gray-400 hover:text-gray-300 ">Features</a>
          <a href="#" className="py-5 px-3 text-gray-400 hover:text-gray-300 ">Contact</a>
        </div>
      </div>
<div className="flex items-center justify-between md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

      {/* <!-- secondary nav --> */}
      {!user ? 
      <div className="hidden md:flex items-center space-x-1">
        <a href="/login" className="py-3 px-3 text-gray-200 hover:outline-2 hover:outline-green-500">Login</a>
        <a href="/register" className="py-2 px-3 bg-green-500 hover:bg-green-400 text-blue-900 hover:text-yellow-800 rounded transition duration-300">Signup</a>
      </div> 
       : 
      <div className="flex items-center  px-2 gap-x-2">
        <div className="hidden py-2 px-2 pl-4 text-sm rounded-l-full border-y-2 border-green-300 md:flex items-center text-gray-200 dark:text-gray-300">
         Hi, {user?.userFirstName}
        </div>
       <UserPage />
     
      </div>
       } 
      

      {/* <!-- mobile button goes here --> */}
      <div className="md:hidden flex items-center">
  <button onClick={() => handleNav()} className="cursor-pointer flex items-center justify-center rounded-full p-2 text-gray-200 hover:bg-gray-200 dark:hover:bg-cyan-300 dark:hover:text-gray-800 transition duration-300 ease-in-out">
    {isOpen ? < GrClose className="size-8" /> : <GrNavigate className="size-9 font-bold" />}
  </button>
</div>
</div>

    </div>
  </div>

  {/* <!-- mobile menu --> */}
{isOpen ?  <div className="shadow-lg">
  <div className="py-4 md:hidden flex  items-center text-center px-3 rounded-lg flex-col gap-y-3">
    <a href="#" className="block w-full py-2 px-4 bg-gray-300 text-sm hover:bg-gray-200">Features</a>
    <a href="#" className="block w-full py-2 px-4 bg-gray-300 text-sm hover:bg-gray-200">Pricing</a>
  </div>
  {!user ? <div className="flex items-center justify-center space-x-1 py-3">
       <a href="/login" className="py-3 px-3 hover:outline-2 hover:outline-green-500">Login</a>
        <a href="/register" className="py-2 px-3 bg-green-500 hover:bg-green-400 text-blue-900 hover:text-yellow-800 rounded transition duration-300">Signup</a>
      </div> : <div className="flex items-center justify-center gap-x-8">
       {/* <UserPage />
      <button onClick={() => logout()} className="border border-gray-700 px-3 py-2 hover:bg-red-500 hover:text-white">log Out</button> */}
      </div>}
   
</div> : ""}
</nav>


    </div>
  )
}

export default Navbar
