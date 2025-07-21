import { useState } from "react";
import { FaComment, FaUser, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Login from "../../components/ui/login";
import Regrestation from "../../components/ui/Regrestation";

const Auth = () => {
    const [active, setActive] = useState("login");
    
    return (
        <div className="min-h-screen bg-[#2b3d37] flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-indigo-600 p-6 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <FaComment className="text-white text-2xl" />
                        <h1 className="text-2xl font-bold text-white">ChatApp</h1>
                    </div>
                    <p className="text-indigo-100 text-sm">
                        {active === "login" 
                            ? "Sign in to continue your conversation" 
                            : "Join our community today"}
                    </p>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        onClick={() => setActive("login")}
                        className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200
                            ${active === "login" 
                                ? "text-indigo-600 border-b-2 border-indigo-600" 
                                : "text-gray-500 hover:text-gray-700"}`}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <FaSignInAlt />
                            <span>Login</span>
                        </div>
                    </button>
                    <button
                        onClick={() => setActive("register")}
                        className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200
                            ${active === "register" 
                                ? "text-indigo-600 border-b-2 border-indigo-600" 
                                : "text-gray-500 hover:text-gray-700"}`}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <FaUserPlus />
                            <span>Register</span>
                        </div>
                    </button>
                </div>
                
                {/* Form Container */}
                <div className="p-6">
                    {active === "login" ? <Login /> : <Regrestation />}
                </div>
            </div>
        </div>
    )
}

export default Auth;