import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { Spinner } from "react-bootstrap"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout, userData, loading } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
    <div className="show col-lg-6 px-lg-4 mt-3  ">
            <div className='card'>
              <div className="card-header px-lg-4">
                <div className="card-heading text-primary">Eagle Profile</div>
              </div>
              <div className={`d-flex flex-column align-items-stretch justify-content-stretch watermark p-4 ${userData.role == 'A' ? 'watermarkadmin' : 'watermarkguest'} `} style={{gap: "1rem"}}>
              <strong style={{color: 'blue'}}>Email:</strong> <span>{currentUser.email}</span>
              <strong style={{color: 'blue'}}>Name:</strong> <span>{userData.fullname}</span>
              <strong style={{color: 'blue'}}>Position:</strong> <span>{userData.position}</span>
              <strong style={{color: 'blue'}}>Contact No:</strong> <span>{userData.contact}</span>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center mb-2" style={{gap: "1rem"}} >
              <button className="btn btn-primary" type="button">
              <Link to="/update-profile" style={{textDecoration:'none',color: 'whitesmoke'}}>Edit Profile</Link>
              </button>
              <button className="btn btn-primary" onClick={handleLogout} type="button">
               Log Out
              </button>
              </div>
              </div>
              </div>
    </>
  )
}
