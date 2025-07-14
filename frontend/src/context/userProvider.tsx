import { ReactNode, useCallback, useEffect, useState } from "react";
import { userType } from "./createUserContext";
import { userContext } from "./createUserContext";
import toast from "react-hot-toast";
const verifyUrl = import.meta.env.VITE_VERIFY_URL;

// dummy data
// const data = {
//   id: 501,
//   name: "mmaduOha Martins",
//   email: "mmm@gmail.com",
//   mobile: "09089998877",
// };

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
          setLoading(true);

      const response = await fetch(verifyUrl, { credentials: "include" });
      if (!response.ok) {
         const error = await response.json().catch(() => ({}));
         console.log(error)
      throw new Error(error.error || "Failed to fetch user");
      }
      if (response.status === 429) {
        // Handle rate limit
        const retryAfter = response.headers.get("Retry-After") || 5;
        toast.error(`Rate limited! Try again in ${retryAfter} minutes`);
        return;
      }

      const {message} = await response.json();
      setUser(message);

    } catch (error) {
      console.log(error);
      setUser(null)
    } finally{
      setLoading(false)
    }
  }, []
  )
  
  

  useEffect(() => {
        fetchUser();
  }, [fetchUser])
if (loading) return <div>Loading...</div>;
 

   

  const logout = async() => {
    try {
      const res = await fetch(import.meta.env.VITE_LOGOUT_URL, {credentials: 'include'})
      if(!res.ok){
        throw new Error('Could not log out, try again')
      }
      const rawdata = await res.json()
      await new Promise(resolve => setTimeout(resolve, 3000))
      toast.success(rawdata.message)
      window.location.href = '/login';
      setUser(null)
    } catch (error) {
      console.log(error)
      
    }
  };

  return (
    <userContext.Provider value={{ user, logout }}>
      {children}
    </userContext.Provider>
  );
};
export default UserProvider;
