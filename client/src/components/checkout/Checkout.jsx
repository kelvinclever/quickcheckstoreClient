import './checkout.css'
import { FaTrashAlt } from "react-icons/fa";

const Checkout = () => {
    return (
        <div className='checkout-main'>

            <div className='checkout-now'>
                <div>
                    <h4>Checkout</h4>
                    <h4>Shipping information</h4>
                    <form className='checkout-form' action="">
                        <div className='inputs'>
                            <label htmlFor="">Name *</label>
                            <div>
                                <input type="text" />
                                <input type="text" />
                            </div>
                        </div>
                        <div className='inputs'>
                            <label htmlFor="">Email *</label>
                            <input type="text" />
                        </div>
                        <div className='inputs'>
                            <label htmlFor="">PHONE *</label>
                            <input type="text" />
                        </div>
                        <div className='inputs'>
                            <label htmlFor="">Adress</label>
                            <input type="text" />
                        </div>
                        <button className="proceed-btn">PROCEED</button>
                    </form>
                </div>
                <div className='checkout-right'>
                    <h2>CART()</h2>
                    <div>
                        <div >
                            <img className='checkout-img' src="https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=75" alt="" />
                            <div>
                                Lorem ipsum dolor sit amet.
                            </div>
                        </div>
                        <div>
                            <button className='remove-btn'><FaTrashAlt className='trash' /> Remove</button>
                        </div>
                    </div>
                    <div>
                        <h3>Cart Summary</h3>
                        <div className='checkout-subtotal'>
                            <p>SUB TOTAL</p>
                            <p>KES 200</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Checkout