import './auth.css'

const Login = () => {
  return (
    <div className='auth-container'>
      <form action="" className='auth-form'>
        <h1>LOGIN HERE</h1>
        <div><input type="text" placeholder='Email' /></div>
        <div><input type="text" placeholder='Password' /></div>
        <div><button className='auth-btn'>Login</button></div>

      </form>

    </div>
  )
}

export default Login