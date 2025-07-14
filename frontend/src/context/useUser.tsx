import { useContext } from "react";
import { userContext } from "./createUserContext";

const useUserContext = () => {
const context = useContext( userContext)
if(!context){
    throw new Error('could not get user context')
}
// console.log(context)
return context
}

export default useUserContext