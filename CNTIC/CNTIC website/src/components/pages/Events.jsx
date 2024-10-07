import React, { useEffect, useState } from "react";
import Event from "../EventsComponents/Event";
function Events() { 
    const [events,setEvents] = useState([])
    const GetEvents = async () => {
        try {
          const response = await fetch(
            "https://backend.cntic-club.com/api/posts/Show_event/",
            {
              method: "GET",
            }
          );
          const data = await response.json();
          setEvents(data);
        } catch (error) {
          console.error("Error:", error.message);
        }
      };
        useEffect(() => {
            GetEvents();
        }
        , []);
        console.log(events);
        const [refresh, setRefresh] = useState(false);
        const handleRefresh = () => {
            setRefresh(true);
        };
        useEffect(() => {
            GetEvents();
        }, []);
        useEffect(() => {
            if (refresh) {
                GetEvents();
                setRefresh(false);
            }
        }, [refresh]);
  return (
    <div className="mt-20 w-full p-10 flex justify-center items-center gap-10 flex-wrap flex-col md:flex-row mx-auto">
    {events.map((event,index) => (
        <Event key={index} handleRefresh={handleRefresh} enrolled_users={event.enrolled_users} id={event.id} image={'https://backend.cntic-club.com' + event.image} title={event.Title} desc={event.Description} count={event.count}/>
    ))}
    </div>
  );
}

export default Events;
