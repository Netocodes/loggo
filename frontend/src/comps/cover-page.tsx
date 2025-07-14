import secureBg from "../assets/securepageBg.jpg"
const CoverPage = () => {
  return (
    <div>
      <div className="relative w-full bg-gray-900  flex flex-col mx-auto min-h-[80dvh]"
      style={{
          backgroundImage: `url(${secureBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-gray-800/20"></div>
  

  {/* <!-- ========== MAIN CONTENT ========== --> */}
  <main id="content">
    <div className="max-w-3xl mx-auto text-center  py-32 md:py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="block text-2xl font-bold text-white sm:text-4xl">Welcome to Secure page 🥳🥳</h1>

      <p className="mt-3 text-lg text-gray-200">Here we can keep things we only want our possible clients to see</p>
      <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
        <a className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-gray-200 hover:bg-green-800 focus:outline-hidden focus:bg-green-400 disabled:opacity-50 disabled:pointer-events-none" target="parent" href="#">
         ⭐ Star on Github
        </a>
      </div>
    </div>
  </main>
  {/* <!-- ========== END MAIN CONTENT ========== --> */}

  {/* <!-- ========== FOOTER ========== --> */}
  <footer className="mt-auto text-center py-5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-sm text-white/70">Cover template for <a className="text-white decoration-2 underline underline-offset-2 font-medium hover:text-gray-200 hover:decoration-white/70 focus:outline-hidden focus:text-gray-200 focus:decoration-white/70" href="https://www.netocodes.pro">Netocodes</a></p>
    </div>
  </footer>
  {/* <!-- ========== END FOOTER ========== --> */}
</div>
    </div>
  )
}

export default CoverPage
