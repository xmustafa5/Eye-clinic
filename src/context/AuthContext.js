import { createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword, signOut } from "firebase/auth";
import {  createContext, useContext, useEffect, useState } from "react";
import { auth } from "../components/firebase";

const AuthContext = createContext()
const AuthProvider = ({ children }) => { 
       const [ currentUser , setCurrentUser]= useState()
       const [ loading , setLoading]= useState(true)
       const logout = () =>{
      return  signOut(auth)
       }
       const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
        const signup = (email,password) =>{
             return   createUserWithEmailAndPassword(auth,email,password)
        }
        useEffect(()=>{
          const unsubcribe =  onAuthStateChanged(auth,(user)=>{
                setCurrentUser(user)
                setLoading(false)
            })
            return()=>{
                unsubcribe()
            }
        },[])
  return (
    <AuthContext.Provider value={{currentUser, signup, logout, login}}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider


export const useAuth =() =>{
    return useContext(AuthContext)
}