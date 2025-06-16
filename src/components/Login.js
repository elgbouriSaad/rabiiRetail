
import React, { useState } from "react";
import { auth, db } from '../firebase';

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';



export default function Login() {

  // Login functionalities
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
      const uid = userCredential.user.uid; // Retrieve the UID after logging in


    } catch (error) {
      setError(true);
    }

    navigate('/Model');
  };

  // ------------------------------
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Signup = (e) => {
    e.preventDefault();
    setLoader(true);
    if (!username || !emailSignup || !passwordSignup) {
      return alert("Please enter a username, email, and password");
    }
    if (passwordSignup !== confirmPassword) {

      return alert("Passwords do not match. Please try again.");;
    }

    auth.createUserWithEmailAndPassword(emailSignup, passwordSignup)
      .then((userAuth) => {
        alert("Account created successfully ✅");
        // Create a new user document in Firestore with the user's data
        db.collection("users")
          .doc(userAuth.user.uid)
          .set({
            username,
            emailSignup,
            passwordSignup,
          }).catch((error) => {
            console.log(error.message, "error creating user document", error);
          });
      })
      .catch((error) => {
        console.log(error.message, "error creating user", error);
      });
    alert("Account crqsdqdqdqsdly ✅");
  };


  // ------------------------------
  const [authMode, setAuthMode] = useState("signin")
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }
  // ------------------------------

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form onSubmit={login} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                value={email} onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                value={password} onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form onSubmit={Signup} method="POST" className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Login
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              value={username} onChange={(e) => setUsername(e.target.value)} required
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              value={emailSignup} onChange={(e) => setEmailSignup(e.target.value)} required
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              value={passwordSignup} onChange={(e) => setPasswordSignup(e.target.value)} required
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="form-group mt-3">
            <label>confirmPassword</label>
            <input
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
              type="Password"
              className="form-control mt-1"
              placeholder="confirmPassword"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
};