import React from "react";

import Recent from '../../components/admin/dashboard/recent';
import Table from '../../components/admin/dashboard/table';
import Calendar from '../../components/admin/dashboard/Calendarcomponent';
import Header from "../../components/admin/Header/Header";
import New from '../../components/admin/dashboard/new';
import SideNavBar from '../../components/admin/SideNavBar/SideNavBar'


const Main = (props) => {
    return(
        
        <div className="bg-grey">
            <Header/>
            <div className="flex flex-row ">

            <SideNavBar/>
            <div className="ml-4 w-10/12 flex-row">
            <New/>
            <Table/>
            <div className="md:flex md:flex-row">
            <div className="w-12/12 md:w-4/12">
                <Calendar/>

            </div>
            <div className="w-12/12 md:w-8/12"><Recent/></div>
            </div>
            </div>
            </div>
        </div>
    );
};

export default Main;