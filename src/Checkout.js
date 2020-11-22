import React, { Fragment } from "react"
import Subtotal from "./Subtotal"
import { useStateValue } from "./StateProvider"
import CheckoutProduct from "./CheckoutProduct"
import "./Checkout.css"

const Checkout = () => {
	const [{ basket, user }, dispatch] = useStateValue()
	return (
		<div className='checkout'>
			<div className='checkout__left'>
				<h3>Hello, {user?.email || "Guest"}</h3>
				<h2>Your Shopping Basket</h2>
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
			<div className='checkout__right'>
				<Subtotal />
			</div>
		</div>
	)
}

export default Checkout
