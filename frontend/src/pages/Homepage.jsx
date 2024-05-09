import React from 'react';
import useAuthStore from '../../src/store/useAuthStore';
import { Link } from 'react-router-dom';


const Homepage = () => {
    const { currentUser, setLogout } = useAuthStore();
    console.log(`loggged in as ${currentUser?.email}`)

    return (
        <div className='bg-slate-50 h-full w-full flex justify-center items-center mt-16'>
            <div className='w-96 h-96 bg-white shadow-xl border-2 border-solid border-gray-300 rounded-xl px-2 flex justify-center items-center'>
                {currentUser ? (
                    <>
                        <div className='flex flex-col'>
                                <div className='py-5 font-semibold text-2xl'>My Profile</div>
                                <hr  className='py-5'/>
                            <div className='flex gap-5'>
                                <div>
                                    <img
                                        src={currentUser?.photoURL}
                                        alt="Profile"
                                        className='w-16 aspect-auto rounded-full'
                                    />
                                </div>
                                <div>
                                    <div className='flex justify-start font-semibold text-2xl'>
                                        {currentUser?.displayName}
                                    </div>
                                    <div>
                                        {currentUser?.email}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center mt-10">
                                <button onClick={() => setLogout()}>
                                    Logout
                                </button>
                            </div>
                        </div>

                    </>
                ) : (
                    <div>
                        You have been logged out.Please login again!
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center mt-10"
                        >
                            <Link to="/login">
                                Login
                            </Link>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Homepage;
