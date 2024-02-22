
import axios from "axios";
import { useEffect, useState } from "react"
import { HiSquaresPlus } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";

export default function SignUpForm({setUser, setLogInForm, setSignUpForm, setReservationForm, setHomePage}) { 

    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName ] = useState("");
    const [company, setCompany] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [emailConfirmation, setEmailConfirmation] = useState("");
    const [numberOfTickets, setNumberOfTickets ] = useState(1);
    const [races, setRaces] = useState([]);
    const [race, setRace] = useState(null); 


    const [selectedRaces, setSelectedRaces] = useState([]); 

    function handleSubmit(e) { 
        e.preventDefault();

      if (firstName === "" || firstName === null ||
        lastName === "" || lastName === null ||
        address1 === "" || address1 === null ||
        email === "" || email === null ||
        zipCode === "" || zipCode === null ||
        city === null ||
        country === null ||
        email === "" || email === null ||
        emailConfirmation === "" || emailConfirmation === null ||
        password === "" || password === null) {
        alert("Please enter valid data");
        return;
      }

        const url = "https://localhost:7012/api/Kupci";

        const newUser = {
            id: 0,
            ime: firstName,
            prezime: lastName,
            kompanija: company,
            adresa1: address1,
            adresa2: address2,
            postanskiBroj: parseInt(zipCode),
            mesto: city,
            email: email,
            sifra: password,
            potvrdaEmailAdrese: emailConfirmation,
            promoKod: "string",
            drzava: {
              id: country.id,
              naziv: country.naziv
            }
          }

          console.log(newUser);

        axios.post(url, newUser)
        .then((result) => { 
            //result - user
            setUser(result.data); 
            setSignUpForm(false); 
            setReservationForm(true); 
        }
        ).catch((ex) => alert(ex)); 

    }

    function handleLogIn() {  
        setLogInForm(true); 
        setSignUpForm(false);
    } 

    function getRaces() { 
        axios.get("https://localhost:7012/api/Trke/trke")
        .then((result) => {
          setRaces(result.data); 
        })
        .catch((error) => { 
          console.log(error)
        })
    }

    function getZones() { 
      axios.get("https://localhost:7012/api/Zone/zone")
      .then((result) => {
        setZones(result.data); 
      })
      .catch((error) => { 
        console.log(error)
      })
    }

    function getCountries() { 
      axios.get("https://localhost:7012/api/Kupci/drzave")
      .then((result) => { 
        setCountries(result.data);
      })
      .catch((error) => { 
        console.log(error);
      })
    }

    function handleCountryChange(e) { 
        
        let obj = JSON.parse(e.target.value); //object
        setCountry(obj); 
        
    }

    useEffect(() => { 
      getRaces();
      getCountries(); 
      getZones(); 
      }, []);

    function handleCancel() { 
      setSignUpForm(false); 
      setHomePage(true); 
    }

    return(
        <>
        <section className="h-[130vh] bg-cover bg-[url('assets/talas2.png')] bg-gray-400 bg-blend-multiply flex items-center justify-center">
    
        <div className="flex items-center justify-center p-0">
        <div className="mx-auto w-full h-full max-w-[700px]">
            <form className="bg-gray-950 p-[20px] rounded-lg shadow">
            <div className="-mx-2 flex flex-wrap">

                <div className="flex w-full justify-end">
                    <div className="text-[#e10700ea] cursor-pointer relative bottom-3 text-[18px]"
                    onClick = {() => handleCancel()}>x</div>
                </div>

                <div className="w-full font-bold tracking-tight text-white lg:text-3xl">
                <h1 className="mb-10">Sign <span className=" text-[#e10600]">Up</span></h1>
                
                </div>
                
                <div className="w-full px-3 sm:w-1/2">
                <div className="mb-4">
                    <label htmlhtmlfor="fName" className="mb-2 block text-base text-white">First Name</label>
                    <input
                    type="text"
                    name="fName"
                    id="fName"
                    placeholder="First Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                </div>

                <div className="w-full px-3 sm:w-1/2">
                <div className="mb-4">
                    <label htmlFor="lName" className="mb-2 block text-base text-white">Last Name</label>
                    <input
                    type="text"
                    name="lName"
                    id="lName"
                    placeholder="Last Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                </div>

                <div className="w-full px-3">
                <div className="mb-4">
                    <label htmlFor="company" className="mb-2 block text-base text-white">Company</label>
                    <input
                    type="text"
                    name="company"
                    id="company"
                    placeholder="Company"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
                </div>

                <div className="w-full px-3 sm:w-1/2">
                <div className="mb-4">
                    <label htmlFor="address1" className="mb-2 block text-base text-white">Main Address</label>
                    <input
                    type="text"
                    name="address1"
                    id="address1"
                    placeholder="Main Address"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setAddress1(e.target.value)}
                    />
                </div>
                </div>

                <div className="w-full px-3 sm:w-1/2">
                <div className="mb-4">
                    <label htmlFor="address2" className="mb-2 block text-base text-white">Address</label>
                    <input
                    type="text"
                    name="address2"
                    id="address2"
                    placeholder="Address"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setAddress2(e.target.value)}
                    />
                </div>
                </div>

                <div className="w-full px-3 sm:w-1/3">
                <div className="mb-4">
                    <label htmlFor="zipCode" className="mb-2 block text-base text-white">Zip Code</label>
                    <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    placeholder="Zip code"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setZipCode(e.target.value)}
                    />
                </div>
                </div>

                <div className="w-full px-3 sm:w-1/3">
                <div className="mb-4">
                    <label htmlFor="city" className="mb-2 block text-base text-white">City</label>
                    <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                </div>

                <div className="w-full px-3 sm:w-1/3">
                <div>
                    <label
                        htmlFor="country"
                        className="mb-2 block text-base text-white">Country
                    </label>
                    <select id="country" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleCountryChange(e)}>
                    <option defaultValue>Choose country</option>
                    {countries.map((item) => <option value={JSON.stringify(item)}>{item.naziv}</option>)}
                    </select>
                </div>
                </div>

                <div className="w-full px-3">
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-base text-white">Email</label>
                    <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="example@mail.com"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                </div>

                <div className="w-full px-3">
                <div className="mb-4">
                    <label htmlFor="emailConfirm" className="mb-2 block text-base text-white">Confirm email</label>
                    <input
                    type="text"
                    name="emailConfirm"
                    id="emailConfirm"
                    placeholder="example@mail.com"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setEmailConfirmation(e.target.value)}
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
                    placeholder = "Password"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                </div>

                <div className="flex justify-between items-end w-full px-3">
                <button
                    className="inline-flex  mt-4 justify-center items-center py-2 text-[12px]  text-center  rounded-lg  text-gray-300 "
                    onClick = {() => handleLogIn()}>
                    Already have an account? <span className="ml-2 text-[#e10600]"> LogIn</span>
                </button>
                <button
                className="inline-flex  mt-4 justify-center items-center py-2 px-5 text-base font-medium text-center hover:text-[#e10600] rounded-lg hover:bg-gray-200 bg-[#e10600] text-gray-200 focus:ring-4"
                    onClick={(e) => handleSubmit(e)}>
                SignUp
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