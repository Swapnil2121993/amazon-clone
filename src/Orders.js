import React, { useState, useEffect } from "react"
import { useStateValue } from "./StateProvider"
import { db } from "./firebase"
import Order from "./Order"
import "./Orders.css"

const Orders = () => {
	const [{ basket, user }, dispatch] = useStateValue()
	const [orders, setOrders] = useState([])

	useEffect(() => {
		db.collection("users")
			.doc(user ? user.id : "user")
			.collection("orders")
			.orderBy("created", "desc")
			.onSnapshot(snapshot =>
				setOrders(
					snapshot.docs.map(doc => ({
						id: doc.id,
						data: doc.data()
					}))
				)
			)
	}, [])

	return (
		<div className='orders'>
			<h1>Your Orders</h1>
			<div className='orders_order'>
				{orders?.map(order => (
					<Order order={order} />
				))}
			</div>
		</div>
	)
}

export default Orders
