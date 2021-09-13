import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="show col-lg-6 px-lg-4">
            <div className="card">
              <div className="card-header px-lg-5">
                <div className="card-heading text-primary">Eagle Password Reset</div>
              </div>
              <div className="card-body p-lg-5">
                <form  onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <label >Email address</label>
                    <input className="form-control" ref={emailRef} type="email" placeholder="name@example.com"  required />
                  </div>
                  <button className="btn btn-primary" type="submit">Reset Password</button>
                </form>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-center pb-1" style={{gap: "1rem"}}>
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
    </>
  )
}
