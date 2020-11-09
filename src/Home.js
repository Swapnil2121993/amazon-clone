import React from "react"
import Product from "./Product"
import "./Home.css"

const Home = () => {
	return (
		<div className='home'>
			<div className='home__container'>
				<img
					className='home_image'
					src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_Tallhero_Dash_en_US_1x._CB418727898_.jpg'
				/>
				<div className='home__row'>
					<Product
						id='234545333'
						title='The Sentinel: A Jack Reacher Novel Kindle Edition'
						price={29.99}
						rating={5}
						image='https://m.media-amazon.com/images/I/51vWyoVuIdL.jpg'
					/>
					<Product
						id='231265789'
						title='Breville BES870BSXL Barista Express Espresso Machine, Black Sesame'
						price={599.95}
						image='https://images-na.ssl-images-amazon.com/images/I/51kBAWgICvL._AC_SR400,600_.jpg'
						rating={3}
					/>
				</div>
				<div className='home__row'>
					<Product
						id='546723454'
						title='Fitbit Charge 4 Fitness and Activity Tracker with Built-in GPS, Heart Rate, Sleep & Swim Tracking, Black/Black, One Size (S &L Bands Included)'
						price={199.99}
						rating={4}
						image='https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466.jpg'
					/>
					<Product
						id='87342312'
						title='Motorola Razr 5G | Unlocked | Made for US by Motorola | 8/256GB | 48MP Camera | 2020'
						price={999.99}
						rating={4}
						image='https://images-na.ssl-images-amazon.com/images/I/41lKMdbd-mL._AC_SR400,600_.jpg'
					/>
					<Product
						id='76984534'
						title='Google Pixelbook Go - Lightweight Chromebook Laptop - Up to 12 Hours Battery Life[1] Touch Screen Chromebook - Just Black'
						price={644.45}
						rating={4}
						image='https://m.media-amazon.com/images/I/81DPxb7y6-L._AC_UY218_.jpg'
					/>
				</div>
				<div className='home__row'>
					<Product
						id='875645321'
						title='SAMSUNG 55-Inch Class Crystal UHD TU-8000 Series - 4K UHD HDR Smart TV with Alexa Built-in (UN55TU8000FXZA, 2020 Model)'
						rating={5}
						price={899.99}
						image='https://images-na.ssl-images-amazon.com/images/I/71RiQZ0J2SL._AC_SX569_.jpg'
					/>
				</div>
			</div>
		</div>
	)
}

export default Home
