import HeroBg from "../assets/background.jpg"
import ResetPage from './components/resetPassword'
const ResetPassowrd = () => {
  return (
      <div className="relative h-[100dvh] bg-gray-900 py-6 bg-fixed"
        style={{backgroundImage: `url(${HeroBg})`, backgroundSize: 'cover', backgroundRepeat:"no-repeat", backgroundPosition: 'center',}}>
 <div className="absolute inset-0 bg-black/50"></div>
      {/* <div className="absolute  w-full h-full top-0 left-0 -z-1">
        <Silk />
      </div> */}
      <ResetPage />
    </div>
  )
}

export default ResetPassowrd
