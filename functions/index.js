const functions = require("firebase-functions")
const express = require("express")
const cors = require("cors")
const stripe = require("stripe")(
	"sk_test_51HntanBXv8CCn31ItNNZEiJWUsbWTmvOhqc7fWrk7BIXTvCSA4PkvHYvG4y540uHsKfS4qfPL0BIrQ38KqBmEu6H005Nt20OHd"
)

// API

// API config
const app = express()

// Middleware
app.use(cors({ origin: true }))
app.use(express.json())

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"))
app.post("/payments/create", async (request, response) => {
	const total = request.query.total
	console.log("payment request received for this amount", total)
	const paymentIntents = await stripe.paymentIntents.create({
		amount: total,
		currency: "usd"
	})
	//OK- Created
	response.status(201).send({
		clientSecret: paymentIntents.client_secret
	})
})

// Listen Command
exports.api = functions.https.onRequest(app)

//http://localhost:5001/clone-3e341/us-central1/api
