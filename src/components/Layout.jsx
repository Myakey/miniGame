import { Children } from "react";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div className="container mx-0">
            {/* {children} */}
            <Outlet />
        </div>
    );
}