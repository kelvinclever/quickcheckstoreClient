import NavbarAdmin from './NavbarAdmin';
import './admin.css'
import HomeAdmin from './HomeAdmin';

function Admin() {
  

  return (
    <div className='admin'>
        <NavbarAdmin/>
        <HomeAdmin/>
    </div>
  )
}

export default Admin;