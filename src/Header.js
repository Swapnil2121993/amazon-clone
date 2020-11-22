import React from "react"
import { Link } from "react-router-dom"
import SearchIcon from "@material-ui/icons/Search"
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import { useStateValue } from "./StateProvider"
import { auth } from "./firebase"
import "./Header.css"

const Header = () => {
	const [{ basket, user }, dispatch] = useStateValue()

	const handleAuthentication = () => {
		if (user) {
			auth.signOut()
		}
	}
	return (
		<div className='header'>
			<Link to='/'>
				<img
					className='header_logo'
					src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
				/>
			</Link>
			<div className='header_search'>
				<input className='header_search_input' type='text' />
				<SearchIcon className='header_searchIcon' />
			</div>
			<div className='header_nav' onClick={handleAuthentication}>
				<Link to={!user && "/login"}>
					<div className='header_option'>
						<span className='header_optionLineOne'>
							Hello {!user ? "Guest" : user.email}
						</span>
						<span className='header_optionLineTwo'>
							{user ? "Sign Out" : "Sign in"}
						</span>
					</div>
				</Link>
				<Link to='/orders'>
					<div className='header_option'>
						<span className='header_optionLineOne'>Returns</span>
						<span className='header_optionLineTwo'>& Orders</span>
					</div>
				</Link>
				<div className='header_option'>
					<span className='header_optionLineOne'>Your</span>
					<span className='header_optionLineTwo'>Prime</span>
				</div>
				<Link to='/checkout'>
					<div className='header_optionBasket'>
						<ShoppingBasketIcon />
						<span className='header_optionLineTwo header_basketCount'>
							{basket?.length}
						</span>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default Header
