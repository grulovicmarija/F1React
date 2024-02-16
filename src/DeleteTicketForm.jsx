import axios from "axios";
import { useState } from "react"

export default function DeleteTicketForm({setDeleteForm, setAllRacesForm}) { 

    const [email, setEmail] = useState(""); 
    const [token, setToken] = useState(""); 

    function handleDelete(e) { 

        e.preventDefault(); 
        
        if (email === "" || email === null ||
            token === "" || token === null) {
            alert("Please enter valid data");
            return;
        }

        e.preventDefault(); 

        axios.delete(`https://localhost:7012/token/${token}/${email}`)
        .then(() => { 
        
            setTimeout(() => {getAllRaces()}, 3000);
            setDeleteForm(false); 
            setAllRacesForm(true); 
        }
        ).catch((ex) => alert("Wrong email or token")); 


    }


    return(
        <>
        <section className="h-[100vh] bg-cover bg-[url('assets/talas.png')] bg-gray-400 bg-blend-multiply flex items-center justify-center">
    
        <div className="flex items-center justify-center p-6 -mt-12">
        <div className="mx-auto w-full h-full max-w-[550px]">
            <form className="bg-gray-950 p-[20px] rounded-lg shadow">
            <div className="-mx-2 flex flex-wrap">

                <div className="flex w-full justify-end">
                    <div className="text-[#e10700ea] cursor-pointer relative bottom-3 text-[18px]"
                    onClick = {() => handleCancel()}>x</div>
                </div>

                <div className="w-full font-bold tracking-tight text-white lg:text-3xl">
                <h1 className="mb-10">Delete <span className=" text-[#e10600]">tickets</span></h1>
                
                </div>
                
                <div className="w-full px-3">
                <div className="mb-4">
                    <label htmlhtmlfor="email" className="mb-2 block text-base text-white">Email</label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@mail.com"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                </div>

                <div className="w-full px-3">
                <div className="mb-4">
                    <label htmlFor="token" className="mb-2 block text-base text-white">Reservation Token</label>
                    <input
                    name="token"
                    id="token"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setToken(e.target.value)}
                    />
                </div>
                </div>

                <button className="ml-3 mt-5 inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#e10600] rounded-lg hover:bg-gray-200 hover:text-[#e10600] hover:outline-none focus:outline-none"
                onClick={(e) => handleDelete(e)}>
                Delete Ticket
                </button>

              

                </div>
            </form>
            </div>

            </div>

            </section>
        
        </>
    )
    
}