import axios from "axios";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

export default function List({ fullReservations, reservations, setDone, setHomePage, setReservationForm, promoCode, user}) {



    function handleSubmit(e) {
        e.preventDefault(); 

        const urlPromoCode = `https://localhost:7012/promoKod/${user.id}/${promoCode}`; 
        const url = "https://localhost:7012/api/Rezervacije";


        

        reservations.forEach(async element => {
            try {
                let response = await axios.post(url, element);
            }
            catch (ex) {
                alert(ex);
            }
        });

        setTimeout(() => {setDone(true)}, 3000);

        if(promoCode!=null && promoCode!="")
        {
            axios.get(urlPromoCode)
            .then((result) => { 
                
            })
            .catch((err) => { 
                alert("Invalid promo code. This does not affect the creation of your reservations"); 
            });
        }
       
       

    }



    return (
        <>

            <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 cursor-default">

                {fullReservations.map((item) => {
                    return (
                        <div class="flex flex-col pb-7 pt-3">
                            <dt class="mb-1 text-white text-[20px]">
                                <div className="flex items-center gap-2 justify-center">Race {item.trka.datumOdrzavanja.slice(5, 10)} : {item.trka.lokacija} <span title={location} className="font-light text-[12px] me-2 px-2.5 py-0.5 rounded-full bg-[#e1070083] text-white flex flex-row items-center gap-1 cursor-default badge w-fit">
                                    {<IoLocationOutline className="text-[12px] text-white" />}{item.trka.grad.naziv}</span>
                                </div></dt>
                            {item.brojKarata === 1 ? <dd class="text-gray-500 text-[13px]">Booking {item.brojKarata} ticket for <span className="text-gray-300 text-[11px]">{item.zona.naziv}</span></dd> : <dd class="text-lg text-white">Booking {item.brojKarata} tickets</dd>}
                            <dd className="text-gray-500 text-[17px] mt-[8px]">{item.zona.cenaKarte} x {item.brojKarata} | <span className="text-gray-400">{item.zona.cenaKarte * item.brojKarata} EUR</span></dd>

                        </div>
                    )
                })}

            </dl>

            <button className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#e10600] rounded-lg hover:bg-gray-200 hover:text-[#e10600] hover:outline-none focus:outline-none"
                onClick={(e) => handleSubmit(e)}>
                Confirm
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </button>

        </>
    )
}

