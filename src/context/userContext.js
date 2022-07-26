// import React,{useContext,useEffect,useReducer} from 'react'

// import {
//      USER_SIGNIN_REQUEST,
//     USER_SIGNIN_SUCCESS,
//     USER_SIGNIN_FAIL,
// USER_SIGNOUT
//   } from '../actions'

// const initialState = {
//     username: "",
//     email:"",
//     password:""
// }

// const UserContext = React.createContext()
// export function UserProvider({children}) {
//     const [state,dispatch] = useReducer(reducer,initialState)
//     useEffect(()=>{
//         handleChange()
//     },[])
//     const handleChange = ()=>{

//     }
//   return (
//     <UserContext.Provider value={{...state,handleChange}}>
//         {children}
//     </UserContext.Provider>
//   )
// }

// export const useUserContext=()=>{
//     return useContext(UserContext)
// }