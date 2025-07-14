    import { useState, useRef, useEffect } from 'react';
    import UserImage from '../assets/useravater.png'
    import useUserContext from '../context/useUser'
    import HeroBg from '../assets/userProfile.jpg';

const UserPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {user, logout} = useUserContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

 
  

  return (
    <div ref={dropdownRef} className=" flex items-center justify-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      {/* User avatar button */}
      <button 
        type="button" 
        className="size-8 md:size-11 flex cursor-pointer text-sm rounded-full md:me-0 focus:ring-2  focus:ring-gray-300 dark:focus:ring-gray-200" 
        id="user-menu-button" 
        aria-expanded={isOpen}
        onClick={(e) =>{
            e.preventDefault();
            setIsOpen(!isOpen)}}
      >
        <span className="sr-only">Open user menu</span>
        <img className="w-full object-cover rounded-full" src={UserImage} alt="user Avatar" />
      </button>

      {/* Dropdown menu - now controlled by React state */}
      {isOpen && (
        <div className="z-50 w-xs  drop-shadow-lg  absolute top-16 p-3  mx-auto right-4 md:right-9 my-4 text-gray-200 list-none bg-gray-700 divide-x divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
          <div className="flex flex-col bg-purple-800 drop-shadow-lg  rounded-lg items-center justify-center px-8 py-8 dark:bg-gray-800"  style={{
          backgroundImage: `url(${HeroBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}>
        <img className="size-20 md:size-12 rounded-full" src={UserImage} alt="user Avatar" />
<div className='backdrop-blur-sm text-center p-2'>
    
            <span className="block text-sm text-gray-200 dark:text-white">{user?.userName}</span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user?.userEmail}</span>
</div>
          </div>
          <ul className="py-3" aria-labelledby="user-menu-button">
            <li>
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Account Profile</a>
            </li>
            <li className='pb-6'>
              <a href="#" className="block px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Account Settings</a>
            </li>
             <hr />
            <li onClick={() => logout()}>
              <p className="block px-4 py-2 text-sm text-center bg-red-500 font-bold text-gray-200 hover:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</p>
            </li>
          </ul>
        </div>
      )}

    </div>
  );
}

export default UserPage
