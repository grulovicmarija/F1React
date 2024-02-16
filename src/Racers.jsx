import axios from "axios";
import { useEffect, useState } from "react";
import { defaultracer } from "./assets";
import RacerCard from "./RacerCard";

export default function Racers() {

    const [racers, setRacers] = useState([]); 
    
    const getRacers = () => { 

        axios.get('https://localhost:7012/api/Ucesnici/ucesnici')
        .then((result) => { 
           setRacers(result.data); 
        })
        .catch((error) => {
            console.log(error)
        })

    
    }

    useEffect(() => {
        getRacers();
    }, []);

   

    return(
        <>
        
            <div className="flex flex-row flex-wrap justify-between gap-8 m-8 list-none">
                {racers.map((item) => {return <RacerCard racer={item}/>})}
            </div>
        
        </>
    )
}