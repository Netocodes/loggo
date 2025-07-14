const LogoutUser = (req, res) => {

    res.clearCookie('Auth-token')
    res.status(200).json({message: 'User Logged out'})
}

export {
    LogoutUser
}