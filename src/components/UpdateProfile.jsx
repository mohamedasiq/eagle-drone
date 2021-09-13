import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Spinner from './Spinner'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const nameRef = useRef()
  const positionRef = useRef()
  const contactRef = useRef()
  const { currentUser, updatePassword, updateEmail, updateDetails, userData } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    promises.push(updateDetails(emailRef.current.value,nameRef.current.value,positionRef.current.value,contactRef.current.value))

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
    <div className="show col-lg-6 px-lg-4">
            <div className="card">
              <div className="card-header px-lg-5">
                <div className="card-heading text-primary">Eagle Update</div>
              </div>
              <div className="card-body p-lg-5">
                <h3 className="mb-4">Update your Eagle</h3>
                {error && (<div className="alert alert-danger" role="alert">
                  {error}
                </div>)}
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <label >Email address</label>
                    <input className="form-control" ref={emailRef} type="email" placeholder="name@example.com" defaultValue={currentUser.email} required />
                  </div>
                  <div className="form-floating mb-3">
                    <label >Password</label>
                    <input className="form-control" ref={passwordRef} type="password" defaultValue={currentUser.password}  required />
                  </div>
                  <div className="form-floating mb-3">
                    <label >Password Confirmation</label>
                    <input className="form-control" ref={passwordConfirmRef} type="password" defaultValue={currentUser.password}  required />
                  </div>
                  <div className="form-floating mb-3">
                    <label >Name</label>
                    <input className="form-control" ref={nameRef}  type="text" placeholder="eagle" defaultValue={userData.fullname} required />
                  </div>
                  <div className="form-floating mb-3">
                    <label >Role</label>
                    <input className="form-control" ref={positionRef} type="text" placeholder="Flying" defaultValue={userData.position} required />
                  </div>
                  <div className="form-floating mb-3">
                    <label >Contact No</label>
                    <input className="form-control" ref={contactRef} type="number" placeholder="+91" defaultValue={userData.contact} required />
                  </div>
                  <div className="form-group">
                  { loading ? <Spinner /> : <button className="btn btn-primary" type="submit" name="registerSubmit">Update</button>}
                  </div>
                </form>
              </div>
            </div>
          </div>
    </>
  )
}
