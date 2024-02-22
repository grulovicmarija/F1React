export default function Hero({setLogInForm, setHomePage}) { 

    
    function handleGetStarted(e) { 
        e.preventDefault(); 

        setLogInForm(true); 
        setHomePage(false); 
    }

    function scrollToTarget() {
        window.location.hash = '#targetDiv';
    }

    return(
        <>
       
       <section className="bg-cover bg-no-repeat bg-[url('assets/hero.png')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Welcome to F1 Grand Prix 2024!</h1>
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48 p-4">This is no ordinary sport. This is Formula 1. Enter the world of drivers, teams, cars, circuits and more! <br></br> Everything you need to know about Formula 1...</p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                <div className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#e10600] hover:bg-gray-200 hover:text-[#e10600] focus:ring-4 "
                onClick = {(e) => handleGetStarted(e)}>
                    Get started
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </div>
                <a href="#targetDiv" onClick={scrollToTarget} className="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 hover:text-[#e10600]">
                    Learn more
                </a>  
            </div>
        </div>
    </section>
        </>
    )
}