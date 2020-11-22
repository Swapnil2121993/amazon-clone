import React, { Fragment, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "./axios"
import { useStateValue } from "./StateProvider"
import CheckoutProduct from "./CheckoutProduct"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import CurrencyFormat from "react-currency-format"
import { getBasketTotal } from "./reducer"
import { db } from "./firebase"
import "./Payment.css"

const Payment = () => {
	const [{ basket, user }, dispatch] = useStateValue()

	const stripe = useStripe()
	const elements = useElements()
	const history = useHistory()

	const [processing, setProcessing] = useState("")
	const [succeeded, setSucceeded] = useState(false)
	const [clientSecret, setClientSecret] = useState(true)
	const [error, setError] = useState(null)
	const [disabled, setDisabled] = useState(true)

	console.log("user", user)

	useEffect(() => {
		//generate the special stripe secret which allow us to charge a customer
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				//stripe expects the total in currencies subunits
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`
			})
			setClientSecret(response.data.clientSecret)
		}
		getClientSecret()
	}, [basket])

	const handleSubmit = async event => {
		event.preventDefault()
		setProcessing(true)

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement)
				}
			})
			.then(({ paymentIntent }) => {
				// paymentIntent = payment confirmation
				db.collection("users")
					.doc(user ? user.id : "user")
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created
					})
				setSucceeded(true)
				setError(null)
				setProcessing(false)
				dispatch({
					type: "EMPTY_BASKET"
				})
				// replace use to stop user coming to payment page again using browser
				// it will swap page with orders
				history.replace("/orders")
			})
	}

	const handleChange = event => {
		setDisabled(event.empty)
		setError(event.error ? event.error.message : "")
	}

	return (
		<div className='payment'>
			<div className='payment__container'>
				<h1>
					Checkout(<Link to='/checkout'>{basket?.length} items</Link>)
				</h1>
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Delivery Adddress </h3>
					</div>
					<div className='payment__address'>
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>Los Angeles </p>
						<p>California </p>
					</div>
				</div>
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Review items and Delivery </h3>
					</div>
					<div className='payment__items'>
						{basket.map((item, index) => (
							<Fragment key={index}>
								<CheckoutProduct
									id={item.id}
									title={item.title}
									image={item.image}
									price={item.price}
									rating={item.rating}
								/>
							</Fragment>
						))}
					</div>
				</div>
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Payment Method</h3>
					</div>
					<div className='payment__detail'>
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className='payment__priceContainer'>
								<CurrencyFormat
									renderText={value => <h3>Order Total: {value} </h3>}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing</p> : "Buy Now"}</span>
								</button>
							</div>
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Payment
