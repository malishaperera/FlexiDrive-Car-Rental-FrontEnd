import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../reducers/LoginReducer";
import {Header} from "../../components/home/Header.tsx";
import {jwtDecode} from "jwt-decode";

export function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        dispatch(loginUser(formData)).then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
                const { token, role, name } = result.payload;

                if (token) {
                    localStorage.setItem("authToken", token);
                    localStorage.setItem("customerName", name);
                    setTimeout(() => {
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("customerName");
                        window.location.href = "/login";
                    }, 45 * 60 * 1000);
                }
                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);


                if (role === "CUSTOMER") {
                    // toast.success("You are logged in!");
                    navigate("/");
                } else if (role === "ADMIN") {
                    navigate("/adminDashboard");
                } else {
                    navigate("/");
                }
            }
        });
    }, [dispatch, formData, navigate]);

    return (
        <>
            <Header/>

            <div
                className="flex justify-center items-center min-h-screen bg-cover bg-center relative mt-20 my-header"
                style={{ backgroundImage: "url('/car1.jpg')" }}
            >
                <div className="relative flex w-[500px] max-w-4xl bg-opacity-20 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden mb-20">
                    <div className="w-full flex flex-col justify-center items-center p-8">
                        <h2 className="text-xl font-bold text-center text-[#3598d7] mb-6 drop-shadow-lg">
                            Login
                        </h2>
                        <form className="w-full space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-200">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-3 bg-transparent border border-gray-300 text-white rounded-md focus:ring-[#40b6f0] focus:border-[#40b6f0] placeholder-gray-300"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-3 bg-transparent border border-gray-300 text-white rounded-md focus:ring-[#40b6f0] focus:border-[#40b6f0] placeholder-gray-300"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#40b6f0] text-white p-3 rounded-md hover:bg-[#3598d7] transition font-semibold"
                            >
                                Login
                            </button>
                        </form>
                        <p className="text-center text-sm text-gray-200 mt-4">
                            Don't have an account?{" "}
                            <a href="/register" className="text-[#40b6f0] hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}