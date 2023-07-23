import './auth.css'
import { Link } from 'react-router-dom';
import Logo from '../../../public/images/logo2.jpg';
const Login = () => {
  return (
    <div className='auth-container'>
      <div className="login-logo">
      <Link to="/">
          <img src={Logo} alt="" srcset="" />
        </Link>
      </div>
      
      <form action="" className='auth-form'>
        <h1>LOGIN HERE</h1>
        <div><input type="text" placeholder='Email' /></div>
        <div><input type="text" placeholder='Password' /></div>
        <div><button className='auth-btn'>Login</button></div>
        <p>Dont have an account ? <a href='/auth/signup'>signup</a></p>
      </form>

    </div>
  )
}

export default Login