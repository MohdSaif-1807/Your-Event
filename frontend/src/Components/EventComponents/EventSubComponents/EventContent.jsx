import { MdLocationPin } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { AppContext } from "../../../AppContext";
export const EventContent = () => {
    const { serverAddress, setAllEvents, allEvents } = useContext(AppContext);
    const [visible, setVisible] = useState(false);
    const [location, setLocation] = useState("");
    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [eventDescription, setEventDescription] = useState("");
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const handleEventSubmit = (e) => {
        e.preventDefault();
        const data = {
            eventName: eventName,
            location: location,
            startTime: new Date(startTime).toISOString(),
            endTime: new Date(endTime).toISOString(),
            eventDescription: eventDescription
        }
        console.log(data);
        axios.post(`${serverAddress}/calendar/create-event`, data, {
            withCredentials: true
        }
        ).then((res) => {
            console.log(res);
            getAllEvents();
        }).catch((err) => {
            console.log(err);
        })
        setVisible(false);
        setEventName("");
        setLocation("");
        setStartTime(new Date());
        setEndTime(new Date());
        setEventDescription("");

    }

    const getAllEvents = () => {
        axios.get(`${serverAddress}/calendar/events`, {
            withCredentials: true,
        }).then((data) => {
            console.log(data);
            setAllEvents(data?.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        console.log(allEvents);
    },)

    return (
        <>
            <div class="p-4 sm:ml-64 scrollable-y-auto">
                <div class="p-4 border-2 rounded-lg  mt-14 h-full w-full">
                    <p className="text-2xl font-bold text-center text-red-600" >All Events</p>
                    <div className="flex flex-row w-full items-center justify-end">
                        <div>
                            <button type="button" onClick={() => { setVisible(true) }} className="mb-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create Event</button>
                        </div>
                    </div>

                    {
                        allEvents?.map((data, index) => (
                            <div className="bg-white h-auto md:h-24 sm:h-64 lg:h-24 w-auto p-2 rounded-xl mb-2">
                                <div className="flex flex-col md:flex-row sm:flex-col lg:flex-row h-full w-full">
                                    <div className=" h-20 flex-col md:w-16  sm:h-24 md:border-r-2 p-2 sm:border-b-2 sm:border-red-500 border-b-2 border-red-500 md:border-r-2 md:border-b-0 lg:border-b-0 md:border-red-500 md:h-full md:w-20 lg:w-32 sm:flex-col lg:border-r-2 lg:border-red-500 lg:flex-col lg:h-full  flex  sm:h-full text-center items-center justify-center p-1">
                                        <div className="h-1/2 items-center justify-center flex">
                                            <p className="text-red-500 text-md md:text-lg lg:text-xl font-semibold">{months[Number((data?.start?.dateTime.split("T")[0]).split("-")[1]) - 1]}</p>
                                        </div>
                                        <div className="h-1/2  flex">
                                            <p className="text-red-500 text-2xl md:text-3xl lg:text-2xl font-bold">{((data?.start?.dateTime.split("T")[0]).split("-")[2])}</p>
                                        </div>
                                    </div>

                                    <div className="flex-col items-center justify-center w-full lg:w-36 md:w-56 flex md:flex-col flex-row h-full lg:ml-auto md:ml-auto p-2">
                                        <div className="flex md:flex-col w-full lg:h-1/2 justify-center">
                                            <div className="flex flex-row items-center w-full">
                                                <div className="flex lg:w-1/4 sm:w-1/3 w-full flex items-center justify-end w-1/4">
                                                    <FaClock className="lg:w-4 lg:h-4 md:h-3 md:w-3 text-red-500 text-right " />
                                                </div>
                                                <div className="flex lg:w-3/4 sm:w-full w-full ml-4">
                                                    <p className="lg:text-md md:text-sm text-red-500 font-semibold">{`${(((data?.start?.dateTime.split("T")[1]).split("+")[0]).split(":")[0])}:${(((data?.start?.dateTime.split("T")[1]).split("+")[0]).split(":")[1])}`} - {`${(((data?.end?.dateTime.split("T")[1]).split("+")[0]).split(":")[0])}:${(((data?.end?.dateTime.split("T")[1]).split("+")[0]).split(":")[1])}`} </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col h-1/2 w-full">
                                            <div className="flex  flex-row items-center w-full">
                                                <div className="flex lg:w-1/4 sm:w-1/3 w-full flex items-center justify-end w-1/4">
                                                    <MdLocationPin className="lg:w-5 lg:h-5 md:h-4 md:w-4 text-red-500 text-right " />
                                                </div>
                                                <div className="w-3/4 ml-4">
                                                    <p className="lg:text-md md:text-sm text-red-500 font-semibold">{data?.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-auto h-full flex items-center justify-center  ml-auto">
                                        <p className="lg:text-md md:text-sm text-red-500 font-semibold ">{data?.summary}</p>
                                    </div>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>




            <div id="crud-modal" tabindex="-1" aria-hidden="true" onSubmit={handleEventSubmit} className={`${visible ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow ">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-lg font-semibold text-gray-900 ">
                                Create New Event
                            </h3>
                            <button type="button" onClick={() => { setVisible(false) }} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Event Name</label>
                                    <input type="text" value={eventName} onChange={(e) => { setEventName(e.target.value) }} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type Event name" required="" />
                                </div>
                                <div className="col-span-2">
                                    <label for="location" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                                    <input type="text" value={location} onChange={(e) => { setLocation(e.target.value) }} name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type Location" required="" />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label for="start time" className="block mb-2 text-sm font-medium text-gray-900">Start Time</label>
                                    <input type="datetime-local" value={startTime} onChange={(e) => { setStartTime(e.target.value) }} name="start-time" id="start-time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="12:00" required="" />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label for="End Time" className="block mb-2 text-sm font-medium text-gray-900">End Time</label>
                                    <input type="datetime-local" name="end-time" id="end-time" value={endTime} onChange={(e) => { setEndTime(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />


                                </div>
                                <div className="col-span-2">
                                    <label for="description" className="block mb-2 text-sm font-medium text-gray-900">Event Description</label>
                                    <textarea id="description" value={eventDescription} onChange={(e) => { setEventDescription(e.target.value) }} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  " placeholder="Write Event Description here"></textarea>
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Add new Event
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}