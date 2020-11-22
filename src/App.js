import React, { useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Header"
import Home from "./Home"
import Checkout from "./Checkout"
import Login from "./Login"
import Payment from "./Payment"
import Orders from "./Orders"
import { auth } from "./firebase"
import { useStateValue } from "./StateProvider"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

function App() {
	const [{}, dispatch] = useStateValue()
	const promise = loadStripe(
		"pk_test_51HntanBXv8CCn31IqDxBnZphQlCno77E2ZarZn5CZgHzPDnZCldMNo1YK1wteIEVgl76otxr7S5pcRuqM89tpZ4c00RKUS3mBf"
	)

	useEffect(() => {
		// will only run once when the app component loads...

		auth.onAuthStateChanged(authUser => {
			console.log("THE USER IS >>> ", authUser)
			if (authUser) {
				// the user just logged in / the user was logged in
				dispatch({
					type: "SET_USER",
					user: authUser
				})
			} else {
				// the user is logged out
				dispatch({
					type: "SET_USER",
					user: null
				})
			}
		})
	}, [])
	return (
		<Router>
			<div className='app'>
				<Switch>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/checkout'>
						<Header />
						<Checkout />
					</Route>
					<Route path='/payment'>
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route path='/orders'>
						<Header />
						<Orders />
					</Route>
					<Route path='/'>
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
