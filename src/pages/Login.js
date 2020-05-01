import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signin, signInWithGoogle, signInWithGitHub } from '../helpers/auth'

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)

    function handleChange(event) {
        setCredentials({
            ...credentials,
          [event.target.name]: event.target.value
        })
      }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('email: ', credentials.email)
        setError('')
        try {
          await signin(credentials.email, credentials.password);
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
        <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>
            Login to
            <Link to="/">
            Chatty
            </Link>
        </h1>
        <p>Fill in the form below to login to your account.</p>
        <div>
            <input placeholder="Email" name="email" type="email"
            onChange={handleChange}
            value={credentials.email}
            />
        </div>
        <div>
            <input placeholder="Password" name="password" type="password"
            onChange={handleChange}
            value={credentials.password}
            />
        </div>
        <div>
            {error ? (<p>{error}</p>) : null}
            <button type="submit">Login</button>
        </div>
        <hr />
        <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p>Or</p>
                <button onClick={googleSignIn} type="button">
                Sign up with Google
                </button>
                <button onClick={githubSignIn} type="button">
                Sign up with GitHub
                </button>
        </form>
    </div>
    )
}