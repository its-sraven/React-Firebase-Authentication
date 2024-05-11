import React, { useState } from 'react'
import validateEmail from '../utils/validation'
import { signUpWithEmail, signInWithGoogle,logInWithEmailAndPassword } from '../../firebase/firebaseAuth'
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../src/store/useAuthStore';


const LoginPage = () => {

    const navigate = useNavigate();
    const { setLogin, setAccessToken } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false)

    // common auth handler for google
    const handleAuthentication = async (authFunction) => {
        setIsSigningIn(true);
        try {
            const user = await authFunction();
            console.log("authticated..retriving user")

            if (user) {
                setLogin(user)
                console.log('User signed in as:', user.displayName, user.email);
                console.log('User Object:', user);
                const accessToken = user.accessToken;
                setAccessToken(accessToken);
                console.log("retrived token : ", accessToken);
                navigate('/home');
            }
        } catch (error) {
            console.error('Authentication failed', error);
            // Handle specific error messages
            if (error.code === 'auth/invalid-credential') {
                // Invalid credentials error
                alert('Invalid email or password. Please try again.');
            } else {
                // Other authentication errors
                alert('Authentication failed. Please try again later.');
            }
        }
        setIsSigningIn(false);
    };

    const onEmailAndPasswordLogIn = async () => {
        await handleAuthentication(
            () => logInWithEmailAndPassword(email, password),
            'Email Authentication successful...'
        );
    };



    return (
        <div className='bg-slate-50 h-full w-full flex justify-center items-center mt-16'>
            <div className='w-96 h-96 bg-white shadow-xl border-2 border-solid border-gray-300 rounded-xl px-2 flex justify-center items-center'>
                {/* email and password login form*/}
                <div className="w-full mx-auto px-5 space-y-1">
                <div className='space-y-2 mb-3'>
                          <h1 className='text-lg font-semibold text-slate-800'>Login to Your Account</h1>
                          {/* <div className='bg-slate-300 py-[0.4px]'></div> */}
                      </div>
                    <div className="">
                        <label
                            for="email"
                            className="mb-2 text-sm font-medium text-gray-900 flex justify-start"
                        >
                            Email
                        </label>
                        <input
                            required
                            id="email"
                            name="email"
                            type="email"
                            autoComplete='email'
                            value={email}
                            placeholder="name@flowbite.com"
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        />
                    </div>
                    <div className="">
                        <label
                            for="password"
                            className="mb-2 text-sm font-medium text-gray-900 flex justify-start "
                        >
                            Password
                        </label>
                        <input
                            required
                            id="password"
                            name="password"
                            type="password"
                            autoComplete='current-password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onEmailAndPasswordLogIn}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center "
                    >
                        {isSigningIn ? ("Logging in...") : ("Login")}
                    </button>
                    <button className='text-sm font-medium text-blue-600'>
                          <Link to='/signup'>
                              Not a user? Signup
                          </Link>
                      </button>
  
                    <div className='font-bold'>
                        or
                    </div>
                    <div className='flex'>
                        <button
                            type="button"
                            onClick={() => handleAuthentication(signInWithGoogle)}
                            className="text-black bg-white border-2 border-gray-300 font-medium rounded-lg text-sm w-full py-2.5 text-center flex justify-center items-center gap-4">
                            <img
                                src="https://www.vectorlogo.zone/logos/google/google-tile.svg"
                                alt="GoogleLogo"
                                className='w-6 rounded-full'
                            />
                            <div>
                                Login with Google
                            </div>
                        </button>
                    </div>
                </div>
  
            </div>
        </div>
    )
}

export default LoginPage