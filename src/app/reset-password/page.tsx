'use client'
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react"; // Using Lucide icons for show/hide

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            toast.error("Please fill both fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("/api/users/resetpassword", { token, password });
            toast.success(res.data.message || "Password reset successful");
            setPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            const msg = error.response?.data?.error || "Something went wrong";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-300">
                <h2 className="text-2xl font-bold text-black mb-4 text-center">Reset Password</h2>

                <form onSubmit={handleReset} className="space-y-4">
                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-black mb-1">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter new password"
                                className="w-full px-4 py-2 rounded-md border border-gray-400 text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 h-10" // Adjusted padding and height
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600 hover:text-gray-700" // Simplified positioning
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-black" />
                                ) : (
                                    <Eye className="h-5 w-5 text-black" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-black mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Confirm new password"
                                className="w-full px-4 py-2 rounded-md border border-gray-400 text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 h-10" // Adjusted padding and height
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600 hover:text-gray-700" // Simplified positioning
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5 text-black" />
                                ) : (
                                    <Eye className="h-5 w-5  text-black" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <p className="text-sm text-center text-black  mt-4">
                    Remember your password? <a href="/login" className="text-blue-600 hover:underline">Back to Login</a>
                </p>
            </div>
        </div>
    );
}