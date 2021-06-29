//import Dropdown from "@material-tailwind/react/Dropdown"
//import Dropdown from "@material-tailwind/react/Dropdown"
import Categories from "../etc/Categories";

import New from "../dashboard/new";
const CalHeader=()=>{
    return (
        <div className="flex flex-row justify-between items-center">
            <div className="text-3xl mt-3">
                1 June 2021
            </div>
            <div className="flex items-center mt-2">
                <button className="inline-flex w-full py-2 px-4 rounded bg-white items-center">
                    Week View
      
                    <svg  className="ml-3 w-3" width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.264648L8.5 12.8823L17 0.264648L0 0.264648Z" fill="#142661"/>
                    </svg>

                </button> 
                <button className="bg-white ml-6 mr-0 py-2 px-4 rounded">
                    New
                </button>
                    {/* <button> Week View 
                        <span>
                            
                         </span>
                    </button>
                    <button> New
                    </button> */}
                </div>
            </div>
    );
}
export default CalHeader;



//  <div className="flex flex-row ">
//                 {/* <WeekView></WeekView>
//                 <New></New> */}
//             {/* <button type="button" class="inline-flex justify-center w-full  text-black-700 font-semibold  py-2 px-4  hover:border-transparent rounded bg-white text-black-700">
//              Options
      
//         <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//         <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
//         </svg>
//          </button> */}
//          {/* <Categories></Categories> */}
//             {/* <button class="bg-white ml-6 text-black-700 font-semibold  py-2 px-4  hover:border-transparent rounded">
//                 Button
//             </button> */}