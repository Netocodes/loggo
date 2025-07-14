import HeroBg from "../assets/background.jpg"
import ForgotForm from "./components/forgot"
const ForgotPassword = () => {
  return (
    <div>
      <div>
       <div className="relative h-[80dvh] bg-gray-900 py-6 bg-fixed"
        style={{backgroundImage: `url(${HeroBg})`, backgroundSize: 'cover', backgroundRepeat:"no-repeat", backgroundPosition: 'center',}}>
 <div className="absolute inset-0 bg-black/50"></div>
<ForgotForm />
    </div>
    </div>
    </div>
  )
}

export default ForgotPassword
