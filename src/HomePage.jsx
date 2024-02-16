import axios from "axios";
import RaceCard from "./RaceCard";
import { useEffect, useState } from "react";
import Hero from "./Hero";
import Racers from "./Racers";
import Footer from "./Footer";
import Zones from "./Zones";
import { racersTitle, racesTitle } from "./assets";


function HomePage({setLogInForm, setHomePage, setReservationForm, setRacersList, setRacersForList}) { 

    const [races, setRaces] = useState([]); 
    const [user, setUser] = useState(null); 


    const getRaces = () => { 
        axios.get('https://localhost:7012/api/Trke/trke')
        .then((result) => { 
           setRaces(result.data); 
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => { 
        getRaces();
    }, []);


    return(
        <>

        <Hero setLogInForm={setLogInForm} setHomePage={setHomePage}/>
        
        <div id="targetDiv" className="flex items-center justify-center mt-24 mb-20">
                    <img src={racesTitle} className="object-cover h-[30vh]"/>
                </div>

        <div className="flex flex-row justify-between gap-8 m-10 height:100vh">
             
            {races.map((item) => { 
                return <RaceCard id={item.id} title={`Race ${item.datumOdrzavanja.slice(5,10)}`} description={item.dodatneInformacije}
                city={item.grad.naziv} location={item.lokacija} date={item.datumOdrzavanja.slice(0,10)} setHomePage={setHomePage}
                 setLogInForm={setLogInForm} setReservationForm={setReservationForm} setRacersList={setRacersList} setRacersForList={setRacersForList}/>
            })}

        </div>

        <div className="m-8">

        <div className="flex items-center justify-center mt-28 mb-12">
                    <img src={racersTitle} className="object-cover h-[30vh]"/>
                </div>
        <Racers/>

        <Zones/>
        </div>
       
        <Footer/>
        </>
    )
}

export default HomePage; 