import { useState } from "react";
import { createContext } from "react";
import { auth } from "../components/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { useContext } from "react";

const AuthContext = createContext()


const Authprovider = ({children})=>{
    const [currentUser ,setCurrentUser]=useState()
    const [loading,setLoadin]=useState()

    const signup = (email,password)=>{
        return   createUserWithEmailAndPassword(auth,email,password)
    }

    // useEffect(()=>{
    //     const unsubcribe =  onAuthStateChanged(auth,(user)=>{
    //           setCurrentUser(user)
    //           setLoading(false)
    //       })
    //       return()=>{
    //           unsubcribe()
    //       }
    //   },[])
return(
    <AuthContext.Provider value={{currentUser,signup}} >
            {!loading && children}

    </AuthContext.Provider>
)
}

export default Authprovider

export const useAuth=()=>{
    return useContext(AuthContext)

}