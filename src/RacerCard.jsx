import axios from "axios";
import { useEffect, useState } from "react";
import { defaultracer } from "./assets";

export default function RacerCard({racer}) {

    
    const [photo, setPhoto] = useState(defaultracer); 
    
   

    const getPhoto = () => { 

        axios.get(`https://localhost:7012/api/Photo/${racer.id}/ucesnik`, {
            responseType: 'blob'
        })
        .then((result) => { 
            setPhoto(URL.createObjectURL(result.data)); 
        })
        .catch((err) => { 
            console.log(err); 
        });
        
    }

    useEffect(() => {
        getPhoto(); 
    })

    return(
        <>
        
        <div className="basis-1/5 shadow-xl bg-slate-100 racercard h-[280px]">
            <img className="rounded-t-lg h-[75%] w-full object-cover object-top"
                src={photo}
                alt={racer.ime}
            />
        <div className="text-[15px] m-2 cursor-default flex justify-between">
            <div className="column">
                <p>{racer.ime} {' '} <b className="text-[#e10600]">{racer.prezime}</b></p>
                <p><i>{racer.drzava.naziv}</i></p>
            </div>
            <p className="w-7 h-7 justify-center items-center border-solid border-2 border-red-600 rounded-full radius flex mr-4 mt-2">{racer.rang}</p>
        </div>
        </div>
        </>
    )
}