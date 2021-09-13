import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Spinner from './Spinner'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const nameRef = useRef()
  const positionRef = useRef()
  const contactRef = useRef()
  const adminRef = useRef()
  const guestRef = useRef()
  const [role,setRole] = useState('')
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()


  function handleAdminRole() {
    adminRef.current.click()
    setRole('A')
  }

  function handleGuestRole() {
    guestRef.current.click()
    setRole('G')
  }

   async function handleSubmit(e) {
    e.preventDefault()

    if (role != 'A' && role != 'G') {
      return setError("Role is mandatory for Signup")
    }
     
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value,nameRef.current.value,positionRef.current.value,role,contactRef.current.value)
      history.push("/")
    } catch {
      setError("SignUp Failed, Please try again...")
    }

    setLoading(false)
  }

  return (
    <>
           <div className="show col-lg-6 px-lg-4">
            <div className="card">
              <div className="card-header px-lg-5">
                <div className="card-heading text-primary">Eagle Register</div>
              </div>
              <div className="card-body p-lg-5">
                <h3 className="mb-4">Get started with Eagle</h3>
                <div className="btn-group mb-2" role="group" aria-label="Basic radio toggle button group" style={{}}>
                    <input type="radio" ref={adminRef} className="btn-check" name="btnradio" id="btnradio1"/>
                    <label className="btn btn-outline-primary btnradio1" onClick={handleAdminRole} > Admin</label>

                    <input type="radio" ref={guestRef} className="btn-check" name="btnradio" id="btnradio2" />
                    <label className="btn btn-outline-primary btnradio2" onClick={handleGuestRole}>Guest</label>
                </div>
                {error && (<div className="alert alert-danger" role="alert">
                  {error}
                </div>)}
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <label >Email address</label>
                    <input className="form-control" ref={emailRef} type="email" placeholder="name@example.com" required />
                  </div>
                  <div className="form-floating mb-3">
                    <label >Password</label>
                    <input className="form-control" ref={passwordRef} type="password" placeholder="Password" required />
                  </div>
                  <div className="form-floating mb-3">
                    <label >Password Confirmation</label>
                    <input className="form-control" ref={passwordConfirmRef} type="password" placeholder="Password" required />
                  </div>
                  <div className="form-floating mb-3">
                    <label >Name</label>
                    <input className="form-control" ref={nameRef}  type="text" placeholder="eagle" required />
                  </div>
                  <div className="form-floating mb-3">
                    <label >Position</label>
                    <input className="form-control" ref={positionRef} type="text" placeholder="Developer" required />
                  </div>
                  <div className="form-floating mb-3">
                    <label >Contact No</label>
                    <input className="form-control" ref={contactRef} type="number" placeholder="+91" required />
                  </div>
                  <div className="form-group">
                  { loading ? <Spinner /> : <button className="btn btn-primary" type="submit" name="registerSubmit">Register</button>}
                  </div>
                </form>
              </div>
              <div className="card-footer px-lg-5 py-lg-4">
                <div className="text-sm text-muted">Already have an account? <Link to="/login">Log In</Link>.</div>
              </div>
            </div>
          </div>
    </>
  )
}
