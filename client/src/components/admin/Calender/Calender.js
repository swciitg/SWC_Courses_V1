import React from 'react'
import Cal1 from './Week_cal/cal1'
import New from '../dashboard/new'
import Header from '../Header/Header'
import WeekView from './weekView'

export default function Calender() {
    return (
        <div>
            <Header/>
            <WeekView/>
            <New/>
            <Cal1/>
        </div>
    )
}
