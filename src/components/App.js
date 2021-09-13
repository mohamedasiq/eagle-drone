import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import './App.css';
import eagle from '../images/eagle.png'

function App() {
  return (
    <div className="page-holder align-items-center py-4 bg-gray-100 min-vh-100">
      <div className="container">
        <div className="row align-items-center" style={{gap: "4rem"}}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
        <div className="col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center text-primary mt-1" style={{position: 'relative'}}>
            <img className="img-fluid mb-4" width="300" src={eagle} alt="" style={{transform: "rotate(10deg)"}} />
            <h1 className="mb-4">Eagle.com<br className="d-none d-lg-inline" /></h1>
            <p className="lead text-muted">All birds find shelter during a rain.But eagle avoids rain by flying above the clouds.Problems are common,but attitude makes the difference.</p>
          </div>
    </div>
    </div>
    </div>
  )
}

export default App
