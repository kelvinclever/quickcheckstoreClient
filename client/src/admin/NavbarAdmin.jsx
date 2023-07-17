import './navbaradmin.css'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './admincontext/Context'
const NavbarAdmin = ()=>{
    const navigate=useNavigate()
    const {dispatch}=useContext(Context);
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/admin/login');
      };
    
    
    return(
        <div className='navbaradmin'>
            <div className='leftside'>
                <div className='admin'>
                     <span>A</span>
                     <span>D</span>
                     <span>M</span>
                     <span>I</span>
                     <span>N</span>
                </div>
                <div className='banner'>
                    <span>Q</span>
                    <span>*</span>
                    <span>C</span>
                    <span>*</span>
                    <span>S</span>
                </div>
            </div>
            <div className='rigtside'>
                   <button id='logout' onClick={handleLogout}>
                    logout
                   </button>
            </div>
        </div>
    )
}
export default NavbarAdmin