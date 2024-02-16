import axios from "axios";
import { useState } from "react"


export default function LogInForm({setUser, setLogInForm, setSignUpForm, setReservationForm, setHomePage}) { 

    const [email, setEmail] = useState(null); 
    const [password, setPassword] = useState(null); 

    function handleSubmit(e) { 
        e.preventDefault(); 


        const url = "https://localhost:7012/login";
        

        if (email === "" || email === null ||
            password === "" || password === null) {
            alert("Please enter valid data");
            return;
        }


        const newUser = {
            email: email,
            sifra: password
        }

        axios.post(url, newUser)
            .then((result) => {
                //result - user
                setUser(result.data);
                setLogInForm(false);
                setReservationForm(true);
            }
            ).catch((ex) => alert("Wrong credentials")); 
        
    }

    function handleSignUp() { 
        setLogInForm(false); 
        setSignUpForm(true); 
    }

    function handleCancel() { 
        setLogInForm(false); 
        setHomePage(true); 
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
                <h1 className="mb-10">Log <span className=" text-[#e10600]">In</span></h1>
                
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
                    <label htmlFor="password" className="mb-2 block text-base text-white">Password</label>
                    <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                </div>

                <div className="flex justify-between items-center w-full px-3">
                <button
                className="inline-flex  mt-4 justify-center items-center py-2 px-5 text-base font-medium text-center  rounded-lg  bg-gray-200 text-[#e10600] focus:ring-4"
                    onClick = {() => handleSignUp()}>
                SignUp
                </button>
                <button
                className="inline-flex  mt-4 justify-center items-center py-2 px-5 text-base font-medium text-center hover:text-[#e10600] rounded-lg hover:bg-gray-200 bg-[#e10600] text-gray-200 focus:ring-4"
                    onClick={(e) => handleSubmit(e)}>
                LogIn
                </button>
                </div>


                </div>
            </form>
            </div>

            </div>

            </section>
        
        </>
    )
}