import { useState } from 'react'
import './App.css'
import HomePage from './HomePage';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import ReservationForm from './ReservationForm';
import DeleteTicketForm from './DeleteTicketForm';
import UserTicketsList from './UserTicketsList';
import axios from 'axios';
import ReservationsMessage from './ReservationsMessage';
import RacersList from './RacersList';
import Footer from './Footer';

export default function App() {

    const [homePage, setHomePage] = useState(true); 
    const [logInForm, setLogInForm] = useState(false); 
    const [signUpForm, setSignUpForm] = useState(false); 
    const [reservationForm, setReservationForm] = useState(false); 
    const [deleteForm, setDeleteForm] = useState(false); 
    const [allRacesForm, setAllRacesForm] = useState(false); 
    const [user, setUser] = useState(null); 

    const [racersForList, setRacersForList] = useState([]); 
    const [racersList, setRacersList] = useState(false); 

    const [backToReservation, setBackToReservation] = useState(false); 
        
  
    return (
        <>
        {homePage ? <HomePage setLogInForm={setLogInForm} setHomePage={setHomePage} setReservationForm={setReservationForm} setRacersList={setRacersList} setRacersForList={setRacersForList}/> : null}
        {logInForm ? <LogInForm setUser={setUser} setLogInForm={setLogInForm} setSignUpForm={setSignUpForm} setReservationForm={setReservationForm} setHomePage={setHomePage}/> : null}
        {signUpForm ? <SignUpForm setUser={setUser} setLogInForm={setLogInForm} setSignUpForm={setSignUpForm} setReservationForm={setReservationForm} setHomePage={setHomePage} setBackToReservation={setBackToReservation}/> : null}
        {reservationForm ? <ReservationForm user={user} setReservationForm={setReservationForm} setHomePage={setHomePage} setLogInForm={setLogInForm} 
            setDeleteForm = {setDeleteForm} setBackToReservation={setBackToReservation} setAllRacesForm={setAllRacesForm}/> : null}
        {deleteForm ? <DeleteTicketForm setDeleteForm = {setDeleteForm} setAllRacesForm={setAllRacesForm}/> : null}
        {allRacesForm ? <ReservationsMessage user={user} setHomePage={setHomePage} setReservationForm={setReservationForm} backToReservationForm={backToReservation} setAllRacesForm={setAllRacesForm}/> : null }
        {racersList ? <RacersList setRacersList={setRacersList} racersForList={racersForList} setRacersForList={setRacersForList}/> : null }

        
        </>
    )
}

