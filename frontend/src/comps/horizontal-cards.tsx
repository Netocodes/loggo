import { FaGlobe } from "react-icons/fa"
import { GiTrafficLightsReadyToGo } from "react-icons/gi"
import { MdOutlineNoteAlt } from "react-icons/md"


const HorizontalCards = () => {

  return (
    <div>
 {/* <!-- Icon Blocks --> */}
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 grow items-center gap-6">
    {/* <!-- Card --> */}
    <a className="group flex gap-y-6 shadow-lg size-full hover:bg-gray-700 focus:outline-hidden focus:bg-gray-500 rounded-lg p-5 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="/register">
      <MdOutlineNoteAlt className="shrink-0 size-8 text-green-500  mt-0.5 me-6" />

      <div>
        <div>
          <h3 className="block font-bold text-gray-200">Register as a User 😉</h3>
          <p className="mt-2 text-gray-400">
            Notice how it doesn't Submit the form when there is a typo in the required data
          </p>
        </div>

        <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-green-300">
          Sign In
          <svg className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </p>
      </div>
    </a>
    {/* <!-- End Card --> */}

    {/* <!-- Card --> */}
    <a className="group flex gap-y-6 shadow-lg size-full hover:bg-gray-700 focus:outline-hidden focus:bg-gray-500 rounded-lg p-5 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="/login">
           <GiTrafficLightsReadyToGo  className="shrink-0 size-10 text-green-400 mt-0.5 me-6 dark:text-green-400" />
      <div>
        <div>
          <h3 className="block font-bold text-gray-200">Log in after verified by my Bouncer🚨</h3>
          <p className="mt-2 text-gray-400">Invite your hacker friends to try and access the page without proper check-up, 20k up for grabs😉</p>
        </div>

        <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-green-300">
          Log In
          <svg className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </p>
      </div>
    </a>
    {/* <!-- End Card --> */}

    {/* <!-- Card --> */}
    <a className="group flex gap-y-6 shadow-lg size-full hover:bg-gray-700 focus:outline-hidden focus:bg-gray-500 rounded-lg p-5 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="/secure-page">
         <FaGlobe className="shrink-0 size-8 text-green-500 mt-0.5 me-6 " />

      <div>
        <div>
          <h3 className="block font-bold text-gray-200">Welcome to the Secure Page</h3>
          <p className="mt-2 text-gray-400">Here is the page that cannot be accessed Unauthorized</p>
        </div>
         <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-green-300">
          See Page
          <svg className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </p>
      </div>
    </a>
    {/* <!-- End Card --> */}
  </div>
</div>
{/* <!-- End Icon Blocks --> */}
    </div>
  )
}

export default HorizontalCards
