import './footer.css'
import { Link } from "react-router-dom"
import {BsTwitter,BsInstagram,BsFacebook} from "react-icons/bs"
import Paycard from '../hero/Paycard';
const Footer = () => {
  return (
    <div className="footer">
      <div className='footer-left'>
        <h1>Useful Links</h1>
        <div>
          <Link to="/help">need help?</Link>
          <Link to="/contact-us">contact us</Link>
          <Link>about us</Link>
        </div>
      </div>
      <div className='footer-center'>
        <h1>Payment Method</h1>
        <div>
          <p>It is good to have you.Currently we only accept credit card payment</p>
          <Link>Readmore</Link>
          <Paycard/>
        </div>
      </div>
      <div className='footer-right'>
        <h1>Lets Connect</h1>
        <p><BsTwitter/>Twitter</p>
        <p><BsInstagram/>Instagram</p>
        <p><BsFacebook/>Facebook</p>
      </div>
    </div>
  )
}

export default Footer