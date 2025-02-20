import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
    const { user, handleLogout } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className="navbar bg-neutral">
            <div className="flex-1">
                <Link to="/home" className="btn btn-ghost text-xl">Notes App</Link>
            </div>
            <div className="flex-none gap-2">
                <button className="btn no-animation">Welcome, {user?.name || "Guest"}!</button>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Avatar"
                                src="https://i.pinimg.com/736x/43/be/24/43be24c862a28bb262d4b349f6a4bc30.jpg" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a onClick={() => { handleLogout(); navigate("/signin"); }}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;