import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import eagleGif from '../images/eaglegif.gif'
import Spinner from './Spinner'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, toast } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Invalid credentials, Please try again...")
    }

    setLoading(false)
  }

  return (
    <>
     <div className="show col-lg-6 px-lg-4">
            <div className="card">
              <div className="card-header px-lg-5">
                <div className="card-heading text-primary">Eagle Login</div>
              </div>
              <div className="card-body p-lg-5">
                <h3 className="mb-4">Hi, welcome back eagle!<img src={eagleGif} style={{ maxHeight: "40px",maxWidth: "40px"}}/></h3>
                {error && (<div class="alert alert-danger" role="alert">
                  {error}
                </div>)}
                <form  onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <label >Email address</label>
                    <input className="form-control" ref={emailRef} type="email" placeholder="name@example.com"  required />
                  </div>
                  <div className="form-floating mb-3">
                    <label >Password</label>
                    <input className="form-control" ref={passwordRef} type="password" placeholder="Password" required />
                  </div>
                  <div className="text-sm text-muted"><Link to="/forgot-password">Forgot Password?</Link></div><br/>
                  { loading ? <Spinner /> : <button className="btn btn-primary" type="submit">Submit</button>}
                </form>
              </div>
              <div className="card-footer px-lg-5 py-lg-4">
                <div className="text-sm text-muted">Don't have an account? <Link to="/signup">Sign Up</Link>.</div>
              </div>
            </div>
          </div>
    </>
  )
}
