import axios from "axios";
import { useEffect, useState } from "react"
import { HiSquaresPlus } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import ConfirmReservationForm from "./ConfirmReservationForm";
import { TbHttpDelete } from "react-icons/tb";
import { IoRemoveCircle } from "react-icons/io5";
import { BsTicket, BsTrash } from "react-icons/bs";
import { LiaCitySolid } from "react-icons/lia";
import ReservationsMessage from "./ReservationsMessage";




export default function ReservationForm({ user, setReservationForm, setHomePage, setDeleteForm, setBackToReservation, setAllRacesForm}) {



  const [zones, setZones] = useState([]);
  const [zone, setZone] = useState(null);
  const [email, setEmail] = useState("");
  const [reservations, setReservations] = useState([]);
  const [fullReservations, setFullReservations] = useState([]);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [races, setRaces] = useState([]);
  const [race, setRace] = useState(null);

  const [confirmation, setConfirmation] = useState(false);


  const [selectedRaces, setSelectedRaces] = useState([]);
 
  const [showReservations, setShowReservations] = useState(false); 

  console.log("show res: " + showReservations);

  useEffect(() => {
    getRaces();
    getZones();
  }, []);

  function handleDelete() { 

    setReservationForm(false); 
    setDeleteForm(true); 

  }

  function handleSubmit(e) {
    e.preventDefault();

    if (race === null || zone === null) {
      alert("Please enter valid data");
      return;
    }

    setConfirmation(true);

    if(!selectedRaces.includes(race)) {
      let previousArray = selectedRaces; 
      let newarray = previousArray.concat(race);

      setSelectedRaces(newarray);

      let newReservation = {
        popust : 0, 
        konacnaCena : 0, 
        kupacId : user.id, 
        trkaId : race.id, 
        zonaId : zone.id, 
        token : "string", 
        aktivna : true,
        brojKarata : parseInt(numberOfTickets)
      };
  
  
      let newReservationsArray = reservations.concat(newReservation);
      setReservations(newReservationsArray);

      let newFullReservation = {
        popust: 0,
        konacnaCena: 0,
        kupacId: user.id,
        trka: race, 
        zona: zone, 
        token: "string",
        aktivna: true,
        brojKarata: parseInt(numberOfTickets)
      };
  
  
      let newFullReservationsArray = fullReservations.concat(newFullReservation);
      setFullReservations(newFullReservationsArray);
    }    
  }

  function handleBookAnotherOne(e) {
    e.preventDefault();

    if (race === null || zone === null) {
      alert("Please enter valid data");
      return;
    }

    if (selectedRaces.includes(race)) {
      alert("Race has already been booked.");
      return;
    }

    let newarray = selectedRaces.concat(race);
    setSelectedRaces(newarray);

    let newReservation = {
      popust: 0,
      konacnaCena: 0,
      kupacId: user.id,
      trkaId: race.id,
      zonaId: zone.id,
      token: "string",
      aktivna: true,
      brojKarata: parseInt(numberOfTickets)
    };


    let newReservationsArray = reservations.concat(newReservation);
    setReservations(newReservationsArray);

    let newFullReservation = {
      popust: 0,
      konacnaCena: 0,
      kupacId: user.id,
      trka: race, 
      zona: zone, 
      token: "string",
      aktivna: true,
      brojKarata: parseInt(numberOfTickets)
    };


    let newFullReservationsArray = fullReservations.concat(newFullReservation);
    setFullReservations(newFullReservationsArray);


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

  function handleRaceChange(e) { 
    let chosenRace = JSON.parse(e.target.value);
    setRace(chosenRace);
  }


  function handleCancel() {
    setReservationForm(false);
    setHomePage(true);
  }

  function handleMyReservationsClick() { 
    setBackToReservation(true); 
    setAllRacesForm(true);
    setReservationForm(false);
  }


  if (!confirmation && !showReservations) {
    return (

      <section if:true confirmation className="bg-cover bg-[url('assets/talas3.png')] bg-gray-400 bg-blend-multiply h-[100vh] flex items-center justify-center">
        <div className="flex items-center justify-center p-6">
          <div className="mx-auto w-full h-full max-w-[650px]">
            <form>
              <div className="-mx-3 flex flex-wrap bg-gray-950 rounded-lg shadow p-6">

                <div className="flex w-full justify-end">
                  <div className="text-[#e10700ea] cursor-pointer relative bottom-3 text-[18px]"
                    onClick={() => handleCancel()}>x</div>
                </div>


                <div className='w-full flex flex-col items-center mb-10'>
                <div className="w-full font-bold tracking-tight text-white lg:text-2xl">
                  <h1 className="m-2">Hello {user.ime}, book your <span className=" text-[#e10600]">tickets</span> here</h1>
                </div>
                <div className="mt-2">
                <span className="cursor-pointer w-fit bg-gray-200 bg-opacity-40 text-gray-100 text-[13px] font-medium me-2 px-2.5 py-0.5 rounded-full hover:bg-gray-300 hover:text-gray-700 flex flex-row items-center gap-1 badge"
                onClick={() => handleMyReservationsClick()}>
                    {<BsTicket className="text-[12px]"/>}My reservations</span>
                </div>
                </div>

                


                <div className="w-full px-3">
                  <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-base text-white">Email</label>
                    <input
                      disabled
                      type="text"
                      name="email"
                      id="email"
                      value={user.email}
                      placeholder="example@mail.com"
                      className="w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>



                <div className="px-3 w-full mb-4">
                  <label htmlFor="guest" className="mb-2 block text-base text-white">
                    How many tickets are you buying?
                  </label>
                  <input
                    type="number"
                    name="guest"
                    id="guest"
                    defaultValue={1}
                    step={1}
                    min="1"
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md"
                    onChange={(e) => setNumberOfTickets(e.target.value)}
                  />
                </div>


                <div className="px-3 sm:w-2/3 mb-4 ">
                  <label
                    htmlFor="race"
                    className="mb-2 block text-base text-white">Race
                  </label>
                  <select id="race" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                " onChange={(e) => { handleRaceChange(e) }}>
                    <option defaultValue>Choose a race</option>
                    {races.map((item) => <option value={JSON.stringify(item)}>{`Race ${item.id}`}, {item.datumOdrzavanja.slice(0, -9)}</option>)}
                  </select>
                </div>



                <div className="px-3 sm:w-1/3">
                  <label
                    htmlFor="zone"
                    className="mb-2 block text-base text-white">Zone
                  </label>
                  <select id="zone" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => { setZone(JSON.parse(e.target.value)) }}>
                    <option defaultValue>Choose zone</option>
                    {zones.map((item) => <option value={JSON.stringify(item)}>{item.naziv}</option>)}
                  </select>
                </div>


                {selectedRaces.map((item) => { return <p className="text-gray-300 text-[12px] flex items-center gap-1"><FaCheck />Race {item.id} booked successfully.</p>; })}


                <div className="px-3 flex justify-between w-full">
                  <button
                    className="inline-flex gap-2 mt-4 justify-center items-center py-2 px-5 text-base font-medium text-center hover:text-white rounded-lg hover:bg-[#e10600] bg-gray-200 text-[#e10600] focus:ring-4"
                    onClick={(e) => handleBookAnotherOne(e)}>
                    <HiSquaresPlus />Book another one
                  </button>
                  <button
                    className="inline-flex mt-4 justify-center items-center py-2 px-5 text-base font-medium text-center hover:text-white rounded-lg hover:bg-[#e10600] bg-gray-200 text-[#e10600] focus:ring-4"
                    onClick={(e) => handleSubmit(e)}>
                    Finish
                  </button>
                </div>

                
                <button
                    className=" inline-flex gap-2 mt-4 justify-center items-center py-2 px-3 text-[13px] font-medium text-center hover:text-white rounded-lg  text-[#e10600] focus:ring-4"
                    onClick={() => handleDelete()}>
                    <BsTrash/>Cancel previous reservations
                  </button>

                  

                  

              </div>



            </form>
          </div>
        </div>
      </section>
    )
  }



  return <ConfirmReservationForm selectedRaces={selectedRaces} reservations={reservations} fullReservations={fullReservations} user={user} setConfirmation={setConfirmation} setHomePage = {setHomePage} setReservationForm = {setReservationForm}/>

}

 