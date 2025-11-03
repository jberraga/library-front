import {
    createBrowserRouter
} from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import Dashboard from "./pages/Dashboard";

const Routes = createBrowserRouter([
    {
        path: "/",
        Component: Home
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    },
    {
        path: "/books",
        Component: Books
    },
    {
        path: "/dashboard",
        Component: Dashboard
    },
]);

export default Routes;