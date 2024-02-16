import axios from "axios";
import { useEffect, useState } from "react"
import { HiSquaresPlus } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import List from "./List";
import ReservationsMessage from "./ReservationsMessage";




export default function ConfirmReservationForm({ selectedRaces, reservations, fullReservations, user, setConfirmation, setHomePage , setReservationForm, promoCode}) {


    const [previousReservations, setPreviousReservations] = useState([]); 
    const [done, setDone] = useState(false); 

    const [wait, setWait] = useState(true); 

    function getPreviousRaces() {
        axios.get(`https://localhost:7012/kupac/${user.id}`)
            .then((result) => {
                setTimeout(() => {setWait(false)}, 2000); 
                setPreviousReservations(result.data);

                let begin = 0;
                switch (result.data.length) {
                    case 0:
                        begin = 0;
                        break;

                    case 1:
                        begin = 10;
                        break;

                    case 2:
                        begin = 20;
                        break;

                    default:
                        begin = -1;
                        break;
                }

                if (begin >= 0) {
                    reservations.forEach(element => {
                        if (begin < 30) {
                            element.popust = begin;
                            begin = begin + 10;
                        }
                    });
                }

                

            })
            .catch((error) => {
                console.log(error)
            })

            
            console.log(reservations);
    }

    

    useEffect(() => {
        getPreviousRaces();
     
      }, []);


    if(wait) { 
        return (
            <section className="bg-cover bg-[url('assets/talas3.png')] bg-gray-400 bg-blend-multiply h-[100vh] flex items-center justify-center">
                <div className="flex items-center justify-center p-6">
                    <div className="mx-auto w-full h-full max-w-[650px]">
                        <h5 className="text-white">Please wait...</h5>
                    </div>
                </div>
    
            </section>)

    }
    else if(!done) {
    return (
        <section className="bg-cover bg-[url('assets/talas3.png')] bg-gray-400 bg-blend-multiply h-[100vh] flex items-center justify-center">
            <div className="flex items-center justify-center p-6">
                <div className="mx-auto w-full h-full max-w-[650px]">
                    <form>
                        <div className="-mx-3 flex flex-wrap bg-gray-950 rounded-lg shadow p-6">

                            <div className="flex w-full justify-end">
                                <div className="text-[#e10700ea] cursor-pointer relative bottom-3 text-[18px]"
                                    onClick={() => setConfirmation(false)}>x</div>
                            </div>

                            <div className="w-full font-bold tracking-tight text-white lg:text-2xl">
                                <h1 className="mb-1">Please <span className=" text-[#e10600]">check</span> your tickets</h1>
                            </div>

                            {(promoCode!=null && promoCode!="") ? <div className="w-full font-normal tracking-tight text-white text-[16px] m-0">
                                <h1 className="m-0">Your friend's Promo Code <span className=" text-[#e10600]">{promoCode}</span></h1>
                            </div>: null}
                           

                            <div className="flex items-center justify-center p-6">
                                <div className="mx-auto w-full h-full max-w-[650px]">
                                    <List fullReservations = {fullReservations} reservations={reservations} setDone={setDone} setHomePage = {setHomePage} setReservationForm = {setReservationForm}
                                    promoCode={promoCode} user={user}/>

                                </div>
                            </div>


                        </div>
                    </form>
                </div>
            </div>

        </section>)
    }
    else { 
        return <ReservationsMessage user={user} setHomePage = {setHomePage} setReservationForm = {setReservationForm} backToReservationForm={false}/>
    }
}
