import React, { useState } from "react"
import logo from "./amazon-logo.png"
import { auth } from "./firebase"
import { Link, useHistory } from "react-router-dom"
import "./Login.css"

const Login = () => {
	const history = useHistory()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const signIn = e => {
		e.preventDefault()
		auth
			.signInWithEmailAndPassword(email, password)
			.then(auth => {
				if (auth) {
					history.push("/")
				}
			})
			.catch(error => alert(error.message))
	}

	const register = e => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(auth => {
				// it successfully created new user with email and password
				if (auth) {
					history.push("/")
				}
			})
			.catch(error => alert(error.message))
	}

	return (
		<div className='login'>
			<Link to='/'>
				<img alt='' className='login__logo' src={logo} />
			</Link>
			<div className='login__container'>
				<h1>Sign-in</h1>
				<form>
					<h5>E-mail</h5>
					<input
						type='text'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<h5>Password</h5>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<button className='login__signinButton' onClick={e => signIn(e)}>
						Sign In
					</button>
				</form>
				<p>
					By continuing, you agree to Amazon's clone Conditions of Use and
					Privacy Notice.
				</p>
				<button className='login__registerButton' onClick={e => register(e)}>
					Create your amazon Account
				</button>
			</div>
		</div>
	)
}

export default Login
