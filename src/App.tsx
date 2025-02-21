import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AdminRegister } from "./pages/register/AdminRegister.tsx";
import {RootLayout} from "./components/ RootLayout.tsx";
import {HomePage} from "./components/HomePage.tsx";

function App() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                { path: "/", element: <HomePage /> },
                { path: "register", element: <AdminRegister /> },
            ],
        },
    ]);

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        width: "200px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }}
            />
            <RouterProvider router={routes} />
        </>
    );
}

export default App;
