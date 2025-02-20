import { Outlet } from "react-router"
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"

const MainLayout = () => {
    return (
        <div>
        <Navbar />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>
    )
}

export default MainLayout;