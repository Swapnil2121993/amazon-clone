import React from "react"
import { useStateValue } from "./StateProvider"
import "./CheckoutProduct.css"

const CheckoutProduct = ({ id, title, price, image, rating }) => {
	const [{ basket }, dispatch] = useStateValue()

	const removeFromBasket = () =>
		dispatch({
			type: "REMOVE_FROM_BASKET",
			id: id
		})

	return (
		<div className='checkoutProduct'>
			<img className='checkoutProduct_image' src={image} alt='' />
			<div className='checkoutProduct_info'>
				<p className='checkoutProduct_title'>{title}</p>
				<p className='checkoutProduct_price'>
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className='checkoutProduct_rating'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<p>⭐</p>
						))}
				</div>
				<button onClick={removeFromBasket}>Remove from Basket</button>
			</div>
		</div>
	)
}

export default CheckoutProduct
