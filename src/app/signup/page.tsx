'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState<{ top: string; left: string; delay: string; duration: string }[]>([]);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup success', response.data);
      toast.success('Signup successful! Redirecting...');
      router.push('/login');
    } catch (error: any) {
      console.error("Signup failed", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.username.length > 0 && user.password.length > 0));
  }, [user]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 3}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-black'>
      {/* Background Gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-gray-950'></div>

      {/* Stars Animation */}
      <div className='absolute inset-0 pointer-events-none'>
        {stars.map((star, i) => (
          <div 
            key={i}
            className='absolute w-[2px] h-[2px] bg-white rounded-full opacity-50 animate-twinkle'
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              animationDuration: star.duration
            }}
          />
        ))}
      </div>

      {/* Signup Form */}
      <div className='relative z-10 bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/20 w-80'>
        <h1 className='text-2xl font-bold mb-4 text-center text-black'>
          {loading ? 'Processing...' : 'Signup'}
        </h1>
        <hr className='mb-4 border-white/30' />

        <label className='block text-black mb-1' htmlFor='username'>Username</label>
        <input 
          className='w-full border border-gray-300 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black' 
          placeholder='Enter username' id='username' type='text' value={user.username} 
          onChange={(e) => setUser({ ...user, username: e.target.value })} 
        />
        
        <label className='block text-black mb-1' htmlFor='email'>Email</label>
        <input 
          className='w-full border border-gray-300 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black' 
          placeholder='Enter email' id='email' type='text' value={user.email} 
          onChange={(e) => setUser({ ...user, email: e.target.value })} 
        />
        
        <label className='block text-black mb-1' htmlFor='password'>Password</label>
        <input 
          className='w-full border border-gray-300 py-2 px-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black' 
          placeholder='Enter password' id='password' type='password' value={user.password} 
          onChange={(e) => setUser({ ...user, password: e.target.value })} 
        />
        
        <button 
          className={`w-full text-white py-2 rounded-lg transition duration-200 ${
            buttonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`} 
          onClick={onSignUp}
          disabled={buttonDisabled}>
          {buttonDisabled ? 'Fill All Fields' : 'Signup'}
        </button>

        <p className='text-sm text-black text-center mt-3'>
          Already have an account? <Link href='/login' className='text-blue-500 hover:underline'>Login</Link>
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
      `}</style>
    </div>
  );
}

export default SignupPage;
