import './App.css'

export default function RacersList({ setRacersList, racersForList, setRacersForList }) {


    function handleCancel() {
        setRacersForList([]);
        setRacersList(false);
    }



    return (


        <div className="cursor-default formBackground flex items-center">




            <div className="shadow-lg pt-10 pb-10 h-fit w-fit min-w-[50%]  max-w-sm rounded-lg bg-gray-200 border-gray-700">

                <div className="flex w-full justify-end">
                    <div className=" text-black cursor-pointer relative bottom-3 text-[15px] right-[40px]"
                        onClick={() => handleCancel()}>x</div>
                </div>

                {/* text-[#e10700ea] */}
                
                
                <div className="w-full flex items-center justify-center">
                <ul class="w-full ml-10 mr-10 divide-y divide-gray-400">

                {racersForList.map((item) => {
                    return <li className="pb-3 pt-3 sm:pb-4">
                            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                                
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {item.ucesnik.ime} <span className="font-semibold">{item.ucesnik.prezime}</span>
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {item.ucesnik.drzava.naziv}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base text-gray-900 dark:text-white">
                                    rank {item.ucesnik.rang}
                                </div>
                            </div>
                        </li>
                })}

                </ul>
                </div>




            </div>


        </div>

    )
}
