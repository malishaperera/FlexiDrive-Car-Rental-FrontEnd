import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CustomerRegister } from "./pages/register/CustomerRegister.tsx";
import { RootLayout } from "./components/ RootLayout.tsx";
import { HomePage } from "./components/HomePage.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";
import {Login} from "./pages/login/Login.tsx";
import {AdminDashBoard} from "./pages/admin/AdminDashBoard.tsx";
import ErrorNotFound from "./pages/Error.tsx";
import {Car} from "./pages/customer/Car.tsx";
import {Booking} from "./pages/customer/Booking.tsx";
import {CustomerDetails} from "./pages/customer/CustomerDetails.tsx";
import {AdminCarManage} from "./pages/admin/AdminCarManage.tsx";
import {AdminCustomerManage} from "./pages/admin/AdminCustomerManage.tsx";
import {AdminManage} from "./pages/admin/AdminManage.tsx";
import {AdminBookingManage} from "./pages/admin/AdminBookingManage.tsx";
import {DashBoardAdmin} from "./pages/admin/DashBoardAdmin.tsx";

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
                // { path: "adminDashboard", element: <AdminDashBoard /> },
                {
                    path: "adminDashboard",
                    element: <AdminDashBoard />,
                    children: [
                        // { index: true, element: <DashBoardAdmin /> },
                        { path: "adminCar", element: <AdminCarManage /> },
                        { path: "adminCustomer", element: <AdminCustomerManage /> },
                        { path: "adminManage", element: <AdminManage /> },
                        { path: "adminBooking", element: <AdminBookingManage /> },
                        { path: "test", element: <DashBoardAdmin /> },
                    ],
                },
                { path: "booking", element: <Booking /> },
                { path: "customerDetails", element: <CustomerDetails /> },
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
