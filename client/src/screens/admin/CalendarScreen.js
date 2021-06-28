import React from 'react'
import Cal1 from '../../components/admin/Calender/Week_cal/cal1'
import New from '../../components/admin/dashboard/new'
import Header from '../../components/admin/Header/Header'
import WeekView from '../../components/admin/Calender/weekView'

export default function Calender() {
    return (
        <div className="bg-grey">
            <Header/>
            <div className="flex justify-between">
                <div>1 June,2021</div>
                <div className="flex">
                    <WeekView/>
                    <New/>
                </div>
            </div>
            
            <Cal1/>
        </div>
    )
}
