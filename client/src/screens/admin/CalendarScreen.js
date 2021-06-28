import React from 'react'
import Cal1 from '../../components/admin/Calender/Week_cal/cal1'
import New from '../../components/admin/dashboard/new'
import Header from '../../components/admin/Header/Header'
import CalHeader from '../../components/admin/Calender/CalHeader'
import Days from '../../components/admin/Calender/Days'
// import WeekView from '../../components/admin/Calender/weekView'
import Footer from '../../components/admin/Footer/Footer';

// export default function Calender() {
//     return (
//         <React.Fragment>
//             <Header/>
//                 <div className="flex justify-between items-center">
//                     <CalHeader></CalHeader>
//                     <div className="flex">
//                         <WeekView></WeekView>
//                         <New></New>
//                     </div>
                
//                 {/* <div className="items-center justify-space-evenly"> */}
//                     <Days />
//                 {/* </div> */}
//                 </div>
//                 <Footer />
//             </React.Fragment>
//     )
// }
export default function Calender() {
    return (
        <React.Fragment>
            
            <Header />
            
            <CalHeader />
            <br/>
            <Days />
            
            
            <Footer/>
        </React.Fragment>
    )
}
