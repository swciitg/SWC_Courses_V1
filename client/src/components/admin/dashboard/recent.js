
import React from "react";

const Recent = (props) => {

    return(
       
    <div className="bg-white  w-auto h-80 mt-8 ml-8 mb-12 mr-16 ">
       <div className=" pt-4 pb-40 pr-4 pl-11 text-gray-800">
           <span className="text-base font-normal"><h1>Recent Activity</h1></span>
           <div className="text-base font-normal">
               <ol className="list-disc list-inside">
                   <li> I am first.</li>
                    <li>I am second</li>
                   
               </ol>
           </div>
       </div>
    </div>

    );

};

export default Recent;