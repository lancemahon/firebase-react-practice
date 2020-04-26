import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup, signInWithGoogle, signInWithGitHub } from '../helpers/auth'

export default function SignUp() {
    const [credentials, setCredentials] = useState(
        {
            email: '', 
            password: ''
        }
    )

    const [error, setError] = useState(null)

    function handleChange(event) {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        try {
          await signup(credentials.email, credentials.password)
        } catch (err) {
          setError(err.message)
        }
      }

      async function googleSignIn() {
        try {
          await signInWithGoogle()
        } catch (err) {
         setError(err.message)
        }
      }

      async function githubSignIn() {
        try {
          await signInWithGitHub();
        } catch (err) {
            setError(err.message)
        }
      }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <h1>
            Sign Up to
            <Link to="/">Chatty</Link>
            </h1>
            <p>Fill in the form below to create an account.</p>
            <div>
                <input placeholder="Email" name="email" type="email" onChange={handleChange} value={credentials.email}></input>
            </div>
            <div>
                <input placeholder="Password" name="password" onChange={handleChange} value={credentials.password} type="password"></input>
            </div>
            <div>
                {error ? <p>{error}</p> : null}
                <button type="submit">Sign up</button>
            </div>
            <p>Or</p>
                <button onClick={googleSignIn} type="button">
                Sign up with Google
                </button>
                <button onClick={githubSignIn} type="button">
                Sign up with GitHub
                </button>
            <hr></hr>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
        </div>
    )
}