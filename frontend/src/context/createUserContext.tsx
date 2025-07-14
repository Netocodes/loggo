import {createContext} from 'react'

export type userType = {
userId: number
userName: string
userFirstName: string
userEmail: string
userMobileNumber: string

}
// fix the usertype to the new planned structure
export type contextType = {
    user: userType | null
    logout: () => void
}

const userContext = createContext<contextType | undefined>(undefined)
export {userContext}