import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

export default function UserTicketsList({ reservations, userId }) {

    const [total, setTotal] = useState(0); 
    const [user, setUser] = useState(null); 

    function calcTotal() { 
        let totalVar = 0; 

        reservations.forEach(element => {
            totalVar += element.konacnaCena; 
        });

        setTotal(totalVar); 
    }

    function getUser() { 
        axios.get(`https://localhost:7012/api/Kupci/${userId}`)
        .then((result) => { 
           setUser(result.data); 
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getUser();  
        calcTotal(); 
    }); 

    return (
        <>

            <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 cursor-default">

                {reservations.map((item) => {
                    return (
                        <div class="flex flex-col pb-7 pt-3">
                            <dt class="mb-1 text-white text-[20px]">Race {item.trka.datumOdrzavanja.slice(5, 10)} : {item.trka.lokacija}</dt>
                            {item.brojKarata === 1 ? <dd class="text-gray-500 text-[13px]">Booked {item.brojKarata} ticket for <span className="text-gray-300 text-[11px]">{item.zona.naziv}</span></dd> : <dd class="text-lg text-white">Booked {item.brojKarata} tickets for <span className="text-gray-300 text-[11px]">{item.zona.naziv}</span></dd>}
                            <dd className="text-gray-500 text-[14px] mt-[8px]">Price with discount: <span className="text-white">{item.konacnaCena} EUR</span></dd>
                            <dd className="text-gray-500 text-[14px] mt-[8px]">Reservation token: <span className="text-red-600">{item.token}</span></dd>
                            
                        </div>
                    )
                })}

               

            </dl>


            {(user!=null && user.promoPopust) ? 
            <p className='text-gray-300 mt-5 font-normal text-[18px] bg-white rounded-lg px-3 bg-opacity-10 w-fit'>Total {total} EUR + 5% Promo Discount = {total*0.95} EUR</p>
            : <p className='text-gray-300 mt-5 font-normal text-[18px] bg-white rounded-lg px-3 bg-opacity-10 w-fit'>Total {total} EUR</p>}

            {/* <button className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#e10600] rounded-lg hover:bg-gray-200 hover:text-[#e10600] hover:outline-none focus:outline-none"
                onClick={(e) => handleSubmit(e)}>
                Confirm
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </button> */}

        </>
    )
}

