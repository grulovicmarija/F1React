import axios from "axios";
import { useEffect, useState } from "react";
import UserTicketsList from "./UserTicketsList";
import { BsBack } from "react-icons/bs";
import { FaBackspace, FaBackward } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

export default function ReservationsMessage({ user, setHomePage , setReservationForm, backToReservationForm, setAllRacesForm}) {


    const [allRaces, setAllRaces] = useState([]); 

    function getAllRaces() {
        axios.get(`https://localhost:7012/kupac/${user.id}`)
            .then((result) => {
                setAllRaces(result.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function handleClose() { 
        setReservationForm(false); 
        setHomePage(true); 
        setAllRacesForm(false);
    }

    function handleBack() { 
        setReservationForm(true); 
        setAllRacesForm(false); 
    }

    useEffect(() => {
        getAllRaces();
      }, []);


    return (
        <section className="cursor-default bg-cover bg-[url('assets/talas3.png')] bg-gray-400 bg-blend-multiply h-[100vh] flex items-center justify-center">
            <div className="flex items-center justify-center p-6">
                <div className="mx-auto w-full h-full max-w-[650px]">
                    <form>
                        <div className="-mx-3 flex flex-wrap bg-gray-950 rounded-lg shadow p-6">


                            {backToReservationForm === false ?
                                <div className="flex w-full justify-end">
                                    <div className="text-[#e10700ea] cursor-pointer relative bottom-3 text-[18px]"
                                        onClick={() => handleClose()}>x</div>
                                </div> :

                                <div className="flex w-full justify-between">
                                 
                                 <div className="text-[#e10700ea] cursor-pointer text-[18px] ml-3 mt-3"
                                     onClick={() => handleBack()}><IoArrowBack/></div>
                                 <div className="text-[#e10700ea] cursor-pointer text-[18px] mr-3"
                                     onClick={() => handleClose()}>x</div>
                           
                             </div>

                            }

                            <div className="w-full font-bold tracking-tight text-white lg:text-2xl">
                                <h1 className='m-5'>All {user.ime}'s <span className=" text-[#e10600]">tickets</span></h1>
                            </div>

                            <div className="flex items-center justify-center p-6">
                                <div className="mx-auto w-full h-full max-w-[650px]">
                                    <UserTicketsList  reservations={allRaces}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}
