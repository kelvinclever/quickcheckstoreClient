import './success.css'
import {Link} from 'react-router-dom'
const Success = () => {
    return (
        <div className='success'>
            <div className='success-img'>
                <img src="/complete.svg" alt="" />
            </div>
            <div className='success-text'>
                <h1>Congratulations</h1>
                <p>For shopping with us</p>
                <p>Your order is confirmed.Check your email,we will be in touch soon.</p>
                <Link to='/' ><button >Home</button></Link>
            </div>
        </div>
    )
}

export default Success