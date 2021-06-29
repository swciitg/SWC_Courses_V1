import React from 'react'
import SWCLogoSVG from './SWCLogoSVG'
function Footer() {
    return (
        <div className="bg-navy flex flex-col items-center md:justify-center md:flex-row text-center  sm:px-6">
            <div className=" w-10 mx-4  my-4">
            <SWCLogoSVG />
            </div>
            
            <div className="text-white my-auto flex md:flex-row flex-col">
                <div className="m-2 ">
                    IITG Course Directory
                </div>
                <div className="my-2 ">
                    <span className="md:mx-2 hidden md:inline-block">|</span> © 2021 
                </div>
                <div className="m-2 ">
                <span className="md:mx-2 hidden md:inline-block">|</span> @ students’-web-committee
                </div>
            </div>
        </div>
    )
}

export default Footer
