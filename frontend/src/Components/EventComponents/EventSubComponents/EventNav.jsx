import { useContext, useEffect, useState } from "react";
import { MdEvent } from "react-icons/md";
import { AppContext } from "../../../AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const EventNav = () => {
    const [openNavbar, setOpenNavbar] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate();

    const { userInfo, serverAddress } = useContext(AppContext);

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${serverAddress}/logout`, {
                withCredentials: true
            })

            if (response.status === 200) {
                console.log(response);
                navigate('/');

            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log(userInfo);
    }, [])
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-2 border-gray-200 ">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                onClick={() => { setOpenNavbar(!openNavbar) }}
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>
                            <a href="#" className="flex ms-2 md:me-24">
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-red-600 font-bold">
                                    Your's Event
                                </span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => { setOpenProfile(!openProfile) }}
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 "
                                        aria-expanded={openProfile}
                                        data-dropdown-toggle="dropdown-user"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={userInfo?.picture}
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                <div className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow  ${openProfile ? '' : 'hidden'}`}
                                    id="dropdown-user"
                                    style={{
                                        position: 'absolute',
                                        right: '0',
                                        top: 'auto',
                                        transform: 'translateY(80px)'
                                    }}>
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 " role="none">
                                            {userInfo?.displayName}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate " role="none">
                                            {userInfo?.email}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li onClick={handleLogout}>
                                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  " role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-48 h-screen pt-20 transition-transform ${openNavbar ? 'transform-none' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 `} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
                    <ul className="flex space-x-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group">
                                <span className="flex items-center whitespace-nowrap">
                                    <MdEvent className="text-red-600" />
                                    <span className="ms-2 text-red-600">My Events</span>
                                </span>
                            </a>
                        </li>
                    </ul>

                </div>
            </aside>

        </>
    );
};
