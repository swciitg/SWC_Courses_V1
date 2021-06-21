import React from 'react'
import SWCSVG from './SWCSVG'
function Footer() {
    return (
        <div className="bg-navy flex flex-col md:justify-center md:flex-row text-center  sm:px-6">
            <div className=" w-10 md:mx-4 mx-auto my-4">
            <SWCSVG />
            </div>
            
            <div className="text-white my-auto flex md:flex-row flex-col">
                <div className="m-2 ">
                    IITG Course Directory
                </div>
                <div className="my-2 ">
                    <span className="md:mx-2 invisible md:visible">|</span> © 2021 
                </div>
                <div className="m-2 ">
                    @ students’-web-committee
                </div>
            </div>
        </div>
    )
}

export default Footer
