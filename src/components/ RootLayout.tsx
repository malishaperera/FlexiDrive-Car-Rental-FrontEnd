import {Outlet, useLocation} from "react-router-dom";
import { useEffect } from "react";

export function RootLayout() {

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/register") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [location]);

    return (

        <>
            {/*<HomePage/>*/}
            {/*<Header />*/}
            <Outlet/>

        </>
    );
}
