import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CustomerRegister } from "./pages/register/CustomerRegister.tsx";
import { RootLayout } from "./components/ RootLayout.tsx";
import { HomePage } from "./components/HomePage.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";
import {Login} from "./pages/login/Login.tsx";
import {Admin} from "./components/Admin.tsx";
import ErrorNotFound from "./pages/Error.tsx";
import {Car} from "./pages/Car.tsx";

function App() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                { path: "/", element: <HomePage /> },
                { path: "car", element: <Car /> },
                { path: "register", element: <CustomerRegister /> },
                { path: "login", element: <Login /> },
                { path: "adminDashboard", element: <Admin /> },
                { path: "/*", element: <ErrorNotFound /> },
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
                    duration: 2000,
                    iconTheme: {
                        primary: 'green',
                        secondary: 'black',
                    },
                }}
            />
            <Provider store={store}>
                <RouterProvider router={routes} />
            </Provider>
        </>
    );
}

export default App;
