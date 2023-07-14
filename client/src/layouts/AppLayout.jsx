import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"

import './layout.css'


const AppLayout = () => {
    return (
        <div className="layout">
            <div>
                <Navbar />
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}

export default AppLayout