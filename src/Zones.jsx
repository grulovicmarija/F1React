import axios from "axios";
import { useEffect, useState } from "react"
import { zonesTitle } from "./assets";


export default function Zones() {

    const [zones, setZones] = useState([]);

    function getZones() {
        axios.get('https://localhost:7012/api/Zone/zone')
            .then((result) => {
                setZones(result.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getZones();
    })

    return (
        <>

                <div className="flex items-center justify-center mt-24">
                    <img src={zonesTitle} className="object-cover h-[30vh]"/>
                </div>

            <div className="cursor-default flex justify-center ml-[30px] mr-[30px] mt-[70px] mb-[70px] gap-20">

                

                {zones.map((item) => {
                    return (
                        <div className="block w-[23vw] p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-lg hover:bg-gray-200">

                            <div className="flex w-full justify-between">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">{item.naziv}</h5>
                            <div className="mb-2 text-2xl font-bold tracking-tight text-gray-700 text-[18px]">{item.cenaKarte} <span className="text-[11px]">EUR</span></div>
                            </div>


                            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 mt-[15px]">
                                
                                <li className="flex items-center">
                                    <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    {item.kapacitet} seats total
                                </li>

                                <li className="flex items-center">
                                    <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    free drink
                                </li>

                                {item.pogodnaZaInvalide ? <li className="flex items-center">
                                    <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    accessible for the disabled
                                </li> : null}

                                {item.velikiTV ? <li className="flex items-center">
                                    <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    big TV screen
                                </li> : null}

                                

                                
                            </ul>

                        </div>)
                })}




            </div>
        </>
    )
}
