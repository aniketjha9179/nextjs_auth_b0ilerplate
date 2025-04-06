'use client'
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/users/forgotpassword", { email });
      toast.success(res.data.message || "Reset link sent successfully");
      setEmail(""); // Clear after success
    } catch (error: any) {
      const msg = error.response?.data?.error || "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 px-4">
      <div className="w-full max-w-md bg-blue-100 bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-black mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md  bg-opacity-40 text-black  placeholder-black border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-200 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="text-sm text-center text-black mt-4">
          Remembered your password? <a href="/login" className="text-blue-400 hover:underline">Go to Login</a>
        </p>
      </div>
    </div>
  );
}
