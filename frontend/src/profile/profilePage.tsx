import useUserContext from "../context/useUser";
const ProfilePage = () => {
    const {user} = useUserContext();
    if(!user){
        document.location.href = '/login'
        return
    }
  return (
    <div className="text-center py-12">
      Welcome to the Profile page
    </div>
  )
}

export default ProfilePage
