import './auth.css'
import { Link } from 'react-router-dom';
import Logo from '../../../public/images/logo2.jpg';
const Signup = () => {
    return (
        <div>
        <div className='auth-container'>
        <div className="login-logo">
        <Link to="/">
          <img src={Logo} alt="" srcset="" />
        </Link>
         </div>
            
            <form action="" className="auth-form">
                <h1>Welcome</h1>
                <p>Create Account</p>
                <div><input type="text" placeholder='Email' /></div>
                <div><input type="text" placeholder='Username' /></div>
                <div><input type="text" placeholder='Password' /></div>
                <div><input type="text" placeholder='Confirm Password' /></div>
                <div><button className='auth-btn'>Signup</button></div>
                <p>Already have an account ? <a href='/auth/login'>login</a></p>
            </form>

        </div>
        </div>
    )
}

export default Signup