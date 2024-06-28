    import { Outlet, Navigate } from "react-router-dom";

    const ProtectedRoutes = () => {
        const user = localStorage.getItem("Token")
        const role = localStorage.getItem("Role")

        return (
            user ? <Outlet/> : <Navigate to="/login"/>)
    }

    export default ProtectedRoutes
