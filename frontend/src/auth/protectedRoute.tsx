// import toast from "react-hot-toast";
// import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import useUserContext from "../context/useUser";

// Protected Route in react

// we pass in components that n
const ProtectedRoute = ({ kids }: { kids: React.ReactNode }) => {
  const {user } = useUserContext();
    


  if (!user) {
    setTimeout(() => {

    }, 3000)
   console.log('user is null')
  }

  return user ? kids : <Navigate to="/login" />;
};

export default ProtectedRoute;
