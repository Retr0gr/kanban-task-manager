import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
//import { useAuth } from "../utilities/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Register from "../pages/register/Register";
import Dnd from "../pages/Dnd";
import Login from "../pages/login/Login";


const Routes = () => {
    const token = Cookies.get("token");
    const role = localStorage.getItem("role");
    const routesForPublic = [
        {
            path: "/register",
            element: <Register />,
        },
    ];

    const routesForUserOnly = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/",
                    element: <Dnd />,
                },

            ],
        },
    ];

    const routesForAdminOnly = [

    ];

    const routesForModeratorOnly = [

    ];

    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <Login />,
        },
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...(role === "admin" ? routesForAdminOnly : []),
        ...(role === "moderator" ? routesForModeratorOnly : []),
        ...routesForUserOnly,
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;
