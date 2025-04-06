'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

function LoginPage() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState<{ top: string; left: string; delay: string; duration: string }[]>([]);
  const [shootingStars, setShootingStars] = useState<{ top: string; left: string; delay: string }[]>([]);

  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('/api/users/login', user);
      toast.success('Login success');
      router.push('/profile');
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 3}s`,
    }));
    setStars(newStars);

    const newShootingStars = Array.from({ length: 5 }, () => ({
      top: `${Math.random() * 50 + 20}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
    }));
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-black">
      
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950">
        {stars.map((star, i) => (
          <div 
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-50 animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              animationDuration: star.duration
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {shootingStars.map((star, i) => (
          <div 
            key={i}
            className="absolute w-[3px] h-[3px] bg-white opacity-80 rounded-full animate-shooting-star"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>

      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/20 w-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">
          {loading ? 'Processing...' : 'Login'}
        </h1>
        <hr className="mb-4 border-white/30" />
        
        <form onSubmit={onLogin}>
          <label className="block text-black mb-1" htmlFor="email">Email</label>
          <input 
            className="w-full border border-gray-300 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
            placeholder="Enter email" id="email" type="text" value={user.email} 
            onChange={(e) => setUser({ ...user, email: e.target.value })} 
          />
          
          <label className="block text-black mb-1" htmlFor="password">Password</label>
          <input 
            className="w-full border border-gray-300 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
            placeholder="Enter password" id="password" type="password" value={user.password} 
            onChange={(e) => setUser({ ...user, password: e.target.value })} 
          />

          <div className="text-right mt-1 mb-4">
            <Link href="/forgot-password" className="text-xs text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          
          <button 
            className={`w-full text-white py-2 rounded-lg transition duration-200 ${
              buttonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`} 
            type="submit" 
            disabled={buttonDisabled}>
            {buttonDisabled ? 'Fill All Fields' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-black text-center mt-3">
          Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
          100% { opacity: 0.3; transform: scale(1); }
        }
        .animate-twinkle {
          animation: twinkle 3s infinite ease-in-out;
        }

        @keyframes shootingStar {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-50px, 50px) scale(0.5); opacity: 0; }
        }
        .animate-shooting-star {
          animation: shootingStar 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
