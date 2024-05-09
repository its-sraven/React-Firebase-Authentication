import React, { useState } from 'react'
import validateEmail from '../utils/validation'
import {signUpWithEmail, signInWithGoogle} from '../../firebase/firebaseAuth'
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../src/store/useAuthStore';


const LoginPage = () => {

    const navigate = useNavigate();
    const { setLogin } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false)

    const onCreateUserWithEmailAndPassword = async () => {

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Validate provided email and password
        if (!trimmedEmail || !validateEmail(trimmedEmail)) {
            alert(!trimmedEmail ? 'Please enter your email' : 'Please enter a valid email address');
            return;
        }

        if (!trimmedPassword || trimmedPassword.length < 6) {
            alert(!trimmedPassword ? 'Please enter your password' : 'Password should be at least 6 characters');
            return;
        }

        // Start loading
        setIsSigningIn(true);

        try {
            // Create user with email and password
            const user = await signUpWithEmail(trimmedEmail, trimmedPassword);

            if (user) {
                setLogin(user);
                 navigate('/home')
            }
        } catch (error) {
            console.error('User creation failed...', error);
            // Stop loading
            setIsSigningIn(false);
        }
    }

    // common auth handler for google
    const handleSocialAuthentication = async (authFunction) => {
        setIsSigningIn(true);
        try {
            const user = await authFunction();
            console.log("authticated..retriving user")

            if (user) {
                setLogin(user)
                console.log('User signed in as:', user.displayName, user.email);
                console.log('User Object:', user);

                navigate('/home');
            }
        } catch (error) {
            console.error('Authentication failed', error);
            //* Show error on UI
        }
        setIsSigningIn(false);
    };



    return (
        <div className='bg-slate-50 h-full w-full flex justify-center items-center mt-16'>
            <div className='w-96 h-96 bg-white shadow-xl border-2 border-solid border-gray-300 rounded-xl px-2 flex justify-center items-center'>
                {/* email and password login form*/}
                <div className="w-full mx-auto px-5 space-y-4">
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
                        onClick={onCreateUserWithEmailAndPassword}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center "
                    >
                        {isSigningIn ? ("Signing in...") : ("Login")}
                    </button>

                    <div className='font-bold'>
                        or
                    </div>
                    <div className='flex'>
                        <button
                            type="button"
                            onClick={() => handleSocialAuthentication(signInWithGoogle)}                      
                            className="text-black bg-white border-2 border-gray-300 font-medium rounded-lg text-sm w-full py-2.5 text-center flex justify-center items-center gap-4">
                            <img
                                src="https://www.vectorlogo.zone/logos/google/google-tile.svg"
                                alt="GoogleLogo"
                                className='w-6 rounded-full'
                            />
                            <div>
                                {isSigningIn ? ("Signing in...") : ("Login with Google")}
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginPage