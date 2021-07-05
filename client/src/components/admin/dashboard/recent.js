
import React from "react";

const Recent = (props) => {

    return(
       
    <div className="bg-white  w-auto h-80 md:mt-8  ml-1 md:ml-0 mb-8 mr-16">
       <div className=" pt-4 pb-40 pr-4 pl-11 text-gray-800">
           <span className="text-normal font-semibold"><h1>Recent Activity</h1></span>
           <div className="text-lg font-semibold pt-2 pl-4">
               <ol className="list-disc list-inside">
                   <li className="mb-2"> Video1 was updated succesfully.</li>
                    <li className="mb-2">50 students are subscribed to your course</li>
                    <li className="mb-2">You have new comment in lecture 1</li>
                   
               </ol>
           </div>
       </div>
    </div>

    );

};

export default Recent;