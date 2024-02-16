import { TbHelmet } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { LiaCitySolid } from "react-icons/lia";
import { CiCalendarDate } from "react-icons/ci";
import { BsCalendar2Date } from "react-icons/bs";
import Racers from "./Racers";
import { defaultrace } from "./assets";
import { useEffect, useState } from "react";
import axios from "axios";


export default function RaceCard({id, title, description, city, location, date, setLogInForm, setReservationForm, setHomePage, setRacersList, setRacersForList}) { 

    const [photo, setPhoto] = useState(defaultrace); 

    const getPhoto = () => { 
        axios.get(`https://localhost:7012/api/Photo/${id}`, {
            responseType: 'blob'
        })
        .then((result) => { 
            setPhoto(URL.createObjectURL(result.data));
        })
        .catch((err) => { 
            console.log(err); 
        });
    }

    function getRacersList() {
        axios.get(`https://localhost:7012/api/Trke/ucesca/${id}`)
        .then((result) => { 
            setRacersForList(result.data); 
        })
        .catch((err) => { 
            console.log(err); 
        });
     }

    useEffect(() => { 
        getPhoto(); 
    })

    function handleReservation() {  
        setLogInForm(true); 
        setReservationForm(false);
        setHomePage(false);
    } 

    function handleRacersClick() { 
        getRacersList(); 
       setRacersList(true); 
    }

    return(
        <>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg h-[50%] w-full object-cover" src={photo} alt="" />
            </a>
            
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#e10600] dark:text-white ">{title}</h5>
                </a>
                <p className="mb-3 text-sm text-gray-500 dark:text-gray-400 text-justify cursor-default">{description}</p>
                
                <div className="flex flex-row justify-between mb-6">
                <span className="bg-gray-200 text-gray-800 text-[13px] font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 flex flex-row items-center gap-1 cursor-default badge">
                    {<LiaCitySolid className="text-[12px]"/>}{city}</span>
                <span title={location} className="bg-gray-200 text-gray-800 text-[13px] font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 flex flex-row items-center gap-1 cursor-default badge">
                    {<IoLocationOutline className="text-[12px] "/>}{location.length > 9 ? (location.slice(0,7) + "...") : location}</span>
                <span className="bg-gray-200 text-gray-800 text-[13px] font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 flex flex-row items-center gap-1 cursor-default  badge">
                    {<BsCalendar2Date className="text-[11px] mb-[1px]"/>}{date}</span>
              
                </div>

                <div className="flex justify-between">
                <button className="inline-flex justify-center items-center py-3 px-5  text-base font-medium text-center text-[#e10600] rounded-lg border border-[#e10600] hover:bg-red-100 hover:text-[#e10600]"
                        onClick = {() => handleRacersClick()}>
                        Racers
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>  
                    <button className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#e10600] rounded-lg hover:bg-gray-200 hover:text-[#e10600] hover:outline-none focus:outline-none"
                        onClick = {() => handleReservation()}>
                        Buy tickets
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>  
                </div>

            </div>
        </div>
        </>
    ) 
}
