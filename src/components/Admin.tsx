import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {toast} from "react-hot-toast";


export function Admin() {

    const token = localStorage.getItem("authToken");

    if (!token) {
        toast.error("please login!");
        return <Navigate to="/login" />;
    }

    const decoded: any = jwtDecode(token);
    if (decoded.role !== "ADMIN") {
        toast.error("no Administrator found!");
        return <Navigate to="/" />;
    }
    return (
        <div className="my-header w-screen h-screen bg-highloght flex justify-center items-center overflow-hidden">



           {/*I decide this Admin dashboard created is side bar*/}







        </div>
    )

}