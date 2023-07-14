import './auth.css'

const Signup = () => {
    return (
        <div className='auth-container'>
            <form action="" className="auth-form">
                <h1>Welcome</h1>
                <p>Create Account</p>
                <div><input type="text" placeholder='Email' /></div>
                <div><input type="text" placeholder='Username' /></div>
                <div><input type="text" placeholder='Password' /></div>
                <div><input type="text" placeholder='Confirm Password' /></div>
                <div><button className='auth-btn'>Signup</button></div>

            </form>

        </div>
    )
}

export default Signup