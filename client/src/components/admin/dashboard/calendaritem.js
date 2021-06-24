import React from "react";

function Calendaritem(props) {
    return(
       
            <div className="w-full flex justify-center">
                <p className="font-medium text-center text-gray-800 dark:text-gray-100 text-xs">{props.text}</p>
            </div>
        
    )
}

export default Calendaritem