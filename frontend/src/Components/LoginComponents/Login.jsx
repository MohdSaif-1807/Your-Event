import { useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AppContext } from "../../AppContext";
import axios from 'axios';


export const Login = () => {
    const { serverAddress } = useContext(AppContext);
    const loginWithGoogle = () => {
        window.open(`${serverAddress}/auth/google/callback`, '_self');
    }

    return (
        <>
            <div className="flex h-screen w-full border-black border-2 p-4 flex-col items-center justify-center">
                <h1 className="text-3xl font-bold sm:text-4xl md:text-4xl lg:text-4xl mb-2">Your's Events</h1>
                <div className="bg-white h-1/2 w-1/2 flex flex-col sm:flex-row md:flex-row  items-center justify-center">
                    <div className="flex flex-col sm:flex-row h-full w-full">
                        <div className="w-full h-1/2 sm:h-full sm:w-1/2 bg-red-500 flex flex-col sm:flex-row items-center justify-center">
                            <h1 className="text-2xl font-bold sm:text-3xl md:text-3xl lg:text-3xl text-white">Login</h1>
                        </div>
                        <div className="w-full h-1/2 sm:h-full sm:w-1/2 flex flex-col sm:flex-row items-center justify-center">
                            <button type="button" onClick={loginWithGoogle} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                                <FcGoogle className="w-5 h-5 me-2 -ms-1" />
                                Login with Google
                            </button>
                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}