import React from 'react'
import Header from '../../components/admin/Header/Header'
import CalHeader from '../../components/admin/Calender/CalHeader'
import Days from '../../components/admin/Calender/Days'
import SideNavBar from '../../components/admin/SideNavBar/SideNavBar'
import Footer from '../../components/admin/Footer/Footer';


export default function Calender() {
    return (
        <React.Fragment>
            <Header />
            <div className="flex flex-row space-x-10">
                <SideNavBar />
                <div className="w-9/12 justify-end">
                    <CalHeader />
                    <br/>
                    <Days />
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
