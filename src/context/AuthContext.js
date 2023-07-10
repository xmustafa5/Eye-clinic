import { createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword, signOut } from "firebase/auth";
import {  createContext, useContext, useEffect, useState } from "react";
import { auth } from "../components/firebase";
import { authA } from "../components/firebase";

const AuthContext = createContext()
const AuthProvider = ({ children }) => { 
       const [ currentUser , setCurrentUser]= useState()
       const [ loading , setLoading]= useState(true)
       const [isPopupOpen, setIsPopupOpen] = useState(false);
       const [isOverlayVisible, setIsOverlayVisible] = useState(false);
       const logout = () =>{
      return  signOut(auth)
       }
       const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
        const signup = (email,password) =>{
             return   createUserWithEmailAndPassword(auth,email,password)
        }
        const handlePopupToggle = () => {
          setIsPopupOpen(!isPopupOpen);
          setIsOverlayVisible(!isOverlayVisible);
        };
        useEffect(()=>{
          const unsubcribe =  onAuthStateChanged(auth,(user)=>{
                setCurrentUser(user)
                setLoading(false)
            })
            return()=>{
                unsubcribe()
            }
        },[])
        const loginA = (email, password) => {
    return signInWithEmailAndPassword(authA, email, password);
  };
  return (
    <AuthContext.Provider value={{currentUser,handlePopupToggle, isPopupOpen,isOverlayVisible , signup, logout, login,loginA}}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider


export const useAuth =() =>{
    return useContext(AuthContext)
}