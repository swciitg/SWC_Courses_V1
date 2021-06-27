import React from "react";

import Recent from '../../components/admin/dashboard/recent';
import Table from '../../components/admin/dashboard/table';
import Calendar from '../../components/admin/dashboard/Calendarcomponent';
import Header from "../../components/admin/Header/Header";
import New from '../../components/admin/dashboard/new';

const Main = (props) => {
    return(
        
        <div className="bg-grey">
            <Header/>
            <div className="flex">
                <div className="w-11/12"></div>
                <div className="w-2/12"><New/></div>
            </div>
            
             <div className="flex">
            <div className="w-2/12"></div>
            <div className="w-10/12"><Table/></div>
            </div>
            
            <div className="flex">
            <div className="w-2/12"></div>
            <div className="w-3/12"><Calendar/></div>
            {/* <div className="w-1/12"></div> */}
            
            <div className="w-7/12"><Recent/></div>
            
            </div>
            

        </div>
    );
};

export default Main;