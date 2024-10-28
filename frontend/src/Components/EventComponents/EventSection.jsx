import { useContext, useEffect } from "react"
import { EventContent } from "./EventSubComponents/EventContent"
import { EventNav } from "./EventSubComponents/EventNav"
import axios from "axios"
import { AppContext } from "../../AppContext"

export const EventSection = () => {
    const { serverAddress, setUserInfo, setAllEvents } = useContext(AppContext);
    useEffect(() => {
        axios.get(`${serverAddress}/login/success`, {
            withCredentials: true,
        })
            .then((data) => {
                console.log(data);
                setUserInfo(data?.data?.user);


            }).catch((err) => {
                console.log(err);
            })


        axios.get(`${serverAddress}/calendar/events`, {
            withCredentials: true,
        }).then((data) => {
            console.log(data);
            setAllEvents(data?.data);
        }).catch((err) => {
            console.log(err);
        })

    }, [])
    return (
        <>
            <EventNav />
            <EventContent />
        </>
    )
}