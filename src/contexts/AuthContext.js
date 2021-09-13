import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [ userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)
  const [role,setRole] = useState('')

  function signup(email, password, name, position,role,phoneno) {
    console.log('Email =' + email + ' Password =' + password)
    db.collection("userDetails").doc(email).set({ fullname: name, position: position,role: role,contact: phoneno})
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    setUserData({})
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function updateDetails(email,name,position) {
    return db.collection("userDetails").doc(email).update({
      "fullname": name,
      "position": position,
      "role": userData && userData.role,
      "contact": userData && userData.contact
  }).then(() => {
    setUserData({fullname: name, position: role})
  })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      if(user)
      {
        db.collection("userDetails").doc(user ? user.email : "").get().then((item) => {
          setUserData(item.data())
          console.log(item.data())
          setLoading(false)
        })
      }
      setLoading(false)
      console.log(user)
    })

    return unsubscribe
  }, [])


  const value = {
    loading,
    userData,
    currentUser,
    login,
    signup,
    logout,
    role,
    resetPassword,
    updateEmail,
    updatePassword,
    updateDetails,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
