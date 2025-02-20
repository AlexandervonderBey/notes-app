import { Navigate } from "react-router";
import { getCurrentUser } from "../utils/localStorage";

const ProtectedRoute = ({ children }) => {
    const user = getCurrentUser();
    return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;